# Sari-Sari Store POS System 🏪

A modern, responsive, web-based Point of Sale (POS) and grocery management system designed for neighborhood sari-sari stores. Built as an academic project for **ITE 387 Advance Programming** (3rd Year, 1st Semester).

---

## 🌟 Key Features

- **Product Catalog & Live Filtering:**
  - Includes a dataset of 50 local grocery items (dried goods, fresh items, drinks, snacks, condiments).
  - Real-time instant product search by name.
  - Price range filtering (minimum and maximum price in Philippine Peso ₱).
- **Cart & Inventory Control:**
  - Add items with automatic stock validation to prevent ordering beyond current inventory.
  - Dynamic subtotal, item removal, and full cart clearing.
  - Automatic inventory deduction upon completing transactions.
- **Checkout & Cashier Flow:**
  - Automated total calculation.
  - Cash payment validation and real-time change calculation.
  - Printable receipt modal dialog displaying purchased items, total, amount tendered, and date/time.
- **Session Reports & Analytics:**
  - Slide-out drawer displaying total sales revenue, total transaction count, and identifying the session's best-selling product.
  - Detailed transaction history logs with timestamps.
- **Simulated REST API Integration:**
  - Utilizes **Axios** to demonstrate asynchronous data fetching (`GET`) and transaction posting (`POST`) to remote mock endpoints (JSONPlaceholder).

---

## 🛠️ Tech Stack & Tools

- **HTML5:** Semantic layout structure and modal interfaces.
- **CSS3:** Custom responsive layout using Flexbox and CSS Grid, styled with Google Fonts (*League Spartan* & *Lexend*).
- **JavaScript (ES6+):** Pure vanilla JavaScript utilizing modern modular architecture (`import`/`export`), Array methods (`map`, `filter`, `reduce`, `find`), and `async`/`await`.
- **Axios:** HTTP client loaded via CDN for handling asynchronous API requests.
- **Environment:** Run and tested with local Apache server via **XAMPP** and VS Code Live Server.

---

## 📂 Project Structure

```text
7-27 sarisari store website/
├── index.html          # Main application UI and dialog templates
├── style.css           # Custom styles, responsive layout, animations
├── js/
│   ├── api.js          # Axios API calls, simulated GET/POST requests
│   ├── dom.js          # DOM manipulation, dynamic rendering & receipts
│   ├── main.js         # Application orchestrator and event handlers
│   ├── products.js     # Catalog dataset (50 items) & stock helpers
│   └── transactions.js # Cart state, transaction history & analytics
├── .gitignore          # Git ignore configuration
└── README.md           # Project documentation
```

---

## 🚀 Getting Started

Because this application uses native **ES6 JavaScript Modules** (`import`/`export`), it must be served via a local web server rather than opened directly as a local file (`file:///`).

### Method 1: Using XAMPP
1. Place this project folder inside your XAMPP web root directory:
   ```text
   C:\xampp\htdocs\
   ```
2. Open the **XAMPP Control Panel** and start the **Apache** module.
3. Open your web browser and navigate to:
   ```text
   http://localhost/3rd%20Year/1ST%20SEMESTER/ITE%20387%20Advance%20Programming/7-27%20sarisari%20store%20website/
   ```

### Method 2: Using VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and select **"Open with Live Server"**.

---

## 👤 Author

**Zuriel Anthony Villaluna**  
*BS Information Technology*
