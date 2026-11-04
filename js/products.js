// products.js - Product catalog dataset and product-related helpers
// Demonstrates: JS Objects, Arrays, Named Exports

export const groceryItems = [
  { product_id: 1, product_name: "Dried Mangoes (200g)", product_price: 180, stock: 22, initial_stock: 22 },
  { product_id: 2, product_name: "Banana Chips (200g)", product_price: 120, stock: 25, initial_stock: 25 },
  { product_id: 3, product_name: "Tablea Chocolate (250g)", product_price: 200, stock: 15, initial_stock: 15 },
  { product_id: 4, product_name: "Coconut Oil (500ml)", product_price: 180, stock: 12, initial_stock: 12 },
  { product_id: 5, product_name: "Mango Jam (250g)", product_price: 160, stock: 18, initial_stock: 18 },
  { product_id: 6, product_name: "Peanut Brittle (200g)", product_price: 150, stock: 20, initial_stock: 20 },
  { product_id: 7, product_name: "Cashew Nuts (250g)", product_price: 280, stock: 12, initial_stock: 12 },
  { product_id: 8, product_name: "Philippine Coffee Beans (250g)", product_price: 320, stock: 10, initial_stock: 10 },
  { product_id: 9, product_name: "Native Vinegar (500ml)", product_price: 120, stock: 15, initial_stock: 15 },
  { product_id: 10, product_name: "Philippine Honey (250ml)", product_price: 250, stock: 14, initial_stock: 14 },
  { product_id: 11, product_name: "Coconut Sugar (500g)", product_price: 180, stock: 16, initial_stock: 16 },
  { product_id: 12, product_name: "Rice Crackers (200g)", product_price: 100, stock: 30, initial_stock: 30 },
  { product_id: 13, product_name: "Salted Fish (Danggit, 250g)", product_price: 220, stock: 8, initial_stock: 8 },
  { product_id: 14, product_name: "Longganisa (Frozen, 500g)", product_price: 280, stock: 10, initial_stock: 10 },
  { product_id: 15, product_name: "Tocino (Frozen, 500g)", product_price: 300, stock: 10, initial_stock: 10 },
  { product_id: 16, product_name: "Chicharon (100g)", product_price: 120, stock: 35, initial_stock: 35 },
  { product_id: 17, product_name: "Pandesal Pack (12 pcs)", product_price: 80, stock: 40, initial_stock: 40 },
  { product_id: 18, product_name: "Native Brown Rice (1kg)", product_price: 90, stock: 5, initial_stock: 5 },
  { product_id: 19, product_name: "White Rice (1kg)", product_price: 70, stock: 8, initial_stock: 8 },
  { product_id: 20, product_name: "Corn Coffee (250g)", product_price: 150, stock: 18, initial_stock: 18 },
  { product_id: 21, product_name: "Coconut Water (1L)", product_price: 100, stock: 12, initial_stock: 12 },
  { product_id: 22, product_name: "Calamansi Juice (1L)", product_price: 120, stock: 12, initial_stock: 12 },
  { product_id: 23, product_name: "Guava Jelly (250g)", product_price: 160, stock: 16, initial_stock: 16 },
  { product_id: 24, product_name: "Bagoong (250g)", product_price: 90, stock: 20, initial_stock: 20 },
  { product_id: 25, product_name: "Fish Sauce (Patis, 500ml)", product_price: 110, stock: 18, initial_stock: 18 },
  { product_id: 26, product_name: "Soy Sauce (500ml)", product_price: 95, stock: 18, initial_stock: 18 },
  { product_id: 27, product_name: "Native Salt (250g)", product_price: 50, stock: 45, initial_stock: 45 },
  { product_id: 28, product_name: "Coconut Milk Powder (200g)", product_price: 140, stock: 22, initial_stock: 22 },
  { product_id: 29, product_name: "Instant Noodles (Pack of 6)", product_price: 75, stock: 50, initial_stock: 50 },
  { product_id: 30, product_name: "Native Cheese (Kesong Puti, 250g)", product_price: 180, stock: 6, initial_stock: 6 },
  { product_id: 31, product_name: "Eggs (Dozen)", product_price: 90, stock: 25, initial_stock: 25 },
  { product_id: 32, product_name: "Fresh Tilapia (1kg)", product_price: 160, stock: 5, initial_stock: 5 },
  { product_id: 33, product_name: "Fresh Bangus (Milkfish, 1kg)", product_price: 180, stock: 5, initial_stock: 5 },
  { product_id: 34, product_name: "Fresh Chicken (1kg)", product_price: 200, stock: 6, initial_stock: 6 },
  { product_id: 35, product_name: "Fresh Pork (1kg)", product_price: 280, stock: 4, initial_stock: 4 },
  { product_id: 36, product_name: "Fresh Beef (1kg)", product_price: 350, stock: 3, initial_stock: 3 },
  { product_id: 37, product_name: "Native Vegetables Basket", product_price: 250, stock: 7, initial_stock: 7 },
  { product_id: 38, product_name: "Bananas (1kg)", product_price: 60, stock: 8, initial_stock: 8 },
  { product_id: 39, product_name: "Mangoes (1kg)", product_price: 120, stock: 6, initial_stock: 6 },
  { product_id: 40, product_name: "Papaya (1kg)", product_price: 70, stock: 7, initial_stock: 7 },
  { product_id: 41, product_name: "Pineapple (Whole)", product_price: 90, stock: 8, initial_stock: 8 },
  { product_id: 42, product_name: "Coconut (Whole)", product_price: 50, stock: 10, initial_stock: 10 },
  { product_id: 43, product_name: "Native Peanuts (250g)", product_price: 100, stock: 20, initial_stock: 20 },
  { product_id: 44, product_name: "Camote (Sweet Potato, 1kg)", product_price: 80, stock: 8, initial_stock: 8 },
  { product_id: 45, product_name: "Ube Halaya (250g)", product_price: 180, stock: 10, initial_stock: 10 },
  { product_id: 46, product_name: "Leche Flan (Whole)", product_price: 250, stock: 5, initial_stock: 5 },
  { product_id: 47, product_name: "Bibingka (Whole)", product_price: 200, stock: 6, initial_stock: 6 },
  { product_id: 48, product_name: "Puto (Dozen)", product_price: 120, stock: 15, initial_stock: 15 },
  { product_id: 49, product_name: "Kakanin Sampler Pack", product_price: 300, stock: 4, initial_stock: 4 },
  { product_id: 50, product_name: "Native Chocolate Drink (Sikwate, 250ml)", product_price: 90, stock: 20, initial_stock: 20 }
];

