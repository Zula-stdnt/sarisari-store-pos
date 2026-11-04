// utils.js
// General helper utilities: currency formatting, date/time formatting, and Web Storage handling.

/**
 * Format numerical amount to Philippine Peso currency string.
 * @param {number} amount
 * @returns {string} Formatted currency e.g. "₱180.00"
 */
export function formatPeso(amount) {
  const numeric = Number(amount) || 0;
  return "₱" + numeric.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Format ISO date string to localized readable date & time.
 * @param {string} isoString
 * @returns {string} Formatted date e.g. "Nov 4, 2026, 10:30 PM"
 */
export function formatDate(isoString) {
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

/**
 * Retrieve parsed JSON value from localStorage with fallback.
 * @param {string} key
 * @param {*} fallback
 * @returns {*}
 */
export function getStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.warn(`[Storage] Failed to read "${key}" from localStorage:`, err);
    return fallback;
  }
}

/**
 * Save serializable value to localStorage.
 * @param {string} key
 * @param {*} value
 */
export function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[Storage] Failed to write "${key}" to localStorage:`, err);
  }
}

/**
 * Remove an item from localStorage.
 * @param {string} key
 */
export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`[Storage] Failed to remove "${key}" from localStorage:`, err);
  }
}
