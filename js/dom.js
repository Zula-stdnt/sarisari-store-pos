// dom.js - Dynamic DOM rendering utilities
// Demonstrates: createElement, appendChild, removeChild, element.style, classList

/**
 * Format currency (Philippine Peso)
 */
function formatCurrency(amount) {
  return `₱${amount.toFixed(2)}`;
}

/**
 * Format date/time for display
 */
function formatDateTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Render product catalog to DOM
 * Demonstrates: createElement, appendChild, dynamic styling
 */
export function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);
  
  // Clear existing content using removeChild
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  if (products.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No products found';
    emptyMessage.style.textAlign = 'center';
    emptyMessage.style.padding = '2rem';
    emptyMessage.style.color = '#8D6E63';
    container.appendChild(emptyMessage);
    return;
  }
  
  // Use for...of loop to iterate through products
  for (const product of products) {
    const card = createProductCard(product);
    container.appendChild(card);
  }
}

/**
 * Create a product card element with stock indicator
 * Demonstrates: createElement, classList, element.style, dot/bracket notation
 */
function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product-card');
  card.setAttribute('data-product-id', product['product_id']);
  
  // Determine stock status
  const stock = product.stock || 0;
  const stockStatus = getStockStatusClass(stock);
  
  // Apply visual styling based on stock
  if (stock === 0) {
    card.style.opacity = '0.6';
    card.style.pointerEvents = 'none';
  }
  
  // Product info section
  const infoDiv = document.createElement('div');
  infoDiv.classList.add('product-info');
  
  const nameP = document.createElement('p');
  nameP.classList.add('product-name');
  nameP.textContent = product.product_name;
  
  const priceP = document.createElement('p');
  priceP.classList.add('product-price');
  priceP.textContent = formatCurrency(product.product_price);
  
  // Stock badge
  const stockBadge = document.createElement('span');
  stockBadge.classList.add('stock-badge', stockStatus);
  stockBadge.textContent = getStockLabel(stock);
  
  // Dynamic styling for stock badge
  if (stockStatus === 'stock-out') {
    stockBadge.style.backgroundColor = '#9E9E9E';
    stockBadge.style.color = 'white';
  } else if (stockStatus === 'stock-critical') {
    stockBadge.style.backgroundColor = '#C62828';
    stockBadge.style.color = 'white';
  } else if (stockStatus === 'stock-low') {
    stockBadge.style.backgroundColor = '#FFC107';
    stockBadge.style.color = '#4E342E';
  } else {
    stockBadge.style.backgroundColor = '#2E7D32';
    stockBadge.style.color = 'white';
  }
  stockBadge.style.fontSize = '0.75rem';
  stockBadge.style.padding = '0.25rem 0.5rem';
  stockBadge.style.borderRadius = '4px';
  stockBadge.style.fontWeight = 'bold';
  stockBadge.style.marginTop = '0.5rem';
  stockBadge.style.display = 'inline-block';
  
  infoDiv.appendChild(nameP);
  infoDiv.appendChild(priceP);
  infoDiv.appendChild(stockBadge);
  
  // Product actions section
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('product-actions');
  
  const quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.min = '1';
  quantityInput.max = stock.toString();
  quantityInput.value = '1';
  quantityInput.setAttribute('data-product-id', product.product_id);
  quantityInput.disabled = stock === 0;
  
  const addButton = document.createElement('button');
  addButton.classList.add('add-to-cart-btn');
  addButton.textContent = stock === 0 ? 'Out of Stock' : 'Add';
  addButton.setAttribute('data-product-id', product.product_id);
  addButton.disabled = stock === 0;
  
  // Dynamic button styling
  if (stock === 0) {
    addButton.style.backgroundColor = '#9E9E9E';
    addButton.style.cursor = 'not-allowed';
  }
  
  actionsDiv.appendChild(quantityInput);
  actionsDiv.appendChild(addButton);
  
  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);
  
  return card;
}

/**
 * Get stock status CSS class
 * Demonstrates: conditional logic
 */
function getStockStatusClass(stock) {
  if (stock === 0) return 'stock-out';
  if (stock <= 4) return 'stock-critical';
  if (stock <= 10) return 'stock-low';
  return 'stock-normal';
}

/**
 * Get stock label text
 * Demonstrates: conditional logic, string templates
 */
function getStockLabel(stock) {
  if (stock === 0) return 'OUT OF STOCK';
  if (stock <= 4) return `ONLY ${stock} LEFT!`;
  if (stock <= 10) return `Low Stock (${stock})`;
  return `In Stock (${stock})`;
}

/**
 * Render cart items
 * Demonstrates: dynamic DOM creation, remove()
 */
