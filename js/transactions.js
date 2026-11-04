// transactions.js
// `cart` = in-progress line items for the sale currently being built.
// `transactions` = completed, immutable sale records (schema in AGENTS.md 5.4).
// These are intentionally two separate arrays, per spec 5.2/5.4.

import { getProductById, decrementStock } from "./products.js";

export const cart = [];
export const transactions = [];

let nextTransactionId = 1;

/**
 * Add a line item to the cart.
 * Fix over the original spec: validates quantity is a positive integer and
 * does not exceed remaining stock. Returns { ok, message } instead of
 * silently pushing bad data — the spec never said what should happen on
 * invalid input, so this is the explicit rule.
 */
export function addToCart(productId, quantity) {
  const product = getProductById(productId);
  if (!product) {
    return { ok: false, message: "Product not found." };
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return { ok: false, message: "Quantity must be a whole number greater than 0." };
  }
  if (quantity > product.product_stock) {
    return { ok: false, message: `Only ${product.product_stock} left in stock.` };
  }

  const subtotal = product.product_price * quantity;
  cart.push({
    product_id: product.product_id,
    product_name: product.product_name,
    product_price: product.product_price,
    quantity,
    subtotal,
  });

  return { ok: true, message: `Added ${quantity} x ${product.product_name} to cart.` };
}

/** Remove one line item from the cart by its index. */
export function removeFromCart(index) {
  if (index < 0 || index >= cart.length) return false;
  cart.splice(index, 1);
  return true;
}

/** Total due for everything currently in the cart. */
export function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.subtotal, 0);
}

/**
 * Attempt checkout. Validates payment >= total due (spec 5.3), decrements
 * stock for every line item, assembles the transaction record (spec 5.4),
 * pushes it into `transactions`, and clears the cart.
 */
export function checkout(amountPaid) {
  if (cart.length === 0) {
    return { ok: false, message: "Cart is empty." };
  }

  const totalAmount = getCartTotal();

  if (!Number.isFinite(amountPaid) || amountPaid < totalAmount) {
    return { ok: false, message: "Payment must be greater than or equal to the total due." };
  }

  // Re-check stock at checkout time in case the same product was added
  // to the cart in multiple line items.
  const combinedQuantities = {};
  for (const item of cart) {
    combinedQuantities[item.product_id] = (combinedQuantities[item.product_id] || 0) + item.quantity;
  }
  for (const [productId, qty] of Object.entries(combinedQuantities)) {
    const product = getProductById(Number(productId));
    if (!product || product.product_stock < qty) {
      return { ok: false, message: `Not enough stock for ${product ? product.product_name : "an item"} anymore.` };
    }
  }

  // Commit: decrement stock, then record the transaction.
  for (const [productId, qty] of Object.entries(combinedQuantities)) {
    decrementStock(Number(productId), qty);
  }

  const record = {
    transactionId: nextTransactionId++,
    date: new Date().toISOString(),
    items: cart.map((item) => ({ ...item })),
    totalAmount,
    amountPaid,
    change: amountPaid - totalAmount,
  };

  transactions.push(record);
  cart.length = 0; // clear cart in place

  return { ok: true, message: "Transaction completed.", record };
}

/** Sum of totalAmount across all completed transactions. */
export function getTotalSales() {
  return transactions.reduce((sum, t) => sum + t.totalAmount, 0);
}

/**
 * Most purchased product(s) by total quantity sold.
 * Fix over the original spec: ties are returned as a list, not silently
 * collapsed to whichever one `reduce` happened to see first.
 */
export function getMostPurchasedProducts() {
  const quantityByProduct = {};

  transactions.forEach((t) => {
    t.items.forEach((item) => {
      quantityByProduct[item.product_id] = quantityByProduct[item.product_id] || {
        product_name: item.product_name,
        quantity: 0,
      };
      quantityByProduct[item.product_id].quantity += item.quantity;
    });
  });

  const entries = Object.values(quantityByProduct);
  if (entries.length === 0) return [];

  const maxQuantity = entries.reduce((max, e) => Math.max(max, e.quantity), 0);
  return entries.filter((e) => e.quantity === maxQuantity);
}
