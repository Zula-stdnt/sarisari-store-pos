// dom.js
// DOM rendering utilities enforcing RULE-JS-OBJ-04 (side-effect boundary)
// and RULE-JS-OBJ-05 (Display vs. Reference Decoupling on UI elements).

import { formatPeso, formatDate } from "./utils.js";

/**
 * Remove all child elements from a parent container without layout thrashing
 * @param {HTMLElement} container
 */
export function clearChildren(container) {
  if (!container) return;
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

/**
 * Canonical Component Builder: Category Dropdown (RULE-JS-OBJ-05 & RULE-JS-OBJ-06)
 * Strictly decouples human-facing display (.innerText) from system reference key (.value).
 * @param {HTMLElement} container
 * @param {Array<{ id: string, name: string }>} categories
 * @param {Function} onCategoryChange
 */
export function renderCategoryDropdown(container, categories, onCategoryChange) {
  clearChildren(container);

  const select = document.createElement("select");
  select.id = "category-select";
  select.className = "category-select";
  select.setAttribute("aria-label", "Filter products by category");

  // Pure side-effect iteration (RULE-JS-OBJ-04)
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.innerText = cat.name; // Display value (RULE-JS-OBJ-05)
    option.value = cat.id;       // Reference value (RULE-JS-OBJ-05)
    select.appendChild(option);
  });

  // Attach event listener (RULE-JS-OBJ-06)
  select.addEventListener("change", () => {
    onCategoryChange(select.value);
  });

  container.appendChild(select);
}

/**
 * Render product catalog cards to DOM (RULE-JS-OBJ-04)
 * @param {HTMLElement} container
 * @param {Array<object>} products
 * @param {Function} onAddToCart
 */