export function renderCart(cartItems, containerId) {
  const container = document.getElementById(containerId);
  
  // Clear cart display
  while (container.firstChild) {
    container.firstChild.remove();
  }
  
  if (cartItems.length === 0) {
    const emptyDiv = document.createElement('div');
    emptyDiv.classList.add('empty-cart');
    
    // Create SVG cart icon
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('empty-cart-icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '9');
    circle.setAttribute('cy', '21');
    circle.setAttribute('r', '1');
    
    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '20');
    circle2.setAttribute('cy', '21');
    circle2.setAttribute('r', '1');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6');
    
    svg.appendChild(circle);
    svg.appendChild(circle2);
    svg.appendChild(path);
    
    const text = document.createElement('p');
    text.textContent = 'Your cart is empty';
    
    emptyDiv.appendChild(svg);
    emptyDiv.appendChild(text);
    container.appendChild(emptyDiv);
    return;
  }
  
  // Use forEach to iterate and create cart items
  cartItems.forEach(item => {
    const cartItem = createCartItem(item);
    container.appendChild(cartItem);
  });
}

/**
 * Create cart item element
 * Demonstrates: createElement, dynamic styling via element.style
 */
function createCartItem(item) {
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('cart-item');
  itemDiv.setAttribute('data-product-id', item.product_id);
  
  const infoDiv = document.createElement('div');
  infoDiv.classList.add('cart-item-info');
  
  const nameDiv = document.createElement('div');
  nameDiv.classList.add('cart-item-name');
  nameDiv.textContent = item.product_name;
  
  const detailsDiv = document.createElement('div');
  detailsDiv.classList.add('cart-item-details');
  detailsDiv.textContent = `${formatCurrency(item.product_price)} × ${item.quantity}`;
  
  infoDiv.appendChild(nameDiv);
  infoDiv.appendChild(detailsDiv);
  
  const subtotalSpan = document.createElement('span');
  subtotalSpan.classList.add('cart-item-subtotal');
  subtotalSpan.textContent = formatCurrency(item.subtotal);
  
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove-item-btn');
  removeBtn.textContent = '✕';
  removeBtn.setAttribute('data-product-id', item.product_id);
  
  itemDiv.appendChild(infoDiv);
  itemDiv.appendChild(subtotalSpan);
  itemDiv.appendChild(removeBtn);
  
  return itemDiv;
}

/**
 * Update cart total display
 * Demonstrates: element selection and text update
 */
export function updateCartTotal(total) {
  const totalElement = document.getElementById('totalAmount');
  totalElement.textContent = formatCurrency(total);
  
  // Apply dynamic styling based on total
  if (total > 0) {
    totalElement.style.fontSize = '1.5rem';
    totalElement.style.fontWeight = 'bold';
  } else {
    totalElement.style.fontSize = '1.3rem';
    totalElement.style.fontWeight = 'normal';
  }
}

/**
 * Update change display
 * Demonstrates: dynamic text and style updates
 */
export function updateChangeDisplay(change) {
  const changeElement = document.getElementById('changeAmount');
  changeElement.textContent = formatCurrency(change);
  
  // Dynamic styling based on value
  if (change < 0) {
    changeElement.style.color = '#C62828';
  } else {
    changeElement.style.color = '#FFC107';
  }
}

/**
 * Render transactions list
 * Demonstrates: complex DOM structure creation
 */
export function renderTransactions(transactions, containerId) {
  const container = document.getElementById(containerId);
  
  // Clear using while loop and removeChild
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  if (transactions.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'No transactions yet';
    emptyMsg.style.textAlign = 'center';
    emptyMsg.style.padding = '2rem';
    emptyMsg.style.fontStyle = 'italic';
    container.appendChild(emptyMsg);
    return;
  }
  
  // Iterate with for loop
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const card = createTransactionCard(transaction);
    container.appendChild(card);
  }
}

/**
 * Create transaction card element
 * Demonstrates: nested element creation, classList.add()
 */
function createTransactionCard(transaction) {
  const card = document.createElement('div');
  card.classList.add('transaction-card');
  
  // Header
  const header = document.createElement('div');
  header.classList.add('transaction-header');
  
  const idSpan = document.createElement('span');
  idSpan.classList.add('transaction-id');
  idSpan.textContent = `Transaction #${transaction.transactionId}`;
  
  const dateSpan = document.createElement('span');
  dateSpan.classList.add('transaction-date');
  dateSpan.textContent = formatDateTime(transaction.date);
  
  header.appendChild(idSpan);
  header.appendChild(dateSpan);
  
  // Items list
  const itemsDiv = document.createElement('div');
  itemsDiv.classList.add('transaction-items');
  
  transaction.items.forEach(item => {
    const itemP = document.createElement('p');
    itemP.classList.add('transaction-item');
    itemP.textContent = `${item.product_name} (${item.quantity}x) - ${formatCurrency(item.subtotal)}`;
    itemsDiv.appendChild(itemP);
  });
  
  // Total
  const totalDiv = document.createElement('div');
  totalDiv.classList.add('transaction-total');
  
  const totalLabel = document.createElement('span');
  totalLabel.textContent = 'Total:';
  const totalValue = document.createElement('span');
  totalValue.textContent = formatCurrency(transaction.totalAmount);
  
  totalDiv.appendChild(totalLabel);
  totalDiv.appendChild(totalValue);
  
  // View receipt button
  const viewBtn = document.createElement('button');
  viewBtn.classList.add('view-receipt-btn');
  viewBtn.textContent = 'View Receipt';
  viewBtn.setAttribute('data-transaction-id', transaction.transactionId);
  
  card.appendChild(header);
  card.appendChild(itemsDiv);
  card.appendChild(totalDiv);
  card.appendChild(viewBtn);
  
  return card;
}

