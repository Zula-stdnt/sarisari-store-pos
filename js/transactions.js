// transactions.js - Transaction management and in-memory storage
// Demonstrates: Arrays, Objects, push/pop, map/filter/reduce

// In-memory transaction storage (array of transaction objects)
const transactions = [];

// Current cart items (array of cart item objects)
let currentCart = [];

// Transaction ID counter
let transactionIdCounter = 1;

/**
 * Add item to current cart with stock validation
 * Demonstrates: push(), object creation, bracket notation, validation
 */
export function addToCart(product, quantity, availableStock) {
  // Validate stock availability
  if (availableStock < quantity) {
    throw new Error(`Only ${availableStock} units available in stock`);
  }
  
  const existingItemIndex = currentCart.findIndex(
    item => item['product_id'] === product.product_id
  );
  
  if (existingItemIndex !== -1) {
    // Item exists, check if total quantity exceeds stock
    const newTotalQuantity = currentCart[existingItemIndex].quantity + quantity;
    if (newTotalQuantity > availableStock) {
      throw new Error(`Cannot add ${quantity} more. Only ${availableStock} total in stock (${currentCart[existingItemIndex].quantity} already in cart)`);
    }
    
    // Update quantity
    currentCart[existingItemIndex].quantity = newTotalQuantity;
    currentCart[existingItemIndex].subtotal = 
      currentCart[existingItemIndex].quantity * currentCart[existingItemIndex].product_price;
  } else {
    // New item, add to cart
    const cartItem = {
      product_id: product.product_id,
      product_name: product.product_name,
      product_price: product.product_price,
      quantity: quantity,
      subtotal: product.product_price * quantity
    };
    currentCart.push(cartItem);
  }
  
  return [...currentCart]; // Return copy of cart
}

/**
 * Remove item from cart
 * Demonstrates: filter(), creating new array
 */
export function removeFromCart(productId) {
  currentCart = currentCart.filter(item => item.product_id !== productId);
  return [...currentCart];
}

/**
 * Clear entire cart
 * Demonstrates: array reassignment
 */
export function clearCart() {
  currentCart = [];
  return [...currentCart];
}

/**
 * Get current cart
 */
export function getCurrentCart() {
  return [...currentCart];
}

/**
 * Calculate cart total
 * Demonstrates: reduce() for summing values
 */
export function calculateCartTotal() {
  return currentCart.reduce((total, item) => total + item.subtotal, 0);
}

/**
 * Complete transaction and save to memory
 * Demonstrates: push(), object creation with nested arrays, Date object
 * Returns transaction and items that need stock deduction
 */
export function completeTransaction(amountPaid) {
  const totalAmount = calculateCartTotal();
  
  if (amountPaid < totalAmount) {
    throw new Error('Insufficient payment amount');
  }
  
  if (currentCart.length === 0) {
    throw new Error('Cart is empty');
  }
  
  const transaction = {
    transactionId: transactionIdCounter++,
    date: new Date().toISOString(),
    items: currentCart.map(item => ({ ...item })), // Deep copy
    totalAmount: totalAmount,
    amountPaid: amountPaid,
    change: amountPaid - totalAmount
  };
  
  transactions.push(transaction);
  
  // Store items for stock deduction before clearing cart
  const itemsForStockUpdate = [...currentCart];
  
  // Clear cart after successful transaction
  currentCart = [];
  
  return { transaction, itemsForStockUpdate };
}

/**
 * Get all transactions
 * Demonstrates: array return, spread operator
 */
export function getAllTransactions() {
  return [...transactions];
}

/**
 * Get transaction by ID
 * Demonstrates: Array.find()
 */
export function getTransactionById(transactionId) {
  return transactions.find(t => t.transactionId === transactionId);
}

/**
 * Calculate total sales from all transactions
 * Demonstrates: reduce() for aggregation
 */
export function calculateTotalSales() {
  return transactions.reduce((total, transaction) => 
    total + transaction.totalAmount, 0
  );
}

/**
 * Find the most purchased product across all transactions
 * Demonstrates: reduce() with object accumulator, Object.entries(), sort()
 */
export function getMostPurchasedProduct() {
  if (transactions.length === 0) {
    return null;
  }
  
  // Build a map of product_id -> total quantity
  const productQuantities = transactions.reduce((acc, transaction) => {
    transaction.items.forEach(item => {
      if (acc[item.product_id]) {
        acc[item.product_id].quantity += item.quantity;
      } else {
        acc[item.product_id] = {
          product_name: item.product_name,
          quantity: item.quantity
        };
      }
    });
    return acc;
  }, {});
  
  // Find the product with highest quantity
  const entries = Object.entries(productQuantities);
  
  if (entries.length === 0) {
    return null;
  }
  
  const sorted = entries.sort((a, b) => b[1].quantity - a[1].quantity);
  const [productId, data] = sorted[0];
  
  return {
    product_id: parseInt(productId),
    product_name: data.product_name,
    total_quantity: data.quantity
  };
}

/**
 * Get transactions within date range
 * Demonstrates: filter() with Date comparison
 */
export function getTransactionsByDateRange(startDate, endDate) {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
}

/**
 * Get transaction count
 */
export function getTransactionCount() {
  return transactions.length;
}

/**
 * Simulate getting the latest N transactions
 * Demonstrates: slice(), negative indexing
 */
export function getRecentTransactions(count = 10) {
  return transactions.slice(-count).reverse();
}

/**
 * Get total quantity of a product in current cart
 * Demonstrates: find(), optional chaining
 */
export function getCartItemQuantity(productId) {
  const cartItem = currentCart.find(item => item.product_id === productId);
  return cartItem ? cartItem.quantity : 0;
}