export function renderProductCatalog(container, products, onAddToCart) {
  clearChildren(container);

  if (products.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No products found matching your filter criteria.";
    container.appendChild(empty);
    return;
  }

  // Iterate strictly for DOM creation side-effects (RULE-JS-OBJ-04)
  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.product_name;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatPeso(product.product_price);

    // Stock tag with dynamic class styling (dom_apply_styles.md)
    const stockTag = document.createElement("span");
    stockTag.className = "stock-tag";
    const isOutOfStock = product.product_stock === 0;
    const isLowStock = product.product_stock > 0 && product.product_stock <= 5;

    if (isOutOfStock) {
      stockTag.textContent = "Out of Stock";
      stockTag.classList.add("stock-out");
    } else {
      stockTag.textContent = `${product.product_stock} in stock`;
      stockTag.classList.add(isLowStock ? "stock-low" : "stock-ok");
    }

    const controls = document.createElement("div");
    controls.className = "product-controls";

    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = "1";
    qtyInput.max = String(product.product_stock);
    qtyInput.value = "1";
    qtyInput.className = "qty-input";
    qtyInput.disabled = isOutOfStock;

    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary btn-add";
    addBtn.textContent = isOutOfStock ? "Unavailable" : "Add to Cart";
    addBtn.disabled = isOutOfStock;

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

/**
 * Render current shopping cart line items
 * @param {HTMLElement} container
 * @param {Array<object>} cartItems
 * @param {Function} onRemove
 */
export function renderCart(container, cartItems, onRemove) {
  clearChildren(container);

  if (cartItems.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Your cart is currently empty.";
    container.appendChild(empty);
    return;
  }

  const table = document.createElement("table");
  table.className = "cart-table";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Product Item</th>
      <th style="text-align: center;">Qty</th>
      <th style="text-align: right;">Subtotal</th>
      <th style="text-align: center;">Action</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  cartItems.forEach((item, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = item.product_name;

    const qtyCell = document.createElement("td");
    qtyCell.style.textAlign = "center";
    qtyCell.textContent = item.quantity;

    const subtotalCell = document.createElement("td");
    subtotalCell.style.textAlign = "right";
    subtotalCell.textContent = formatPeso(item.subtotal);

    const actionCell = document.createElement("td");
    actionCell.style.textAlign = "center";
    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-remove";
    removeBtn.textContent = "×";
    removeBtn.title = "Remove item from cart";
    removeBtn.setAttribute("aria-label", `Remove ${item.product_name} from cart`);
    removeBtn.addEventListener("click", () => onRemove(index));
    actionCell.appendChild(removeBtn);

    row.appendChild(nameCell);
    row.appendChild(qtyCell);
    row.appendChild(subtotalCell);
    row.appendChild(actionCell);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

/**
 * Render completed transactions history with Master-Detail line items
 * @param {HTMLElement} container
 * @param {Array<object>} transactions
 * @param {Function} onSelectReceipt
 */
export function renderTransactions(container, transactions, onSelectReceipt) {
  clearChildren(container);

  if (transactions.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No completed sales recorded in this session.";
    container.appendChild(empty);
    return;
  }

  // Display most recent transactions at the top
  [...transactions].reverse().forEach((t) => {
    const card = document.createElement("article");
    card.className = "transaction-card";

    // Master Header section
    const header = document.createElement("div");
    header.className = "transaction-header";
    header.innerHTML = `
      <div>
        <strong class="trans-id">Sale #${t.header.transaction_id}</strong>
        <span class="trans-date">${formatDate(t.header.created_at)}</span>
      </div>
      <button class="btn btn-receipt-view" title="View & Print Receipt">Receipt 🧾</button>
    `;

    const viewReceiptBtn = header.querySelector(".btn-receipt-view");
    viewReceiptBtn.addEventListener("click", () => {
      if (typeof onSelectReceipt === "function") {
        onSelectReceipt(t);
      }
    });

    // Detail Line Items list (Master-Detail pattern)
    const detailList = document.createElement("ul");
    detailList.className = "transaction-details-list";
    t.details.forEach((d) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="detail-item-name">${d.quantity}× ${d.product_name}</span>
        <span class="detail-item-price">${formatPeso(d.line_total)}</span>
      `;
      detailList.appendChild(li);
    });

    // Master Header summary
    const totals = document.createElement("div");
    totals.className = "transaction-totals";
    totals.innerHTML = `
      <span>Total: <strong>${formatPeso(t.header.total_amount)}</strong></span>
      <span>Paid: ${formatPeso(t.header.amount_paid)}</span>
      <span>Change: <strong>${formatPeso(t.header.change_amount)}</strong></span>
    `;

    card.appendChild(header);
    card.appendChild(detailList);
    card.appendChild(totals);
    container.appendChild(card);
  });
}

/**
 * Render Session Analytics & Best Seller summary
 * @param {HTMLElement} container
 * @param {number} totalSales
 * @param {Array<object>} mostPurchased
 * @param {number} totalCount
 */
export function renderReportSummary(container, totalSales, mostPurchased, totalCount = 0) {
  clearChildren(container);

  const statsGrid = document.createElement("div");
  statsGrid.className = "report-stats-grid";

  // Total Revenue Stat
  const revenueCard = document.createElement("div");
  revenueCard.className = "stat-card";
  revenueCard.innerHTML = `
    <span class="stat-label">Total Revenue</span>
    <strong class="stat-value">${formatPeso(totalSales)}</strong>
  `;

  // Total Sales Count
  const countCard = document.createElement("div");
  countCard.className = "stat-card";
  countCard.innerHTML = `
    <span class="stat-label">Transactions</span>
    <strong class="stat-value">${totalCount}</strong>
  `;

  // Best Seller Stat
  const bestSellerCard = document.createElement("div");
  bestSellerCard.className = "stat-card stat-card-wide";
  let bestSellerText = "No sales yet";
  if (mostPurchased.length === 1) {
    bestSellerText = `${mostPurchased[0].product_name} (${mostPurchased[0].quantity} sold)`;
  } else if (mostPurchased.length > 1) {
    const names = mostPurchased.map((p) => p.product_name).join(", ");
    bestSellerText = `Tied: ${names} (${mostPurchased[0].quantity} sold each)`;
  }
  bestSellerCard.innerHTML = `
    <span class="stat-label">Top Performer (Best Seller)</span>
    <strong class="stat-value best-seller-text">${bestSellerText}</strong>
  `;

  statsGrid.appendChild(revenueCard);
  statsGrid.appendChild(countCard);
  statsGrid.appendChild(bestSellerCard);
  container.appendChild(statsGrid);
}

/**
 * Display temporary toast/notice banner
 * @param {HTMLElement} container
 * @param {string} message
 * @param {"success"|"error"|"info"} type
 */
export function showNotice(container, message, type = "info") {
  clearChildren(container);
  const notice = document.createElement("div");
  notice.className = `notice notice-${type}`;
  notice.textContent = message;
  container.appendChild(notice);

  // Auto remove after 4 seconds
  setTimeout(() => {
    if (container.contains(notice)) {
      container.removeChild(notice);
    }
  }, 4000);
}

/**
 * Render and display printable thermal-style Receipt Modal
 * @param {HTMLElement} modalEl
 * @param {object} transaction
 * @param {Function} onClose
 */
export function showReceiptModal(modalEl, transaction, onClose) {
  if (!modalEl || !transaction) return;

  const contentSlot = modalEl.querySelector("#receipt-content-slot");
  if (!contentSlot) return;

  clearChildren(contentSlot);

  const receipt = document.createElement("div");
  receipt.className = "thermal-receipt";
  receipt.innerHTML = `
    <div class="receipt-header">
      <h2 class="receipt-store-name">Tindahan ni Aling Neneng</h2>
      <p class="receipt-sub">Sari-Sari Store &middot; Point of Sale</p>
      <p class="receipt-meta">Official Customer Receipt</p>
      <hr class="receipt-divider" />
      <div class="receipt-info-row">
        <span>Receipt #: <strong>${transaction.header.transaction_id}</strong></span>
        <span>Cashier: ${transaction.header.cashier || "Aling Neneng"}</span>
      </div>
      <div class="receipt-info-row">
        <span>Date: ${formatDate(transaction.header.created_at)}</span>
      </div>
      <hr class="receipt-divider" />
    </div>

    <table class="receipt-table">
      <thead>
        <tr>
          <th style="text-align: left;">Item</th>
          <th style="text-align: center;">Qty</th>
          <th style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${transaction.details
          .map(
            (d) => `
          <tr>
            <td>${d.product_name}</td>
            <td style="text-align: center;">${d.quantity}</td>
            <td style="text-align: right;">${formatPeso(d.line_total)}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>

    <hr class="receipt-divider" />

    <div class="receipt-totals-section">
      <div class="receipt-row total-highlight">
        <span>TOTAL DUE:</span>
        <strong>${formatPeso(transaction.header.total_amount)}</strong>
      </div>
      <div class="receipt-row">
        <span>CASH TENDERED:</span>
        <span>${formatPeso(transaction.header.amount_paid)}</span>
      </div>
      <div class="receipt-row">
        <span>CHANGE DUE:</span>
        <strong>${formatPeso(transaction.header.change_amount)}</strong>
      </div>
      <div class="receipt-row">
        <span>ITEMS COUNT:</span>
        <span>${transaction.header.items_count} lines</span>
      </div>
    </div>

    <hr class="receipt-divider" />

    <div class="receipt-footer">
      <p class="thank-you">Maraming Salamat Po!</p>
      <p class="tagline">Please come again &middot; Mabuhay!</p>
    </div>
  `;

  contentSlot.appendChild(receipt);
  modalEl.classList.remove("hidden");
  modalEl.setAttribute("aria-hidden", "false");

  // Wire close buttons
  const closeBtn = modalEl.querySelector("#close-receipt-btn");
  const printBtn = modalEl.querySelector("#print-receipt-btn");
  const backdrop = modalEl.querySelector(".receipt-backdrop");

  const closeModal = () => {
    modalEl.classList.add("hidden");
    modalEl.setAttribute("aria-hidden", "true");
    if (typeof onClose === "function") onClose();
  };

  if (closeBtn) closeBtn.onclick = closeModal;
  if (backdrop) backdrop.onclick = closeModal;
  if (printBtn) {
    printBtn.onclick = () => {
      window.print();
    };
  }
}
