// main.js - Application entry point and orchestrator
// Demonstrates: ES6 module imports, event handling, application flow

import { 
  groceryItems, 
  getProductById, 
  searchProducts, 
  filterByPriceRange,
  getProductStock,
  checkStockAvailability,
  updateStock,
  restockAllProducts
} from './products.js';
import { 
  addToCart, 
  removeFromCart, 
  clearCart, 
  getCurrentCart, 
  calculateCartTotal,
  completeTransaction,
  getAllTransactions,
  getTransactionById,
  calculateTotalSales,
  getMostPurchasedProduct,
  getTransactionCount,
  getCartItemQuantity
} from './transactions.js';
import { 
  fetchProductsFromAPI, 
  postTransactionToAPI, 
  fetchDailySalesReport 
} from './api.js';
import {
  renderProducts,
  renderCart,
  updateCartTotal,
  updateChangeDisplay,
  renderTransactions,
  showNotification,
  showReceipt,
  hideReceipt,
  updateReportStats
} from './dom.js';

// ============================================
// Application State
// ============================================
let currentProducts = [...groceryItems];
let currentSearchTerm = '';
let currentMinPrice = null;
let currentMaxPrice = null;

// ============================================
// Initialization
// ============================================
async function initializeApp() {
  console.log('🏪 Initializing Sari-Sari Store POS...');
  
  // Demonstrate Axios GET: Fetch products from API
  try {
    const apiResponse = await fetchProductsFromAPI();
    console.log('✅ Products API response:', apiResponse);
    showNotification('Product catalog loaded successfully!', 'success');
  } catch (error) {
    console.error('❌ Failed to fetch products:', error);
    showNotification('Warning: Using local product data', 'info');
  }
  
  // Initial render
  renderProducts(currentProducts, 'productList');
  renderCart(getCurrentCart(), 'cartItems');
  updateCartTotal(0);
  updateChangeDisplay(0);
  refreshReports();
  
  // Setup event listeners
  setupEventListeners();
  
  console.log('✅ Application initialized successfully');
}

// ============================================
// Event Listeners Setup
// ============================================
function setupEventListeners() {
  // Product search input
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', handleSearch);
  
  // Price filter buttons
  const filterBtn = document.getElementById('filterBtn');
  filterBtn.addEventListener('click', handlePriceFilter);
  
  const clearFilterBtn = document.getElementById('clearFilterBtn');
  clearFilterBtn.addEventListener('click', handleClearFilter);
  
  // Product list - Add to cart buttons (event delegation)
  const productList = document.getElementById('productList');
  productList.addEventListener('click', handleProductAction);
  
  // Cart - Remove item buttons (event delegation)
  const cartItems = document.getElementById('cartItems');
  cartItems.addEventListener('click', handleCartAction);
  
  // Clear cart button
  const clearCartBtn = document.getElementById('clearCartBtn');
  clearCartBtn.addEventListener('click', handleClearCart);
  
  // Payment input - calculate change
  const paymentInput = document.getElementById('paymentInput');
  paymentInput.addEventListener('input', handlePaymentInput);
  
  // Checkout button
  const checkoutBtn = document.getElementById('checkoutBtn');
  checkoutBtn.addEventListener('click', handleCheckout);
  
  // View Reports button (toggle drawer)
  const viewReportsBtn = document.getElementById('viewReportsBtn');
  viewReportsBtn.addEventListener('click', toggleReportsDrawer);
  
  // Close Reports drawer button
  const closeReportsBtn = document.getElementById('closeReportsBtn');
  closeReportsBtn.addEventListener('click', toggleReportsDrawer);
  
  // Drawer backdrop - Close on click
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  drawerBackdrop.addEventListener('click', toggleReportsDrawer);
  
  // Refresh reports button
  const refreshReportsBtn = document.getElementById('refreshReportsBtn');
  refreshReportsBtn.addEventListener('click', refreshReports);
  
  // Transactions list - View receipt buttons (event delegation)
  const transactionsList = document.getElementById('transactionsList');
  transactionsList.addEventListener('click', handleTransactionAction);
  
  // Receipt modal - Close button
  const closeReceiptBtn = document.getElementById('closeReceiptBtn');
  closeReceiptBtn.addEventListener('click', hideReceipt);
  
  // Receipt modal - Print button
  const printReceiptBtn = document.getElementById('printReceiptBtn');
  printReceiptBtn.addEventListener('click', handlePrintReceipt);
  
  // Modal - Click outside to close
  const modal = document.getElementById('receiptModal');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      hideReceipt();
    }
  });
}

// ============================================
// Event Handlers - Products & Search
// ============================================
function handleSearch(event) {
  currentSearchTerm = event.target.value;
  applyFilters();
}

function handlePriceFilter() {
  const minPrice = document.getElementById('minPrice').value;
  const maxPrice = document.getElementById('maxPrice').value;
  
  currentMinPrice = minPrice ? parseFloat(minPrice) : null;
  currentMaxPrice = maxPrice ? parseFloat(maxPrice) : null;
  
  applyFilters();
}