/**
 * Find a product by its ID
 * Demonstrates: Array.find(), object access via bracket notation
 */
export function getProductById(productId) {
  return groceryItems.find(product => product['product_id'] === productId);
}

/**
 * Filter products by search term (name)
 * Demonstrates: Array.filter(), string methods, case-insensitive search
 */
export function searchProducts(searchTerm) {
  if (!searchTerm) return groceryItems;
  
  const lowerTerm = searchTerm.toLowerCase();
  return groceryItems.filter(product => 
    product.product_name.toLowerCase().includes(lowerTerm)
  );
}

/**
 * Filter products by price range
 * Demonstrates: Array.filter(), object dot notation
 */
export function filterByPriceRange(minPrice, maxPrice) {
  return groceryItems.filter(product => {
    const price = product.product_price;
    const meetsMin = minPrice ? price >= minPrice : true;
    const meetsMax = maxPrice ? price <= maxPrice : true;
    return meetsMin && meetsMax;
  });
}

/**
 * Get products sorted by price
 * Demonstrates: Array spread operator, Array.sort()
 */
export function sortProductsByPrice(ascending = true) {
  return [...groceryItems].sort((a, b) => 
    ascending ? a.product_price - b.product_price : b.product_price - a.product_price
  );
}

/**
 * Get current stock for a product
 * Demonstrates: Array.find(), object property access
 */
export function getProductStock(productId) {
  const product = groceryItems.find(p => p.product_id === productId);
  return product ? product.stock : 0;
}

/**
 * Check if product has sufficient stock
 * Demonstrates: validation logic, comparison operators
 */
export function checkStockAvailability(productId, quantity) {
  const product = groceryItems.find(p => p.product_id === productId);
  if (!product) return false;
  return product.stock >= quantity;
}

/**
 * Update product stock (decrease after purchase)
 * Demonstrates: Array.find(), object mutation, validation
 */
export function updateStock(productId, quantity) {
  const product = groceryItems.find(p => p.product_id === productId);
  if (!product) {
    throw new Error('Product not found');
  }
  
  if (product.stock < quantity) {
    throw new Error(`Insufficient stock. Only ${product.stock} available.`);
  }
  
  product.stock -= quantity;
  return product.stock;
}

/**
 * Restock a product to initial stock level
 * Demonstrates: object property assignment
 */
export function restockProduct(productId) {
  const product = groceryItems.find(p => p.product_id === productId);
  if (product) {
    product.stock = product.initial_stock;
    return true;
  }
  return false;
}

/**
 * Restock all products
 * Demonstrates: forEach iteration, object mutation
 */
export function restockAllProducts() {
  groceryItems.forEach(product => {
    product.stock = product.initial_stock;
  });
}

/**
 * Get stock status category
 * Demonstrates: conditional logic, string returns
 */
export function getStockStatus(stock) {
  if (stock === 0) return 'out';
  if (stock <= 4) return 'critical';
  if (stock <= 10) return 'low';
  return 'normal';
}