/**
 * Show notification toast
 * Demonstrates: classList.add/remove, setTimeout, dynamic styling
 */
export function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  
  // Remove existing type classes
  notification.classList.remove('success', 'error', 'info');
  
  // Add new type class
  notification.classList.add(type);
  
  // Show notification
  notification.classList.add('show');
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

/**
 * Generate and display receipt in modal
 * Demonstrates: complex DOM creation, modal display
 */
export function showReceipt(transaction) {
  const modal = document.getElementById('receiptModal');
  const content = document.getElementById('receiptContent');
  
  // Clear previous content
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  
  // Create receipt structure
  const receiptDiv = document.createElement('div');
  
  // Header
  const headerDiv = document.createElement('div');
  headerDiv.classList.add('receipt-header');
  
  const title = document.createElement('h2');
  title.classList.add('receipt-title');
  title.textContent = 'SARI-SARI STORE';
  
  const subtitle = document.createElement('p');
  subtitle.textContent = 'Official Receipt';
  subtitle.style.fontWeight = 'bold';
  
  headerDiv.appendChild(title);
  headerDiv.appendChild(subtitle);
  
  // Transaction info
  const infoDiv = document.createElement('div');
  infoDiv.classList.add('receipt-info');
  
  const transIdP = document.createElement('p');
  transIdP.textContent = `Transaction #: ${transaction.transactionId}`;
  
  const dateP = document.createElement('p');
  dateP.textContent = `Date: ${formatDateTime(transaction.date)}`;
  
  infoDiv.appendChild(transIdP);
  infoDiv.appendChild(dateP);
  
  // Items
  const itemsDiv = document.createElement('div');
  itemsDiv.classList.add('receipt-items');
  
  transaction.items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('receipt-item');
    
    const itemName = document.createElement('span');
    itemName.textContent = `${item.product_name} (${item.quantity}x)`;
    
    const itemPrice = document.createElement('span');
    itemPrice.textContent = formatCurrency(item.subtotal);
    
    itemDiv.appendChild(itemName);
    itemDiv.appendChild(itemPrice);
    itemsDiv.appendChild(itemDiv);
  });
  
  // Summary
  const summaryDiv = document.createElement('div');
  summaryDiv.classList.add('receipt-summary');
  
  const totalRow = createReceiptRow('Total:', formatCurrency(transaction.totalAmount));
  const paidRow = createReceiptRow('Paid:', formatCurrency(transaction.amountPaid));
  const changeRow = createReceiptRow('Change:', formatCurrency(transaction.change));
  
  summaryDiv.appendChild(totalRow);
  summaryDiv.appendChild(paidRow);
  summaryDiv.appendChild(changeRow);
  
  // Footer
  const footer = document.createElement('div');
  footer.classList.add('receipt-footer');
  footer.textContent = 'Thank you for your purchase!';
  
  receiptDiv.appendChild(headerDiv);
  receiptDiv.appendChild(infoDiv);
  receiptDiv.appendChild(itemsDiv);
  receiptDiv.appendChild(summaryDiv);
  receiptDiv.appendChild(footer);
  
  content.appendChild(receiptDiv);
  
  // Show modal
  modal.classList.add('show');
}

/**
 * Helper to create receipt row
 */
function createReceiptRow(label, value) {
  const row = document.createElement('div');
  row.classList.add('receipt-row');
  
  const labelSpan = document.createElement('span');
  labelSpan.textContent = label;
  
  const valueSpan = document.createElement('span');
  valueSpan.textContent = value;
  
  row.appendChild(labelSpan);
  row.appendChild(valueSpan);
  
  return row;
}

/**
 * Hide receipt modal
 */
export function hideReceipt() {
  const modal = document.getElementById('receiptModal');
  modal.classList.remove('show');
}

/**
 * Update report statistics
 * Demonstrates: element selection and dynamic content update
 */
export function updateReportStats(totalSales, transactionCount, bestSeller) {
  document.getElementById('totalSales').textContent = formatCurrency(totalSales);
  document.getElementById('transactionCount').textContent = transactionCount;
  
  const bestSellerElement = document.getElementById('bestSeller');
  if (bestSeller) {
    bestSellerElement.textContent = `${bestSeller.product_name} (${bestSeller.total_quantity} sold)`;
    // Dynamic styling
    bestSellerElement.style.fontSize = '1.2rem';
  } else {
    bestSellerElement.textContent = '—';
    bestSellerElement.style.fontSize = '1.5rem';
  }
}
