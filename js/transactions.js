// transactions.js
// Transaction management implementing Master-Detail (Header-Detail) relational model,
// Factory Functions (RULE-JS-OBJ-01), and Declarative Aggregations (RULE-JS-OBJ-03).

import { getProductById, decrementStock } from "./products.js";
import { getStorage, setStorage } from "./utils.js";

const STORAGE_TRANSACTIONS_KEY = "sarisari_pos_transactions_v1";
const STORAGE_TRANS_ID_KEY = "sarisari_pos_next_trans_id_v1";

/**
 * Factory Function: Cart Line Item (RULE-JS-OBJ-01)
 */
export const createCartItem = (product, quantity) => ({
  product_id: product.product_id,
  product_name: product.product_name,
  product_price: product.product_price,
  quantity,
  subtotal: product.product_price * quantity,
});

/**
 * Factory Function: Master Transaction Header (RULE-JS-OBJ-01, Master-Detail pattern)
 */
export const createTransactionHeader = (
  transaction_id,
  created_at,
  cashier,
  total_amount,
  amount_paid,
  change_amount,
  items_count
) => ({
  transaction_id,
  created_at,
  cashier,
  total_amount,
  amount_paid,
  change_amount,
  items_count,
});

/**
 * Factory Function: Transaction Line Detail (RULE-JS-OBJ-01, Master-Detail pattern)
 */
export const createTransactionDetail = (
  detail_id,
  transaction_id,
  product_id,
  product_name,
  unit_price,
  quantity,
  line_total
) => ({
  detail_id,
  transaction_id,
  product_id,
  product_name,
  unit_price,
  quantity,
  line_total,
});

/** Active working cart in-memory */
export const cart = [];

/** Persistent completed transactions history */
export const transactions = getStorage(STORAGE_TRANSACTIONS_KEY, []);

/** Auto-incrementing transaction ID sequence */
let nextTransactionId = getStorage(STORAGE_TRANS_ID_KEY, 1);

/**
 * Save transactions history to persistent storage
 */
export function saveTransactions() {
  setStorage(STORAGE_TRANSACTIONS_KEY, transactions);
  setStorage(STORAGE_TRANS_ID_KEY, nextTransactionId);
}

/**
 * Add product to active cart with stock validation and line consolidation
 * @param {number} productId
 * @param {number} quantity
 * @returns {{ ok: boolean, message: string }}
 */
export function addToCart(productId, quantity) {
  const product = getProductById(productId);
  if (!product) {
    return { ok: false, message: "Product not found." };
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return { ok: false, message: "Quantity must be a positive whole number." };
  }

  // Check existing quantity already in cart
  const existingIndex = cart.findIndex((item) => item.product_id === product.product_id);
  const currentInCart = existingIndex !== -1 ? cart[existingIndex].quantity : 0;
  const newTotalQty = currentInCart + quantity;

  if (newTotalQty > product.product_stock) {
    return {
      ok: false,
      message: `Cannot add ${quantity} more. Only ${product.product_stock} in stock (${currentInCart} already in cart).`,
    };
  }

  if (existingIndex !== -1) {
    // Consolidate quantity on existing line
    cart[existingIndex].quantity = newTotalQty;
    cart[existingIndex].subtotal = cart[existingIndex].quantity * product.product_price;
  } else {
    // Add new line item using Factory Function (RULE-JS-OBJ-01)
    cart.push(createCartItem(product, quantity));
  }

  return { ok: true, message: `Added ${quantity} x ${product.product_name} to cart.` };
}

/**
 * Remove line item from cart by array index
 * @param {number} index
 * @returns {boolean}
 */
export function removeFromCart(index) {
  if (index < 0 || index >= cart.length) return false;
  cart.splice(index, 1);
  return true;
}

/**
 * Empty the current cart
 */
export function clearCart() {
  cart.length = 0;
}

/**
 * Calculate total amount due for current cart using declarative reduce (RULE-JS-OBJ-03)
 * @returns {number}
 */
export function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.subtotal, 0);
}

/**
 * Execute Checkout: Validates payment, decrements stock, constructs Master-Detail record,
 * and persists the completed transaction.
 * @param {number} amountPaid
 * @param {string} cashier
 * @returns {{ ok: boolean, message: string, transaction?: object }}
 */
export function checkout(amountPaid, cashier = "Aling Neneng") {
  if (cart.length === 0) {
    return { ok: false, message: "Current sale cart is empty." };
  }

  const totalAmount = getCartTotal();

  if (!Number.isFinite(amountPaid) || amountPaid < totalAmount) {
    return {
      ok: false,
      message: `Insufficient payment. Total due is ₱${totalAmount.toFixed(2)}, received ₱${(amountPaid || 0).toFixed(2)}.`,
    };
  }

  // Double check stock availability for all cart items before committing
  for (const item of cart) {
    const product = getProductById(item.product_id);
    if (!product || product.product_stock < item.quantity) {
      return {
        ok: false,
        message: `Insufficient stock for ${item.product_name}. Transaction aborted.`,
      };
    }
  }

  // 1. Commit inventory deductions
  cart.forEach((item) => {
    decrementStock(item.product_id, item.quantity);
  });

  const transactionId = nextTransactionId++;
  const createdAt = new Date().toISOString();
  const changeAmount = amountPaid - totalAmount;

  // 2. Build Master Header record (RULE-JS-OBJ-01, Master-Detail pattern)
  const header = createTransactionHeader(
    transactionId,
    createdAt,
    cashier,
    totalAmount,
    amountPaid,
    changeAmount,
    cart.length
  );

  // 3. Build Detail Line records (RULE-JS-OBJ-01, Master-Detail pattern)
  const details = cart.map((item, idx) =>
    createTransactionDetail(
      idx + 1,
      transactionId,
      item.product_id,
      item.product_name,
      item.product_price,
      item.quantity,
      item.subtotal
    )
  );

  const completedTransaction = { header, details };

  // 4. Record and persist
  transactions.push(completedTransaction);
  saveTransactions();

  // 5. Clear cart
  clearCart();

  return {
    ok: true,
    message: `Sale #${transactionId} completed successfully. Change: ₱${changeAmount.toFixed(2)}`,
    transaction: completedTransaction,
  };
}

/**
 * Declarative calculation of total sales revenue using reduce (RULE-JS-OBJ-03)
 * @returns {number}
 */
export function getTotalSales() {
  return transactions.reduce((sum, t) => sum + t.header.total_amount, 0);
}

/**
 * Identify best-selling product(s) by total units sold across transaction details
 * @returns {Array<{ product_id: number, product_name: string, quantity: number }>}
 */
export function getMostPurchasedProducts() {
  if (transactions.length === 0) return [];

  // Declarative aggregation of line quantities
  const salesMap = transactions.reduce((acc, t) => {
    t.details.forEach((detail) => {
      acc[detail.product_id] = acc[detail.product_id] || {
        product_id: detail.product_id,
        product_name: detail.product_name,
        quantity: 0,
      };
      acc[detail.product_id].quantity += detail.quantity;
    });
    return acc;
  }, {});

  const entries = Object.values(salesMap);
  if (entries.length === 0) return [];

  const maxQuantity = entries.reduce((max, e) => Math.max(max, e.quantity), 0);
  return entries.filter((e) => e.quantity === maxQuantity);
}

/**
 * Clear all transaction records and reset ID sequence in persistent storage
 */
export function clearAllTransactions() {
  transactions.length = 0;
  nextTransactionId = 1;
  saveTransactions();
}
