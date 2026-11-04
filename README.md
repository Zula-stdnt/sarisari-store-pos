# Tindahan ni Aling Neneng — Sari-Sari Store POS 🏪

A modern, responsive, web-based Point of Sale (POS) and inventory management system designed for neighborhood sari-sari stores. Built as an academic project for **ITE 387 Advance Programming** (3rd Year, 1st Semester).

---

## 🌟 Key Features

- **Store Signboard & Aesthetic Interface:**
  - Styled with classic sari-sari store aesthetic using Google Fonts (*Fraunces*, *Nunito Sans*, and *IBM Plex Mono*).
  - Status indicator displaying real-time supplier catalog synchronization.
- **Product Catalog & Stock Management:**
  - 50 local grocery goods with live stock tracking (`product_stock`).
  - Out-of-stock tags and low-stock indicators.
  - Real-time search filter matching product names.
- **Current Sale (Cart) & Cashier Flow:**
  - Add items to the cart with quantity selection and stock validation.
  - Remove items from cart with instant recalculation of total due.
  - Cashier checkout flow: input amount paid, validates tender against total, and calculates change.
- **Session Reports & Transaction Log:**
  - Computes total session sales revenue.
  - Tracks and displays the most purchased products.
  - Live transaction history log recording every completed sale with timestamps.
- **Supplier Catalog Sync via Axios:**
  - Demonstrates HTTP request handling using **Axios** to fetch and verify remote supplier catalog data from `./data/products.json`.

---

## 🛠️ Tech Stack & Tools

- **HTML5:** Semantic markup, accessibility labels, and panel architecture.
- **CSS3:** Responsive layout using CSS Grid and Flexbox, custom store signboard styling, badge indicators, and dynamic state classes.
- **JavaScript (ES6+):** Pure vanilla JavaScript utilizing modern modular architecture (`import`/`export`), Array methods (`map`, `filter`, `reduce`), and `async`/`await`.
- **Axios:** Loaded via CDN for handling asynchronous supplier catalog requests.
- **Environment:** Tested and served on Apache via **XAMPP** and VS Code Live Server.

---

## 📂 Project Structure

```text
7-27 sarisari store website/
├── index.html          # Main application layout and UI panels
├── style.css           # Styling, typography, color themes, responsive rules
├── data/
│   └── products.json   # External supplier catalog JSON dataset
├── js/
│   ├── api.js          # Axios API communication (supplier catalog sync)
│   ├── dom.js          # Dynamic DOM rendering (catalog cards, cart, logs)
│   ├── main.js         # Main application orchestrator & event listeners
│   ├── products.js     # Internal product dataset & search filter logic
│   ├── transactions.js # Cart state, stock validation, checkout, sales stats
│   └── utils.js        # Formatting helpers (formatPeso, formatDate)
├── .gitignore          # Git exclusion rules (.vscode, .kilocode, system files)
└── README.md           # Project documentation
```

---

## 🚀 Getting Started

Because this application uses native **ES6 JavaScript Modules** (`import`/`export`), it must be served via a web server (HTTP/HTTPS) rather than opened directly as a file (`file:///`).

### Method 1: Using XAMPP
1. Place this project folder inside your XAMPP root directory:
   ```text
   C:\xampp\htdocs\
   ```
2. Start the **Apache** server from the **XAMPP Control Panel**.
3. In your browser, open:
   ```text
   http://localhost/3rd%20Year/1ST%20SEMESTER/ITE%20387%20Advance%20Programming/7-27%20sarisari%20store%20website/
   ```

### Method 2: Using VS Code Live Server
1. Open this folder in **Visual Studio Code**.
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **"Open with Live Server"**.

---

## 👤 Author

**Zuriel Anthony Villaluna**  
*BS Information Technology*
