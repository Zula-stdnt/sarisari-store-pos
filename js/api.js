// api.js
// Satisfies AGENTS.md Section 6 item 2 (APIs & Data Exchange): a real Axios
// GET request against a local JSON endpoint, parsed into objects.
//
// Honest note: since this app has no backend, "the API" is /data/products.json
// served by whatever static server you're running (python -m http.server, etc).
// Framed as a supplier catalog feed — a real store's price/name list might come
// from a supplier system, separate from the shop's own local stock counts
// (which live in products.js). This call is a demo of the *technique*, not
// something the app's own logic depends on to function.

export async function fetchSupplierCatalog() {
  try {
    const response = await axios.get("./data/products.json");
    // response.data is already parsed JSON -> array of {product_id, product_name, product_price}
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}