function handleClearFilter() {
  // Reset filter inputs
  document.getElementById('searchInput').value = '';
  document.getElementById('minPrice').value = '';
  document.getElementById('maxPrice').value = '';
  
  currentSearchTerm = '';
  currentMinPrice = null;
  currentMaxPrice = null;
  
  applyFilters();
  showNotification('Filters cleared', 'info');
}

function applyFilters() {
  // Start with all products
  let filtered = [...groceryItems];
  
  // Apply search filter
  if (currentSearchTerm) {
    filtered = searchProducts(currentSearchTerm);
  }
  
  // Apply price filter
  if (currentMinPrice !== null || currentMaxPrice !== null) {
    filtered = filterByPriceRange(currentMinPrice, currentMaxPrice).filter(product =>
      filtered.some(p => p.product_id === product.product_id)
    );
  }
  
  currentProducts = filtered;
  renderProducts(currentProducts, 'productList');
}

function handleProductAction(event) {
  if (event.target.classList.contains('add-to-cart-btn')) {
    const productId = parseInt(event.target.getAttribute('data-product-id'));
    const quantityInput = document.querySelector(
      `.product-actions input[data-product-id="${productId}"]`
    );
    const quantity = parseInt(quantityInput.value) || 1;
    
    if (quantity <= 0) {
      showNotification('Please enter a valid quantity', 'error');
      return;
    }
    
    const product = getProductById(productId);
    if (product) {
      try {
        // Check stock availability including items already in cart
        const currentStock = getProductStock(productId);
        const cartQuantity = getCartItemQuantity(productId);
        const availableStock = currentStock - cartQuantity;
        
        if (availableStock <= 0) {
          showNotification(`${product.product_name} is out of stock!`, 'error');
          return;
        }
        
        if (quantity > availableStock) {
          showNotification(
            `Only ${availableStock} units available (${cartQuantity} already in cart)`, 
            'error'
          );
          return;
        }
        
        // Add to cart with stock validation
        addToCart(product, quantity, currentStock);
        refreshCart();
        showNotification(`Added ${product.product_name} to cart`, 'success');
        
        // Reset quantity input
        quantityInput.value = '1';
        
        // Re-render products to update stock display
        applyFilters();
        
      } catch (error) {
        showNotification(error.message, 'error');
      }
    }
  }
}

// ============================================
// Event Handlers - Cart
// ============================================
function handleCartAction(event) {
  if (event.target.classList.contains('remove-item-btn')) {
    const productId = parseInt(event.target.getAttribute('data-product-id'));
    const product = getProductById(productId);
    
    removeFromCart(productId);
    refreshCart();
    
    if (product) {
      showNotification(`Removed ${product.product_name} from cart`, 'info');
    }
  }
}

function handleClearCart() {
  const cart = getCurrentCart();
  if (cart.length === 0) {
    showNotification('Cart is already empty', 'info');
    return;
  }
  
  clearCart();
  refreshCart();
  
  // Reset payment input
  document.getElementById('paymentInput').value = '';
  updateChangeDisplay(0);
  
  showNotification('Cart cleared', 'info');
}

function refreshCart() {
  const cart = getCurrentCart();
  const total = calculateCartTotal();
  
  renderCart(cart, 'cartItems');
  updateCartTotal(total);
  
  // Recalculate change if payment amount exists
  const paymentInput = document.getElementById('paymentInput');
  if (paymentInput.value) {
    const payment = parseFloat(paymentInput.value);
    updateChangeDisplay(payment - total);
  }
}

function handlePaymentInput(event) {
  const payment = parseFloat(event.target.value) || 0;
  const total = calculateCartTotal();
  const change = payment - total;
  
  updateChangeDisplay(change);
}

