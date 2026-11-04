// products.js
// Source of truth for product catalog and inventory state.
// Applies RULE-JS-OBJ-01 (Factory Functions) and RULE-JS-OBJ-03 (Declarative Array Processing).

import { getStorage, setStorage } from "./utils.js";

const STORAGE_STOCK_KEY = "sarisari_pos_stock_v1";

/**
 * Entity Factory Function for product records (RULE-JS-OBJ-01)
 * @param {number} product_id
 * @param {string} product_name
 * @param {number} product_price
 * @param {number} product_stock
 * @param {string} category
 * @param {number} initial_stock
 * @returns {object}
 */
export const createProduct = (
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

/**
 * Standard Product Categories for Display-Reference Decoupling (RULE-JS-OBJ-05)
 */
export const productCategories = [
  { id: "all", name: "All Categories" },
  { id: "snacks", name: "Snacks & Confectionery" },
  { id: "beverages", name: "Beverages & Coffee" },
  { id: "pantry", name: "Pantry & Condiments" },
  { id: "bakery-grains", name: "Grains & Bakery" },
  { id: "fresh-frozen", name: "Fresh & Frozen Produce/Meats" },
  { id: "native-delicacies", name: "Native Delicacies (Kakanin)" },
];

/**
 * Base Catalog Definitions
 */
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

/**
 * Load and synchronize stock counts from persistent storage
 */
function initializeCatalog() {
  const savedStockMap = getStorage(STORAGE_STOCK_KEY, null);
  if (!savedStockMap) {
    return initialCatalogData.map((item) => ({ ...item }));
  }

  return initialCatalogData.map((item) => ({
    ...item,
    product_stock:
      typeof savedStockMap[item.product_id] === "number"
        ? savedStockMap[item.product_id]
        : item.product_stock,
  }));
}

/** In-memory active catalog */
export const groceryItems = initializeCatalog();

/**
 * Save current inventory stock state to persistent storage
 */
export function saveStockState() {
  const stockMap = groceryItems.reduce((acc, item) => {
    acc[item.product_id] = item.product_stock;
    return acc;
  }, {});
  setStorage(STORAGE_STOCK_KEY, stockMap);
}

/**
 * Find product by primary key ID (RULE-JS-OBJ-03 declarative query)
 * @param {number} productId
 * @returns {object|undefined}
 */
export function getProductById(productId) {
  return groceryItems.find((p) => p.product_id === Number(productId));
}

/**
 * Declarative filtering by search keyword and category (RULE-JS-OBJ-03)
 * @param {string} query
 * @param {string} categoryId
 * @returns {Array<object>}
 */
export function filterProducts(query = "", categoryId = "all") {
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

/**
 * Decrement stock and synchronize with persistent storage
 * @param {number} productId
 * @param {number} quantity
 * @returns {boolean}
 */
export function decrementStock(productId, quantity) {
  const product = getProductById(productId);
  if (!product || product.product_stock < quantity) {
    return false;
  }
  product.product_stock -= quantity;
  saveStockState();
  return true;
}

/**
 * Reset all product inventory stock back to initial counts
 */
export function restockAllProducts() {
  initialCatalogData.forEach((initial) => {
    const product = getProductById(initial.product_id);
    if (product) {
      product.product_stock = initial.initial_stock;
    }
  });
  saveStockState();
}
