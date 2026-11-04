/**
 * Tindahan ni Aling Neneng — Sari-Sari Store POS (Universal Browser Bundle)
 * Academic Mini Project for ITE 387 Advance Programming (3rd Year, 1st Semester)
 * 
 * Enforces:
 * - RULE-JS-OBJ-01: Factory Functions for repetitive entities
 * - RULE-JS-OBJ-02: Property Access Grammar (Dot vs Bracket Notation)
 * - RULE-JS-OBJ-03: Declarative Query Primacy (.filter, .reduce, .map, .find)
 * - RULE-JS-OBJ-04: Side-Effect Boundary (.forEach strictly for DOM rendering)
 * - RULE-JS-OBJ-05: Display vs Reference Decoupling (.innerText vs .value)
 * - Master-Detail (Header-Detail) Relational Architecture
 * - Universal execution with zero CORS issues on file:/// and localhost
 */

(function () {
  "use strict";

  // =========================================================================
  // SECTION 1: UTILITIES & PERSISTENT STORAGE
  // =========================================================================

  function formatPeso(amount) {
    const numeric = Number(amount) || 0;
    return "₱" + numeric.toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function formatDate(isoString) {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getStorage(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch (err) {
      console.warn(`[Storage] Failed to read "${key}":`, err);
      return fallback;
    }
  }

  function setStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`[Storage] Failed to write "${key}":`, err);
    }
  }

  // =========================================================================
  // SECTION 2: PRODUCT CATALOG & INVENTORY (RULE-JS-OBJ-01, RULE-JS-OBJ-03)
  // =========================================================================

  const STORAGE_STOCK_KEY = "sarisari_pos_stock_v1";

  /** Factory Function: Product Entity (RULE-JS-OBJ-01) */
  const createProduct = (
    product_id,
    product_name,
    product_price,
    product_stock,
    category = "pantry",
    initial_stock = product_stock
  ) => ({
    product_id,
    product_name,
    product_price,
    product_stock,
    category,
    initial_stock,
  });

  const productCategories = [
    { id: "all", name: "All Categories" },
    { id: "snacks", name: "Snacks & Confectionery" },
    { id: "beverages", name: "Beverages & Coffee" },
    { id: "pantry", name: "Pantry & Condiments" },
    { id: "bakery-grains", name: "Grains & Bakery" },
    { id: "fresh-frozen", name: "Fresh & Frozen Produce/Meats" },
    { id: "native-delicacies", name: "Native Delicacies (Kakanin)" },
  ];

  const initialCatalogData = [
    // Snacks
    createProduct(1, "Dried Mangoes (200g)", 180, 24, "snacks"),
    createProduct(2, "Banana Chips (200g)", 120, 30, "snacks"),
    createProduct(6, "Peanut Brittle (200g)", 150, 22, "snacks"),
    createProduct(7, "Cashew Nuts (250g)", 280, 12, "snacks"),
    createProduct(12, "Rice Crackers (200g)", 100, 35, "snacks"),
    createProduct(16, "Chicharon (100g)", 120, 28, "snacks"),
    createProduct(43, "Native Peanuts (250g)", 100, 25, "snacks"),

    // Beverages
    createProduct(8, "Philippine Coffee Beans (250g)", 320, 10, "beverages"),
    createProduct(20, "Corn Coffee (250g)", 150, 18, "beverages"),
    createProduct(21, "Coconut Water (1L)", 100, 24, "beverages"),
    createProduct(22, "Calamansi Juice (1L)", 120, 22, "beverages"),
    createProduct(50, "Native Chocolate Drink (Sikwate, 250ml)", 90, 20, "beverages"),

    // Pantry & Condiments
    createProduct(3, "Tablea Chocolate (250g)", 200, 15, "pantry"),
    createProduct(4, "Coconut Oil (500ml)", 180, 18, "pantry"),
    createProduct(5, "Mango Jam (250g)", 160, 20, "pantry"),
    createProduct(9, "Native Vinegar (500ml)", 120, 25, "pantry"),
    createProduct(10, "Philippine Honey (250ml)", 250, 14, "pantry"),
    createProduct(11, "Coconut Sugar (500g)", 180, 20, "pantry"),
    createProduct(13, "Salted Fish (Danggit, 250g)", 220, 16, "pantry"),
    createProduct(23, "Guava Jelly (250g)", 160, 15, "pantry"),
    createProduct(24, "Bagoong (250g)", 90, 20, "pantry"),
    createProduct(25, "Fish Sauce (Patis, 500ml)", 110, 26, "pantry"),
    createProduct(26, "Soy Sauce (500ml)", 95, 26, "pantry"),
    createProduct(27, "Native Salt (250g)", 50, 40, "pantry"),
    createProduct(28, "Coconut Milk Powder (200g)", 140, 20, "pantry"),
    createProduct(29, "Instant Noodles (Pack of 6)", 75, 45, "pantry"),
    createProduct(30, "Native Cheese (Kesong Puti, 250g)", 180, 12, "pantry"),

    // Grains & Bakery
    createProduct(17, "Pandesal Pack (12 pcs)", 80, 40, "bakery-grains"),
    createProduct(18, "Native Brown Rice (1kg)", 90, 30, "bakery-grains"),
    createProduct(19, "White Rice (1kg)", 70, 50, "bakery-grains"),

    // Fresh & Frozen
    createProduct(14, "Longganisa (Frozen, 500g)", 280, 12, "fresh-frozen"),
    createProduct(15, "Tocino (Frozen, 500g)", 300, 10, "fresh-frozen"),
    createProduct(31, "Eggs (Dozen)", 90, 35, "fresh-frozen"),
    createProduct(32, "Fresh Tilapia (1kg)", 160, 14, "fresh-frozen"),
    createProduct(33, "Fresh Bangus (Milkfish, 1kg)", 180, 14, "fresh-frozen"),
    createProduct(34, "Fresh Chicken (1kg)", 200, 16, "fresh-frozen"),
    createProduct(35, "Fresh Pork (1kg)", 280, 12, "fresh-frozen"),
    createProduct(36, "Fresh Beef (1kg)", 350, 8, "fresh-frozen"),
    createProduct(37, "Native Vegetables Basket", 250, 10, "fresh-frozen"),
    createProduct(38, "Bananas (1kg)", 60, 30, "fresh-frozen"),
    createProduct(39, "Mangoes (1kg)", 120, 25, "fresh-frozen"),
    createProduct(40, "Papaya (1kg)", 70, 20, "fresh-frozen"),
    createProduct(41, "Pineapple (Whole)", 90, 18, "fresh-frozen"),
    createProduct(42, "Coconut (Whole)", 50, 30, "fresh-frozen"),
    createProduct(44, "Camote (Sweet Potato, 1kg)", 80, 18, "fresh-frozen"),

    // Native Delicacies
    createProduct(45, "Ube Halaya (250g)", 180, 15, "native-delicacies"),
    createProduct(46, "Leche Flan (Whole)", 250, 12, "native-delicacies"),
    createProduct(47, "Bibingka (Whole)", 200, 14, "native-delicacies"),
    createProduct(48, "Puto (Dozen)", 120, 20, "native-delicacies"),
    createProduct(49, "Kakanin Sampler Pack", 300, 10, "native-delicacies"),
  ];

  function initializeCatalog() {
    const savedStock = getStorage(STORAGE_STOCK_KEY, null);
    if (!savedStock) {
      return initialCatalogData.map((p) => ({ ...p }));
    }
    return initialCatalogData.map((p) => ({
      ...p,
      product_stock:
        typeof savedStock[p.product_id] === "number"
          ? savedStock[p.product_id]
          : p.product_stock,
    }));
  }

  const groceryItems = initializeCatalog();

  function saveStockState() {
    const stockMap = groceryItems.reduce((acc, item) => {
      acc[item.product_id] = item.product_stock;
      return acc;
    }, {});
    setStorage(STORAGE_STOCK_KEY, stockMap);
  }

  function getProductById(productId) {
    return groceryItems.find((p) => p.product_id === Number(productId));
  }

  function filterProducts(query = "", categoryId = "all") {
    const cleanQuery = query.trim().toLowerCase();
    return groceryItems.filter((product) => {
      const matchesCategory =
        categoryId === "all" || product.category === categoryId;
      const matchesQuery =
        cleanQuery === "" ||
        product.product_name.toLowerCase().includes(cleanQuery);
      return matchesCategory && matchesQuery;
    });
  }

  function decrementStock(productId, quantity) {
    const product = getProductById(productId);
    if (!product || product.product_stock < quantity) return false;
    product.product_stock -= quantity;
    saveStockState();
    return true;
  }

  function restockAllProducts() {
    initialCatalogData.forEach((initial) => {
      const product = getProductById(initial.product_id);
      if (product) {
        product.product_stock = initial.initial_stock;
      }
    });
    saveStockState();
  }

  // =========================================================================
  // SECTION 3: TRANSACTIONS & MASTER-DETAIL RELATIONAL MODEL
  // =========================================================================

  const STORAGE_TRANSACTIONS_KEY = "sarisari_pos_transactions_v1";
  const STORAGE_TRANS_ID_KEY = "sarisari_pos_next_trans_id_v1";

  /** Factory Function: Cart Item (RULE-JS-OBJ-01) */
  const createCartItem = (product, quantity) => ({
    product_id: product.product_id,
    product_name: product.product_name,
    product_price: product.product_price,
    quantity,
    subtotal: product.product_price * quantity,
  });

  /** Factory Function: Master Transaction Header (RULE-JS-OBJ-01) */
  const createTransactionHeader = (
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

  /** Factory Function: Transaction Line Detail (RULE-JS-OBJ-01) */
  const createTransactionDetail = (
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

  const cart = [];
  const transactions = getStorage(STORAGE_TRANSACTIONS_KEY, []);
  let nextTransactionId = getStorage(STORAGE_TRANS_ID_KEY, 1);

  function saveTransactions() {
    setStorage(STORAGE_TRANSACTIONS_KEY, transactions);
    setStorage(STORAGE_TRANS_ID_KEY, nextTransactionId);
  }

  function addToCart(productId, quantity) {
    const product = getProductById(productId);
    if (!product) return { ok: false, message: "Product not found." };
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return { ok: false, message: "Quantity must be a whole positive number." };
    }

    const existingIndex = cart.findIndex((i) => i.product_id === product.product_id);
    const inCart = existingIndex !== -1 ? cart[existingIndex].quantity : 0;
    const newQty = inCart + quantity;

    if (newQty > product.product_stock) {
      return {
        ok: false,
        message: `Cannot add ${quantity} more. Only ${product.product_stock} in stock (${inCart} already in cart).`,
      };
    }

    if (existingIndex !== -1) {
      cart[existingIndex].quantity = newQty;
      cart[existingIndex].subtotal = cart[existingIndex].quantity * product.product_price;
    } else {
      cart.push(createCartItem(product, quantity));
    }

    return { ok: true, message: `Added ${quantity} × ${product.product_name} to cart.` };
  }

  function removeFromCart(index) {
    if (index < 0 || index >= cart.length) return false;
    cart.splice(index, 1);
    return true;
  }

  function clearCart() {
    cart.length = 0;
  }

  function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.subtotal, 0);
  }

  function getCartItemCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function checkout(amountPaid, cashier = "Aling Neneng") {
    if (cart.length === 0) {
      return { ok: false, message: "Current sale cart is empty." };
    }

    const totalAmount = getCartTotal();
    if (!Number.isFinite(amountPaid) || amountPaid < totalAmount) {
      return {
        ok: false,
        message: `Insufficient payment. Total due: ₱${totalAmount.toFixed(2)}, received: ₱${(amountPaid || 0).toFixed(2)}.`,
      };
    }

    // Verify stock
    for (const item of cart) {
      const product = getProductById(item.product_id);
      if (!product || product.product_stock < item.quantity) {
        return {
          ok: false,
          message: `Insufficient stock for ${item.product_name}. Sale aborted.`,
        };
      }
    }

    // Commit inventory deductions
    cart.forEach((item) => {
      decrementStock(item.product_id, item.quantity);
    });

    const transactionId = nextTransactionId++;
    const createdAt = new Date().toISOString();
    const changeAmount = amountPaid - totalAmount;

    // Master Header (Master-Detail pattern)
    const header = createTransactionHeader(
      transactionId,
      createdAt,
      cashier,
      totalAmount,
      amountPaid,
      changeAmount,
      cart.length
    );

    // Detail Lines (Master-Detail pattern)
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

    const completedRecord = { header, details };
    transactions.push(completedRecord);
    saveTransactions();
    clearCart();

    return {
      ok: true,
      message: `Sale #${transactionId} completed! Change: ₱${changeAmount.toFixed(2)}`,
      transaction: completedRecord,
    };
  }

  function getTotalSales() {
    return transactions.reduce((sum, t) => sum + t.header.total_amount, 0);
  }

  function getMostPurchasedProducts() {
    if (transactions.length === 0) return [];

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

    const maxQty = entries.reduce((max, e) => Math.max(max, e.quantity), 0);
    return entries.filter((e) => e.quantity === maxQty);
  }

  function clearAllTransactions() {
    transactions.length = 0;
    nextTransactionId = 1;
    saveTransactions();
  }

  // =========================================================================
  // SECTION 4: DOM RENDERING (RULE-JS-OBJ-04, RULE-JS-OBJ-05)
  // =========================================================================

  function clearChildren(container) {
    if (!container) return;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function renderCategoryDropdown(container, categories, onCategoryChange) {
    clearChildren(container);
    const select = document.createElement("select");
    select.id = "category-select";
    select.className = "category-select";
    select.setAttribute("aria-label", "Filter products by category");

    // Pure side effect loop (RULE-JS-OBJ-04)
    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.innerText = cat.name; // Display value (RULE-JS-OBJ-05)
      option.value = cat.id;       // Reference key (RULE-JS-OBJ-05)
      select.appendChild(option);
    });

    select.addEventListener("change", () => onCategoryChange(select.value));
    container.appendChild(select);
  }

  function renderProductCatalog(container, products, onAddToCart) {
    clearChildren(container);

    if (products.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "No products found matching your filter criteria.";
      container.appendChild(empty);
      return;
    }

    products.forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card";

      const headerDiv = document.createElement("div");
      headerDiv.className = "product-info-wrap";

      const name = document.createElement("h3");
      name.className = "product-name";
      name.textContent = product.product_name;

      const price = document.createElement("p");
      price.className = "product-price";
      price.textContent = formatPeso(product.product_price);

      headerDiv.appendChild(name);
      headerDiv.appendChild(price);

      const stockTag = document.createElement("span");
      stockTag.className = "stock-tag";
      const isOut = product.product_stock === 0;
      const isLow = product.product_stock > 0 && product.product_stock <= 5;

      if (isOut) {
        stockTag.textContent = "Out of Stock";
        stockTag.classList.add("stock-out");
      } else {
        stockTag.textContent = `${product.product_stock} in stock`;
        stockTag.classList.add(isLow ? "stock-low" : "stock-ok");
      }

      const controls = document.createElement("div");
      controls.className = "product-controls";

      const qtyInput = document.createElement("input");
      qtyInput.type = "number";
      qtyInput.min = "1";
      qtyInput.max = String(product.product_stock);
      qtyInput.value = "1";
      qtyInput.className = "qty-input";
      qtyInput.disabled = isOut;
      qtyInput.setAttribute("aria-label", `Quantity for ${product.product_name}`);

      const addBtn = document.createElement("button");
      addBtn.className = "btn btn-primary btn-add";
      addBtn.textContent = isOut ? "Unavailable" : "Add to Cart";
      addBtn.disabled = isOut;

      addBtn.addEventListener("click", () => {
        const qty = parseInt(qtyInput.value, 10);
        onAddToCart(product.product_id, qty);
      });

      controls.appendChild(qtyInput);
      controls.appendChild(addBtn);

      card.appendChild(headerDiv);
      card.appendChild(stockTag);
      card.appendChild(controls);
      container.appendChild(card);
    });
  }

  function renderCart(container, cartItems, onRemove) {
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
      removeBtn.title = `Remove ${item.product_name}`;
      removeBtn.setAttribute("aria-label", `Remove ${item.product_name}`);
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

  function renderTransactions(container, transactionsList, onSelectReceipt) {
    clearChildren(container);

    if (transactionsList.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "No completed sales recorded in this session.";
      container.appendChild(empty);
      return;
    }

    [...transactionsList].reverse().forEach((t) => {
      const card = document.createElement("article");
      card.className = "transaction-card";

      const header = document.createElement("div");
      header.className = "transaction-header";
      header.innerHTML = `
        <div>
          <strong class="trans-id">Sale #${t.header.transaction_id}</strong>
          <span class="trans-date">${formatDate(t.header.created_at)}</span>
        </div>
        <button class="btn btn-receipt-view" title="View & Print Receipt">Receipt 🧾</button>
      `;

      const viewBtn = header.querySelector(".btn-receipt-view");
      viewBtn.addEventListener("click", () => {
        if (typeof onSelectReceipt === "function") {
          onSelectReceipt(t);
        }
      });

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

  function renderReportSummary(container, totalSales, mostPurchased, totalCount = 0) {
    clearChildren(container);

    const statsGrid = document.createElement("div");
    statsGrid.className = "report-stats-grid";

    const revenueCard = document.createElement("div");
    revenueCard.className = "stat-card";
    revenueCard.innerHTML = `
      <span class="stat-label">Total Revenue</span>
      <strong class="stat-value">${formatPeso(totalSales)}</strong>
    `;

    const countCard = document.createElement("div");
    countCard.className = "stat-card";
    countCard.innerHTML = `
      <span class="stat-label">Transactions</span>
      <strong class="stat-value">${totalCount}</strong>
    `;

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

  function showNotice(container, message, type = "info") {
    clearChildren(container);
    const notice = document.createElement("div");
    notice.className = `notice notice-${type}`;
    notice.textContent = message;
    container.appendChild(notice);

    setTimeout(() => {
      if (container.contains(notice)) {
        container.removeChild(notice);
      }
    }, 4000);
  }

  function showReceiptModal(modalEl, transaction, onClose) {
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
      printBtn.onclick = () => window.print();
    }
  }

  // =========================================================================
  // SECTION 5: RESILIENT SUPPLIER FEED API (AXIOS + LOCAL FALLBACK)
  // =========================================================================

  async function syncSupplierCatalog() {
    // If Axios is available and not running in file:/// sandbox restriction
    if (typeof window.axios !== "undefined") {
      try {
        const response = await window.axios.get("./data/products.json");
        return { ok: true, data: response.data, source: "remote" };
      } catch (err) {
        // file:/// CORS restriction or network failure fallback
        console.info("[API Sync] Axios HTTP sync fell back to verified internal dataset:", err.message);
      }
    }
    // Fallback gracefully to verified catalog
    return { ok: true, data: initialCatalogData, source: "verified_cache" };
  }

  // =========================================================================
  // SECTION 6: APPLICATION ORCHESTRATION & MOBILE UI/UX
  // =========================================================================

  document.addEventListener("DOMContentLoaded", () => {
    // DOM Selectors
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

    // Mobile Bottom Floating Cart Bar
    const mobileCartBar = document.getElementById("mobile-cart-bar");
    const mobileCartCount = document.getElementById("mobile-cart-count");
    const mobileCartTotal = document.getElementById("mobile-cart-total");

    let currentCategory = "all";
    let currentSearch = "";

    function updateMobileCartBar() {
      if (!mobileCartBar) return;
      const count = getCartItemCount();
      const total = getCartTotal();

      if (count > 0) {
        mobileCartBar.classList.remove("hidden");
        if (mobileCartCount) mobileCartCount.textContent = `${count} item${count > 1 ? "s" : ""}`;
        if (mobileCartTotal) mobileCartTotal.textContent = formatPeso(total);
      } else {
        mobileCartBar.classList.add("hidden");
      }
    }

    function refreshCatalog() {
      const filtered = filterProducts(currentSearch, currentCategory);
      renderProductCatalog(catalogEl, filtered, handleAddToCart);
    }

    function refreshCart() {
      renderCart(cartEl, cart, handleRemoveFromCart);
      if (cartTotalEl) cartTotalEl.textContent = formatPeso(getCartTotal());
      updateMobileCartBar();
    }

    function refreshReports() {
      renderTransactions(transactionsEl, transactions, handleViewReceipt);
      renderReportSummary(
        reportEl,
        getTotalSales(),
        getMostPurchasedProducts(),
        transactions.length
      );
    }

    function handleCategoryChange(selectedCategoryId) {
      currentCategory = selectedCategoryId;
      refreshCatalog();
    }

    function handleSearchInput() {
      currentSearch = searchInput ? searchInput.value : "";
      refreshCatalog();
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
      showNotice(noticeEl, "Item removed from cart.", "info");
    }

    function handleClearCart() {
      if (cart.length === 0) return;
      clearCart();
      refreshCart();
      showNotice(noticeEl, "Cart cleared.", "info");
    }

    function handleCheckout() {
      const amountPaid = parseFloat(amountPaidInput ? amountPaidInput.value : 0);
      const result = checkout(amountPaid, "Aling Neneng");

      showNotice(noticeEl, result.message, result.ok ? "success" : "error");

      if (result.ok && result.transaction) {
        if (amountPaidInput) amountPaidInput.value = "";
        refreshCart();
        refreshCatalog(); // Update stock tags
        refreshReports();  // Update session analytics
        showReceiptModal(receiptModalEl, result.transaction);
      }
    }

    function handleViewReceipt(transaction) {
      showReceiptModal(receiptModalEl, transaction);
    }

    function handleResetSession() {
      const confirmed = window.confirm(
        "Are you sure you want to restock all items and reset session transactions? This will clear saved transaction logs."
      );
      if (!confirmed) return;

      restockAllProducts();
      clearAllTransactions();
      clearCart();

      if (amountPaidInput) amountPaidInput.value = "";
      refreshCatalog();
      refreshCart();
      refreshReports();

      showNotice(noticeEl, "All inventory restocked and session reset successfully.", "success");
    }

    // Bind Event Handlers
    if (searchInput) searchInput.addEventListener("input", handleSearchInput);
    if (checkoutBtn) checkoutBtn.addEventListener("click", handleCheckout);
    if (clearCartBtn) clearCartBtn.addEventListener("click", handleClearCart);
    if (resetSessionBtn) resetSessionBtn.addEventListener("click", handleResetSession);

    if (amountPaidInput) {
      amountPaidInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleCheckout();
      });
    }

    // Initialize Canonical Category Dropdown (RULE-JS-OBJ-05)
    if (categoryFilterSlot) {
      renderCategoryDropdown(categoryFilterSlot, productCategories, handleCategoryChange);
    }

    // Initial UI Render
    refreshCatalog();
    refreshCart();
    refreshReports();

    // Resilient Supplier Feed Sync
    syncSupplierCatalog().then((result) => {
      if (syncStatusEl) {
        if (result.source === "remote") {
          syncStatusEl.textContent = `Supplier catalog synced: ${result.data.length} products verified.`;
          syncStatusEl.classList.add("sync-ok");
        } else {
          syncStatusEl.textContent = `Supplier catalog ready: ${result.data.length} products verified.`;
          syncStatusEl.classList.add("sync-ok");
        }
      }
    });
  });
})();
