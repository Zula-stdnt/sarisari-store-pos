// main.js — Application Orchestrator
// Coordinates user interactions, state synchronization, and DOM updates.
// Follows ITE 387 academic patterns and ES6 module best practices.

import {
  productCategories,
  filterProducts,
  restockAllProducts,
} from "./products.js";
import {
  cart,
  transactions,
  addToCart,
  removeFromCart,
  clearCart,
  getCartTotal,
  checkout,
  getTotalSales,
  getMostPurchasedProducts,
  clearAllTransactions,
} from "./transactions.js";
import {
  renderCategoryDropdown,
  renderProductCatalog,
  renderCart,
  renderTransactions,
  renderReportSummary,
  showNotice,
  showReceiptModal,
} from "./dom.js";
import { fetchSupplierCatalog } from "./api.js";
import { formatPeso } from "./utils.js";

// DOM Elements
const catalogEl = document.getElementById("catalog");
const categoryFilterSlot = document.getElementById("category-filter-slot");
const searchInput = document.getElementById("search-input");
const cartEl = document.getElementById("cart");
const cartTotalEl = document.getElementById("cart-total");
const amountPaidInput = document.getElementById("amount-paid");
const checkoutBtn = document.getElementById("checkout-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const noticeEl = document.getElementById("notice");
const transactionsEl = document.getElementById("transactions");
const reportEl = document.getElementById("report");
const syncStatusEl = document.getElementById("sync-status");
const resetSessionBtn = document.getElementById("reset-session-btn");
const receiptModalEl = document.getElementById("receipt-modal");

// Component Filter State
let currentCategory = "all";
let currentSearch = "";

/**
 * Re-filter and render product catalog grid
 */
function refreshCatalog() {
  const filtered = filterProducts(currentSearch, currentCategory);
  renderProductCatalog(catalogEl, filtered, handleAddToCart);
}

/**
 * Render shopping cart items and recalculate total
 */
function refreshCart() {
  renderCart(cartEl, cart, handleRemoveFromCart);
  cartTotalEl.textContent = formatPeso(getCartTotal());
}

/**
 * Render session sales metrics and Master-Detail transaction logs
 */
function refreshReports() {
  renderTransactions(transactionsEl, transactions, handleViewReceipt);
  renderReportSummary(
    reportEl,
    getTotalSales(),
    getMostPurchasedProducts(),
    transactions.length
  );
}

/**
 * Handle category change from canonical <select> (RULE-JS-OBJ-06)
 */
function handleCategoryChange(selectedCategoryId) {
  currentCategory = selectedCategoryId;
  refreshCatalog();
}

/**
 * Handle live search input
 */
function handleSearchInput() {
  currentSearch = searchInput.value;
  refreshCatalog();
}

/**
 * Add product to cart with stock validation
 */
function handleAddToCart(productId, quantity) {
  const result = addToCart(productId, quantity);
  showNotice(noticeEl, result.message, result.ok ? "success" : "error");
  if (result.ok) {
    refreshCart();
  }
}

/**
 * Remove specific line item from cart
 */
function handleRemoveFromCart(index) {
  removeFromCart(index);
  refreshCart();
  showNotice(noticeEl, "Item removed from cart.", "info");
}

/**
 * Clear all cart line items
 */
function handleClearCart() {
  if (cart.length === 0) return;
  clearCart();
  refreshCart();
  showNotice(noticeEl, "Cart cleared.", "info");
}

/**
 * Complete Checkout Flow: Validates payment, decrements stock, records transaction,
 * and launches the printable receipt dialog.
 */
function handleCheckout() {
  const amountPaid = parseFloat(amountPaidInput.value);
  const result = checkout(amountPaid, "Aling Neneng");

  showNotice(noticeEl, result.message, result.ok ? "success" : "error");

  if (result.ok && result.transaction) {
    amountPaidInput.value = "";
    refreshCart();
    refreshCatalog(); // update stock displays
    refreshReports();  // update sales analytics

    // Display printable thermal receipt
    showReceiptModal(receiptModalEl, result.transaction);
  }
}

/**
 * View receipt modal for a historical transaction
 */
function handleViewReceipt(transaction) {
  showReceiptModal(receiptModalEl, transaction);
}

/**
 * Restock all inventory and reset session transactions (with confirmation)
 */
function handleResetSession() {
  const confirmed = window.confirm(
    "Are you sure you want to restock all items and reset session transactions? This will clear saved transaction logs."
  );
  if (!confirmed) return;

  restockAllProducts();
  clearAllTransactions();
  clearCart();

  amountPaidInput.value = "";
  refreshCatalog();
  refreshCart();
  refreshReports();

  showNotice(noticeEl, "All inventory restocked and session reset successfully.", "success");
}

// Event Bindings
searchInput.addEventListener("input", handleSearchInput);
checkoutBtn.addEventListener("click", handleCheckout);
if (clearCartBtn) clearCartBtn.addEventListener("click", handleClearCart);
if (resetSessionBtn) resetSessionBtn.addEventListener("click", handleResetSession);

// Allow Enter key in amount-paid input to trigger checkout
amountPaidInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleCheckout();
  }
});

// Initialize Canonical Category Dropdown (RULE-JS-OBJ-05)
renderCategoryDropdown(categoryFilterSlot, productCategories, handleCategoryChange);

// Initial UI Render
refreshCatalog();
refreshCart();
refreshReports();

// Axios Supplier Feed Sync (Section 6 item 2)
fetchSupplierCatalog().then((result) => {
  if (result.ok) {
    syncStatusEl.textContent = `Supplier catalog synced: ${result.data.length} products verified.`;
    syncStatusEl.classList.add("sync-ok");
  } else {
    syncStatusEl.textContent = `Supplier sync failed: ${result.error}`;
    syncStatusEl.classList.add("sync-fail");
  }
});
