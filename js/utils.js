// utils.js
// Fix over the original spec: no currency formatting was specified anywhere,
// despite the strong Filipino sari-sari store theming. Centralizing it here
// so every peso amount in the UI is formatted the same way.

export function formatPeso(amount) {
  return "₱" + Number(amount).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