// ============================================
// Event Handlers - Checkout
// ============================================
async function handleCheckout() {
  const cart = getCurrentCart();
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  if (cart.length === 0) {
    showNotification('Cart is empty. Add items before checkout.', 'error');
    return;
  }
  
  const paymentInput = document.getElementById('paymentInput');
  const payment = parseFloat(paymentInput.value);
  const total = calculateCartTotal();
  
  if (!payment || payment <= 0) {
    showNotification('Please enter a valid payment amount', 'error');
    return;
  }
  
  if (payment < total) {
    const shortage = total - payment;
    showNotification(`Insufficient payment. Short by ₱${shortage.toFixed(2)}`, 'error');
    return;
  }
  
  // Show loading state
  checkoutBtn.disabled = true;
  checkoutBtn.classList.add('loading');
  const originalText = checkoutBtn.textContent;
  checkoutBtn.setAttribute('data-original-text', originalText);
  
  try {
    // Final stock validation before completing transaction
    for (const item of cart) {
      const currentStock = getProductStock(item.product_id);
      if (currentStock < item.quantity) {
        showNotification(
          `Insufficient stock for ${item.product_name}. Only ${currentStock} available.`,
          'error'
        );
        return;
      }
    }
    
    // Complete the transaction (returns transaction and items for stock update)
    const { transaction, itemsForStockUpdate } = completeTransaction(payment);
    
    // Deduct stock for each purchased item
    itemsForStockUpdate.forEach(item => {
      try {
        updateStock(item.product_id, item.quantity);
        console.log(`✅ Stock updated: ${item.product_name} - ${item.quantity} units deducted`);
      } catch (stockError) {
        console.warn(`⚠️ Stock update warning for ${item.product_name}:`, stockError);
      }
    });
    
    // Demonstrate Axios POST: Send transaction to API
    try {
      const apiResponse = await postTransactionToAPI(transaction);
      console.log('✅ Transaction posted to API:', apiResponse);
    } catch (apiError) {
      console.warn('⚠️ Failed to post transaction to API:', apiError);
      // Continue anyway - transaction is saved locally
    }
    
    // Demonstrate Axios GET: Fetch daily sales report
    try {
      const today = new Date().toISOString().split('T')[0];
      const reportResponse = await fetchDailySalesReport(today);
      console.log('✅ Daily sales report:', reportResponse);
    } catch (reportError) {
      console.warn('⚠️ Failed to fetch sales report:', reportError);
    }
    
    // Show success
    showNotification('Transaction completed successfully!', 'success');
    
    // Show receipt
    setTimeout(() => {
      showReceipt(transaction);
      
      // Clear loading state after receipt is shown
      checkoutBtn.disabled = false;
      checkoutBtn.classList.remove('loading');
      checkoutBtn.textContent = checkoutBtn.getAttribute('data-original-text');
    }, 500);
    
    // Reset cart and payment
    refreshCart();
    paymentInput.value = '';
    updateChangeDisplay(0);
    
    // Refresh product display to show updated stock
    applyFilters();
    
    // Refresh reports
    refreshReports();
    
  } catch (error) {
    showNotification(error.message, 'error');
    
    // Clear loading state on error
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove('loading');
    checkoutBtn.textContent = checkoutBtn.getAttribute('data-original-text');
  }
}

// ============================================
// Event Handlers - Reports Drawer
// ============================================
function toggleReportsDrawer() {
  const drawer = document.getElementById('reportsDrawer');
  drawer.classList.toggle('hidden');
  
  // Refresh reports when opening
  if (!drawer.classList.contains('hidden')) {
    refreshReports();
    updateReportsBadge();
  }
}

function updateReportsBadge() {
  const badge = document.getElementById('reportsBadge');
  const count = getTransactionCount();
  badge.textContent = count;
}

function refreshReports() {
  const transactions = getAllTransactions();
  const totalSales = calculateTotalSales();
  const transactionCount = getTransactionCount();
  const bestSeller = getMostPurchasedProduct();
  
  // Update statistics
  updateReportStats(totalSales, transactionCount, bestSeller);
  
  // Update badge
  updateReportsBadge();
  
  // Render transactions list (show most recent first)
  const recentTransactions = [...transactions].reverse();
  renderTransactions(recentTransactions, 'transactionsList');
  
  // Update status widget
  updateStatusWidget();
  
  console.log('📊 Reports refreshed:', {
    totalSales,
    transactionCount,
    bestSeller
  });
}

function handleTransactionAction(event) {
  if (event.target.classList.contains('view-receipt-btn')) {
    const transactionId = parseInt(event.target.getAttribute('data-transaction-id'));
    const transaction = getTransactionById(transactionId);
    
    if (transaction) {
      showReceipt(transaction);
    }
  }
}

function handlePrintReceipt() {
  window.print();
}

// ============================================
// Event Handlers - Status Widget & Exit
// ============================================
function updateStatusWidget() {
  const statusText = document.getElementById('statusText');
  const transactionCount = getTransactionCount();
  const totalSales = calculateTotalSales();
  
  // Dynamic status messages based on activity
  if (transactionCount === 0) {
    statusText.textContent = 'System Ready';
  } else if (transactionCount === 1) {
    statusText.textContent = `${transactionCount} transaction today • ₱${totalSales.toFixed(2)}`;
  } else {
    statusText.textContent = `${transactionCount} transactions today • ₱${totalSales.toFixed(2)}`;
  }
}

// ============================================
// ============================================
// Admin/Debug Functions
// ============================================

/**
 * Restock all products (admin function)
 * Can be called from browser console
 */
window.restockAll = function() {
  restockAllProducts();
  applyFilters();
  showNotification('All products restocked!', 'success');
  console.log('✅ All products have been restocked to initial levels');
};

// ============================================
// Start Application
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  
  // Log helper message
  console.log('💡 Debug: Type "restockAll()" in console to restock all products');
});

// Export for debugging purposes
export { refreshReports, refreshCart };
