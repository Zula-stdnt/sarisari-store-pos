// main.js — app entry point

import { groceryItems, filterProducts } from "./products.js";
import { cart, transactions, addToCart, removeFromCart, getCartTotal, checkout, getTotalSales, getMostPurchasedProducts } from "./transactions.js";
import { renderProductCatalog, renderCart, renderTransactions, renderReportSummary, showNotice } from "./dom.js";
import { fetchSupplierCatalog } from "./api.js";
import { formatPeso } from "./utils.js";

const catalogEl = document.getElementById("catalog");
const searchInput = document.getElementById("search-input");
const cartEl = document.getElementById("cart");
const cartTotalEl = document.getElementById("cart-total");
const amountPaidInput = document.getElementById("amount-paid");
const checkoutBtn = document.getElementById("checkout-btn");
const noticeEl = document.getElementById("notice");
const transactionsEl = document.getElementById("transactions");
const reportEl = document.getElementById("report");
const syncStatusEl = document.getElementById("sync-status");

function refreshCatalog() {
  const query = searchInput.value;
  renderProductCatalog(catalogEl, filterProducts(query), handleAddToCart);
}

function refreshCart() {
  renderCart(cartEl, cart, handleRemoveFromCart);
  cartTotalEl.textContent = formatPeso(getCartTotal());
}

function refreshReports() {
  renderTransactions(transactionsEl, transactions);
  renderReportSummary(reportEl, getTotalSales(), getMostPurchasedProducts());
}

function handleAddToCart(productId, quantity) {
  const result = addToCart(productId, quantity);
  showNotice(noticeEl, result.message, result.ok ? "success" : "error");
  if (result.ok) {
    refreshCart();
  }
}

function handleRemoveFromCart(index) {
  removeFromCart(index);
  refreshCart();
}

function handleCheckout() {
  const amountPaid = parseFloat(amountPaidInput.value);
  const result = checkout(amountPaid);
  showNotice(noticeEl, result.message, result.ok ? "success" : "error");
  if (result.ok) {
    amountPaidInput.value = "";
    refreshCart();
    refreshCatalog(); // stock counts changed
    refreshReports();
  }
}

searchInput.addEventListener("input", refreshCatalog);
checkoutBtn.addEventListener("click", handleCheckout);

// Initial render
refreshCatalog();
refreshCart();
refreshReports();

// Axios demo (Section 6, item 2): sync against the local "supplier" feed.
fetchSupplierCatalog().then((result) => {
  if (result.ok) {
    syncStatusEl.textContent = `Supplier catalog synced: ${result.data.length} products confirmed.`;
    syncStatusEl.classList.add("sync-ok");
  } else {
    syncStatusEl.textContent = `Supplier sync failed: ${result.error}`;
    syncStatusEl.classList.add("sync-fail");
  }
});
