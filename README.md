# Tindahan ni Aling Neneng — Sari-Sari Store POS 🏪

A web-based Point of Sale (POS) and inventory management system designed for neighborhood sari-sari stores, built for **ITE 387 Advance Programming** (3rd Year, 1st Semester).

---

## 📚 Academic Foundations & Coding Principles (ITE 387)

This project is architected around academic programming standards, design patterns, and coding rules codified in the course's Obsidian Second Brain:

| Rule / Principle | Source Lesson | Implementation in this Project |
| :--- | :--- | :--- |
| **`RULE-JS-OBJ-01` (Factory Functions)** | `javascript_objects_and_arrays.md` | Replaces raw object literals with explicit factory functions (`createProduct`, `createCartItem`, `createTransactionHeader`, `createTransactionDetail`) for structural consistency. |
| **`RULE-JS-OBJ-02` (Property Access Grammar)** | `javascript_objects_and_arrays.md` | Uses strict Dot Notation (`obj.prop`) for static compile-time fields; Bracket Notation (`obj[key]`) is reserved exclusively for dynamic dictionary lookups. |
| **`RULE-JS-OBJ-03` (Declarative Query Primacy)** | `javascript_objects_and_arrays.md` | Imperative `for` loops are strictly eliminated for querying/aggregations. Uses declarative `.filter()` for search/category queries, `.reduce()` for revenue and best-seller calculations, and `.find()` for lookups. |
| **`RULE-JS-OBJ-04` (Side-Effect Boundary)** | `javascript_objects_and_arrays.md` | Restricts `.forEach()` strictly to DOM rendering side-effects, preserving pure functional data transformations. |
| **`RULE-JS-OBJ-05` (Display vs. Reference Decoupling)** | `javascript_objects_and_arrays.md` | The Category Filter dropdown binds human-readable text to `.innerText` while assigning unique system keys to `.value`. |
| **`Master-Detail Pattern` (Header-Detail)** | `header_detail_forms.md` | Sales transactions follow a relational Master-Detail model: a **Transaction Header** (`transaction_id`, timestamp, cashier, total, paid, change) paired with an array of **Transaction Details** (line number, product ID, name, unit price, quantity, line total). |
| **`Client-side Persistence`** | `javascript_fundamentals.md` | Uses `localStorage` to persist inventory stock adjustments and completed transaction logs across browser reloads, coupled with a reset session utility. |
| **`Dynamic Styling`** | `dom_apply_styles.md` | Applies presentation logic through dynamic `classList` states (`stock-ok`, `stock-low`, `stock-out`, `sync-ok`, `sync-fail`). |
| **`Asynchronous API Handling`** | `javascript_working_with_apis.md` | Demonstrates Axios HTTP GET communication against a supplier catalog feed (`data/products.json`) with promise resolution and status indicators. |

---

## 🌟 Key Application Features

1. **Store Signboard & Aesthetic UI:**
   - Classic chalkboard store signboard styled with Google Fonts (*Fraunces*, *Nunito Sans*, and *IBM Plex Mono*).
   - Real-time supplier synchronization status indicator in the header.
2. **Product Catalog & Dynamic Filtering:**
   - 50 local grocery products spanning Snacks, Beverages, Pantry, Grains, Produce, and Native Delicacies.
   - Dual-mode filtering: instant text search combined with the canonical Category dropdown.
   - Live inventory tracking displaying stock counts, low-stock warnings, and disabled state for out-of-stock items.
3. **Current Sale (Shopping Cart):**
   - Line-item consolidation when adding identical products.
   - Real-time subtotal and total calculation.
   - Cash tender validation and instant change calculation.
4. **Printable Thermal Receipt Modal:**
   - Thermal paper styling (monospaced dashed dividers, itemized columns, cashier metadata, and thank-you footer).
   - Dedicated print stylesheet (`@media print`) enabling clean paper/PDF receipts without UI clutter.
   - Historical receipts can be reopened anytime from the transaction log.
5. **Session Analytics & Master-Detail Log:**
   - Total sales revenue and transaction counters.
   - Best-seller computation handling ties gracefully.
   - Master-Detail transaction cards showing both header totals and itemized purchase lines.
6. **State Persistence & Restock Utility:**
   - Automatically saves transactions and inventory state to `localStorage`.
   - "Restock & Reset Session" button allows easy resets during code defenses and testing.

---

## 📂 Project Directory Structure

```text
7-27 sarisari store website/
├── index.html          # Semantic HTML5 layout, panels, and modal templates
├── style.css           # Custom CSS3 styling, typography, print styles
├── data/
│   └── products.json   # External supplier catalog JSON dataset
├── js/
│   ├── api.js          # Axios API communication (supplier catalog sync)
│   ├── dom.js          # Dynamic DOM rendering (catalog cards, cart, receipts)
│   ├── main.js         # Application orchestrator, event handlers, and state
│   ├── products.js     # Factory functions, catalog data, and stock helpers
│   ├── transactions.js # Master-Detail model, checkout flow, analytics
│   └── utils.js        # Formatting helpers (formatPeso, formatDate) & storage
├── .gitignore          # Git exclusion rules (.vscode, .kilocode, logs)
└── README.md           # Documentation & academic reference
```

---

## 🚀 Getting Started

Because this application uses native **ES6 JavaScript Modules** (`import`/`export`), it must be served via a web server (HTTP/HTTPS) rather than opened directly as a file (`file:///`).

### Method 1: Using XAMPP
1. Ensure this folder resides in your XAMPP root:
   ```text
   C:\xampp\htdocs\
   ```
2. Open the **XAMPP Control Panel** and start **Apache**.
3. In your web browser, navigate to:
   ```text
   http://localhost/3rd%20Year/1ST%20SEMESTER/ITE%20387%20Advance%20Programming/7-27%20sarisari%20store%20website/
   ```

### Method 2: Using VS Code Live Server
1. Open this folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and select **"Open with Live Server"**.

---

## 👤 Author

**Zuriel Anthony Villaluna**  
*BS Information Technology*  
*ITE 387 Advance Programming*
