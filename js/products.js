// products.js
// Source of truth for the store catalog. The exact dataset from the spec is
// preserved field-for-field; `product_stock` is an added field (not a change
// to existing fields) so the POS can actually run out of things to sell —
// the original spec had no inventory concept at all.

export const groceryItems = [
  { product_id: 1, product_name: "Dried Mangoes (200g)", product_price: 180, product_stock: 24 },
  { product_id: 2, product_name: "Banana Chips (200g)", product_price: 120, product_stock: 30 },
  { product_id: 3, product_name: "Tablea Chocolate (250g)", product_price: 200, product_stock: 15 },
  { product_id: 4, product_name: "Coconut Oil (500ml)", product_price: 180, product_stock: 18 },
  { product_id: 5, product_name: "Mango Jam (250g)", product_price: 160, product_stock: 20 },
  { product_id: 6, product_name: "Peanut Brittle (200g)", product_price: 150, product_stock: 22 },
  { product_id: 7, product_name: "Cashew Nuts (250g)", product_price: 280, product_stock: 12 },
  { product_id: 8, product_name: "Philippine Coffee Beans (250g)", product_price: 320, product_stock: 10 },
  { product_id: 9, product_name: "Native Vinegar (500ml)", product_price: 120, product_stock: 25 },
  { product_id: 10, product_name: "Philippine Honey (250ml)", product_price: 250, product_stock: 14 },
  { product_id: 11, product_name: "Coconut Sugar (500g)", product_price: 180, product_stock: 20 },
  { product_id: 12, product_name: "Rice Crackers (200g)", product_price: 100, product_stock: 35 },
  { product_id: 13, product_name: "Salted Fish (Danggit, 250g)", product_price: 220, product_stock: 16 },
  { product_id: 14, product_name: "Longganisa (Frozen, 500g)", product_price: 280, product_stock: 12 },
  { product_id: 15, product_name: "Tocino (Frozen, 500g)", product_price: 300, product_stock: 10 },
  { product_id: 16, product_name: "Chicharon (100g)", product_price: 120, product_stock: 28 },
  { product_id: 17, product_name: "Pandesal Pack (12 pcs)", product_price: 80, product_stock: 40 },
  { product_id: 18, product_name: "Native Brown Rice (1kg)", product_price: 90, product_stock: 30 },
  { product_id: 19, product_name: "White Rice (1kg)", product_price: 70, product_stock: 50 },
  { product_id: 20, product_name: "Corn Coffee (250g)", product_price: 150, product_stock: 18 },
  { product_id: 21, product_name: "Coconut Water (1L)", product_price: 100, product_stock: 24 },
  { product_id: 22, product_name: "Calamansi Juice (1L)", product_price: 120, product_stock: 22 },
  { product_id: 23, product_name: "Guava Jelly (250g)", product_price: 160, product_stock: 15 },
  { product_id: 24, product_name: "Bagoong (250g)", product_price: 90, product_stock: 20 },
  { product_id: 25, product_name: "Fish Sauce (Patis, 500ml)", product_price: 110, product_stock: 26 },
  { product_id: 26, product_name: "Soy Sauce (500ml)", product_price: 95, product_stock: 26 },
  { product_id: 27, product_name: "Native Salt (250g)", product_price: 50, product_stock: 40 },
  { product_id: 28, product_name: "Coconut Milk Powder (200g)", product_price: 140, product_stock: 20 },
  { product_id: 29, product_name: "Instant Noodles (Pack of 6)", product_price: 75, product_stock: 45 },
  { product_id: 30, product_name: "Native Cheese (Kesong Puti, 250g)", product_price: 180, product_stock: 12 },
  { product_id: 31, product_name: "Eggs (Dozen)", product_price: 90, product_stock: 35 },
  { product_id: 32, product_name: "Fresh Tilapia (1kg)", product_price: 160, product_stock: 14 },
  { product_id: 33, product_name: "Fresh Bangus (Milkfish, 1kg)", product_price: 180, product_stock: 14 },
  { product_id: 34, product_name: "Fresh Chicken (1kg)", product_price: 200, product_stock: 16 },
  { product_id: 35, product_name: "Fresh Pork (1kg)", product_price: 280, product_stock: 12 },
  { product_id: 36, product_name: "Fresh Beef (1kg)", product_price: 350, product_stock: 8 },
  { product_id: 37, product_name: "Native Vegetables Basket", product_price: 250, product_stock: 10 },
  { product_id: 38, product_name: "Bananas (1kg)", product_price: 60, product_stock: 30 },
  { product_id: 39, product_name: "Mangoes (1kg)", product_price: 120, product_stock: 25 },
  { product_id: 40, product_name: "Papaya (1kg)", product_price: 70, product_stock: 20 },
  { product_id: 41, product_name: "Pineapple (Whole)", product_price: 90, product_stock: 18 },
  { product_id: 42, product_name: "Coconut (Whole)", product_price: 50, product_stock: 30 },
  { product_id: 43, product_name: "Native Peanuts (250g)", product_price: 100, product_stock: 25 },
  { product_id: 44, product_name: "Camote (Sweet Potato, 1kg)", product_price: 80, product_stock: 22 },
  { product_id: 45, product_name: "Ube Halaya (250g)", product_price: 180, product_stock: 15 },
  { product_id: 46, product_name: "Leche Flan (Whole)", product_price: 250, product_stock: 10 },
  { product_id: 47, product_name: "Bibingka (Whole)", product_price: 200, product_stock: 12 },
  { product_id: 48, product_name: "Puto (Dozen)", product_price: 120, product_stock: 20 },
  { product_id: 49, product_name: "Kakanin Sampler Pack", product_price: 300, product_stock: 8 },
  { product_id: 50, product_name: "Native Chocolate Drink (Sikwate, 250ml)", product_price: 90, product_stock: 20 }
];

/** Find a product by id. Returns undefined if not found. */
export function getProductById(productId) {
  return groceryItems.find((p) => p.product_id === productId);
}

/** Simple case-insensitive name filter, plus optional min/max price bounds. */
export function filterProducts(query = "", minPrice = null, maxPrice = null) {
  const q = query.trim().toLowerCase();
  return groceryItems.filter((p) => {
    const matchesName = q === "" || p.product_name.toLowerCase().includes(q);
    const matchesMin = minPrice === null || p.product_price >= minPrice;
    const matchesMax = maxPrice === null || p.product_price <= maxPrice;
    return matchesName && matchesMin && matchesMax;
  });
}

/** Decrease stock for a product after a successful checkout. Never goes negative. */
export function decrementStock(productId, quantity) {
  const product = getProductById(productId);
  if (!product) return false;
  if (product.product_stock < quantity) return false;
  product.product_stock -= quantity;
  return true;
}
