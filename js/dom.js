// dom.js
// All repeating UI (catalog, cart, transaction history, report) is built with
// createElement/appendChild — no static hardcoded HTML for repeating data.

import { formatPeso, formatDate } from "./utils.js";

export function clearChildren(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

export function renderProductCatalog(container, products, onAddToCart) {
  clearChildren(container);

  if (products.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No products match your search.";
    container.appendChild(empty);
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.product_name;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatPeso(product.product_price);

    const stockTag = document.createElement("span");
    stockTag.className = "stock-tag";
    stockTag.textContent = product.product_stock > 0 ? `${product.product_stock} in stock` : "Out of stock";
    // Styling applied dynamically via classList, per Section 6 item 6.
    stockTag.classList.add(product.product_stock === 0 ? "stock-out" : "stock-ok");
    if (product.product_stock > 0 && product.product_stock <= 5) {
      // A little inline style.property tweak too, so both mechanisms are demonstrated.
      stockTag.style.fontStyle = "italic";
    }

    const controls = document.createElement("div");
    controls.className = "product-controls";

    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = "1";
    qtyInput.value = "1";
    qtyInput.className = "qty-input";
    qtyInput.disabled = product.product_stock === 0;

    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary";
    addBtn.textContent = "Add to cart";
    addBtn.disabled = product.product_stock === 0;
    addBtn.addEventListener("click", () => {
      const qty = parseInt(qtyInput.value, 10);
      onAddToCart(product.product_id, qty);
    });

    controls.appendChild(qtyInput);
    controls.appendChild(addBtn);

    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(stockTag);
    card.appendChild(controls);
    container.appendChild(card);
  });
}

export function renderCart(container, cartItems, onRemove) {
  clearChildren(container);

  if (cartItems.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Cart is empty.";
    container.appendChild(empty);
    return;
  }

  const table = document.createElement("table");
  table.className = "cart-table";

  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th>Item</th><th>Qty</th><th>Subtotal</th><th></th></tr>";
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  cartItems.forEach((item, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = item.product_name;

    const qtyCell = document.createElement("td");
    qtyCell.textContent = item.quantity;

    const subtotalCell = document.createElement("td");
    subtotalCell.textContent = formatPeso(item.subtotal);

    const removeCell = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-remove";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => onRemove(index));
    removeCell.appendChild(removeBtn);

    row.appendChild(nameCell);
    row.appendChild(qtyCell);
    row.appendChild(subtotalCell);
    row.appendChild(removeCell);
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  container.appendChild(table);
}

export function renderTransactions(container, transactions) {
  clearChildren(container);

  if (transactions.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No transactions yet this session.";
    container.appendChild(empty);
    return;
  }

  // Most recent first.
  [...transactions].reverse().forEach((t) => {
    const card = document.createElement("div");
    card.className = "transaction-card";

    const header = document.createElement("div");
    header.className = "transaction-header";
    header.innerHTML = `<strong>Transaction #${t.transactionId}</strong> <span>${formatDate(t.date)}</span>`;

    const itemsList = document.createElement("ul");
    t.items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.quantity} x ${item.product_name} — ${formatPeso(item.subtotal)}`;
      itemsList.appendChild(li);
    });

    const totals = document.createElement("p");
    totals.className = "transaction-totals";
    totals.textContent = `Total: ${formatPeso(t.totalAmount)} | Paid: ${formatPeso(t.amountPaid)} | Change: ${formatPeso(t.change)}`;

    card.appendChild(header);
    card.appendChild(itemsList);
    card.appendChild(totals);
    container.appendChild(card);
  });
}

export function renderReportSummary(container, totalSales, mostPurchased) {
  clearChildren(container);

  const salesLine = document.createElement("p");
  salesLine.className = "report-line";
  salesLine.innerHTML = `<strong>Total sales this session:</strong> ${formatPeso(totalSales)}`;

  const bestLine = document.createElement("p");
  bestLine.className = "report-line";
  if (mostPurchased.length === 0) {
    bestLine.innerHTML = "<strong>Best seller:</strong> no sales yet.";
  } else if (mostPurchased.length === 1) {
    bestLine.innerHTML = `<strong>Best seller:</strong> ${mostPurchased[0].product_name} (${mostPurchased[0].quantity} sold)`;
  } else {
    const names = mostPurchased.map((p) => p.product_name).join(", ");
    bestLine.innerHTML = `<strong>Best sellers (tied):</strong> ${names} (${mostPurchased[0].quantity} sold each)`;
  }

  container.appendChild(salesLine);
  container.appendChild(bestLine);
}

export function showNotice(container, message, type = "info") {
  clearChildren(container);
  const notice = document.createElement("div");
  notice.className = "notice";
  notice.classList.add(type === "error" ? "notice-error" : "notice-success");
  notice.textContent = message;
  container.appendChild(notice);

  // Auto-clear after a few seconds so notices don't pile up.
  setTimeout(() => {
    if (container.contains(notice)) container.removeChild(notice);
  }, 4000);
}
