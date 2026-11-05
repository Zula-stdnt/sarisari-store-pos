<div align="center">

# 🏪 Tindahan ni Aling Neneng — Sari-Sari Store POS
### **Academic Mini-Project for ITE 387: Advanced Programming**
**3rd Year, 1st Semester — Information Technology**

<a id="badge-course"><img src="https://img.shields.io/badge/Course-ITE%20387%3A%20Advanced%20Programming-blue.svg?style=for-the-badge&logo=codeforces&logoColor=white" alt="Course"></a>
<a id="badge-level"><img src="https://img.shields.io/badge/Academic%20Level-3rd%20Year%20%7C%201st%20Semester-0284c7.svg?style=for-the-badge" alt="Academic Level"></a>
<a id="badge-arch"><img src="https://img.shields.io/badge/Architecture-Vanilla%20ES6%2B%20%7C%20Progressive%20Enhancement-10b981.svg?style=for-the-badge&logo=javascript&logoColor=white" alt="Architecture"></a>
<a href="https://zula-stdnt.github.io/sarisari-store-pos/"><img src="https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?style=for-the-badge&logo=githubpages&logoColor=white" alt="Live Demo"></a>
<a href="https://github.com/Zula-stdnt/sarisari-store-pos/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT"></a>
<a id="badge-status"><img src="https://img.shields.io/badge/Status-Completed%20%26%20Optimized-success.svg?style=for-the-badge" alt="Status"></a>

<p align="center">
  A modern, responsive, and data-driven <strong>Point of Sale (POS) and Inventory Management System</strong> engineered for neighborhood grocery and sari-sari stores.<br>
  Built from the ground up to embody the software engineering principles and curriculum competencies taught in <strong>ITE 387: Advanced Programming</strong>.
</p>

<p align="center">
  🌐 <strong>Live Website:</strong> <a href="https://zula-stdnt.github.io/sarisari-store-pos/"><strong>https://zula-stdnt.github.io/sarisari-store-pos/</strong></a>
</p>

[🌐 Live Demo](https://zula-stdnt.github.io/sarisari-store-pos/) • [Explore UI Tour](#visual-ui-showcase--tour) • [Academic Lessons](#academic-lessons--curriculum-alignment-ite-387) • [Core Features](#core-system-features) • [Tech Stack](#technology-stack--specifications) • [How to Run](#local-setup--execution-guide) • [GitHub Upload](#step-by-step-github-deployment-guide)

---

</div>

## <a id="table-of-contents"></a>📑 Table of Contents
1. [Project Overview & Background](#project-overview--background)
2. [Academic Lessons & Curriculum Alignment (ITE 387)](#academic-lessons--curriculum-alignment-ite-387)
3. [Core System Features](#core-system-features)
4. [Visual UI Showcase & Tour](#visual-ui-showcase--tour)
5. [Technology Stack & Specifications](#technology-stack--specifications)
6. [Repository Structure & File Inventory](#repository-structure--file-inventory)
7. [Local Setup & Execution Guide](#local-setup--execution-guide)
8. [Step-by-Step GitHub Deployment Guide](#step-by-step-github-deployment-guide)
9. [Academic Attribution & Credits](#academic-attribution--credits)
10. [License](#license)

---

## <a id="project-overview--background"></a><a id="project-overview"></a>📖 Project Overview & Background

**Tindahan ni Aling Neneng POS** bridges traditional Filipino neighborhood retail workflows with modern client-side web engineering. It provides cashiers and store owners with a high-performance, mobile-responsive point-of-sale interface featuring real-time stock validation, Master-Detail transaction logging, thermal-style customer receipts, and persistent session analytics.

```text
 _______________________________________________________________________________
|                                                                               |
|                      TINDAHAN NI ALING NENENG — POS                           |
|        [Search Products...] [Category: All]  |   CURRENT SALE (Cart)          |
| -------------------------------------------- | ------------------------------ |
|  [Dried Mangoes 200g] ₱180  | [24 in stock]  |  1x Dried Mangoes   ₱180.00    |
|  [Banana Chips 200g]  ₱120  | [30 in stock]  |  2x Pandesal Pack   ₱160.00    |
|  [Tablea Choc 250g]   ₱200  | [15 in stock]  | ------------------------------ |
|  [Coconut Water 1L]   ₱100  | [24 in stock]  |  Total Due:         ₱340.00    |
|                                              |  Amount Paid:       ₱500.00    |
|                                              |  Change:            ₱160.00    |
|                                              |  [ Complete Sale & Receipt 🧾] |
|______________________________________________|________________________________|
```

### Neighborhood Retail Profile
* **Cultural Context:** The Filipino *sari-sari store* is the heartbeat of grassroots retail, characterized by fast-paced transactions, unit-level item quantities, and tight inventory oversight.
* **Operational Scope:** Tracks a curated 50-item grocery catalog across snacks, beverages, pantry essentials, fresh produce, and native delicacies.
* **Core Value:** Replaces manual pen-and-paper ledgers (*kwaderno*) with an instant, touch-ready digital terminal capable of printing itemized receipts and compiling instant revenue metrics.

---

## <a id="academic-lessons--curriculum-alignment-ite-387"></a><a id="academic-lessons"></a>🎓 Academic Lessons & Curriculum Alignment (ITE 387)

This mini-project was designed, structured, and refactored to directly demonstrate practical mastery of competencies taught in the **ITE 387: Advanced Programming** curriculum:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   ITE 387 ADVANCED PROGRAMMING COMPETENCIES                 │
├──────────────────────────┬──────────────────────────────────────────────────┤
│ 01. Factory Functions    │ • RULE-JS-OBJ-01: Prohibits repetitive object   │
│     & Data Modeling      │   literals; uses typed factory constructors.     │
│                          │ • Master-Detail (Header-Detail) relational model │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ 02. Property Grammar     │ • RULE-JS-OBJ-02: Strict Dot Notation for static │
│     & Access Rules       │   properties; dynamic bracket lookups only.      │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ 03. Declarative Query    │ • RULE-JS-OBJ-03: Zero imperative loops for data │
│     Primacy              │   queries (.filter(), .reduce(), .find()).       │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ 04. DOM Side-Effect      │ • RULE-JS-OBJ-04: Confines .forEach() strictly   │
│     Boundaries           │   to DOM rendering side-effects.                 │
│                          │ • RULE-JS-OBJ-05: Decouples display (.innerText) │
│                          │   from system references (.value).               │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ 05. State Persistence &  │ • Web Storage API (localStorage) persistence.    │
│     Universal Runtime    │ • Dual Execution (Zero-CORS on file:/// & HTTP). │
└──────────────────────────┴──────────────────────────────────────────────────┘
```

### Detailed Academic Rules Implementation

| Rule / Principle | Source Reference | Concrete Architectural Implementation |
| :--- | :--- | :--- |
| **`RULE-JS-OBJ-01` Factory Functions** | `javascript_objects_and_arrays.md` | Prohibits raw object literals for recurring schemas; enforces clean factory functions (`createProduct`, `createCartItem`, `createTransactionHeader`, `createTransactionDetail`). |
| **`RULE-JS-OBJ-02` Property Grammar** | `javascript_objects_and_arrays.md` | Uses strict Dot Notation (`product.product_price`, `header.total_amount`) for static keys; Bracket Notation is reserved only for dynamic dictionary lookups. |
| **`RULE-JS-OBJ-03` Declarative Primacy** | `javascript_objects_and_arrays.md` | Imperative `for` loops are strictly banned for querying/aggregations. Uses declarative `.filter()` for search and categories, `.reduce()` for financial totals, and `.find()` for lookups. |
| **`RULE-JS-OBJ-04` Side-Effect Boundary** | `javascript_objects_and_arrays.md` | Restricts `.forEach()` strictly to DOM rendering side-effects, keeping functional data transformations pure. |
| **`RULE-JS-OBJ-05` Display-Reference Decoupling** | `javascript_objects_and_arrays.md` | Dropdowns and UI components strictly decouple human labels (`.innerText`) from unique system primary keys (`.value`). |
| **`Master-Detail Pattern` (Header-Detail)** | `header_detail_forms.md` | Transactions follow relational schema design: a **Master Header** (sale metadata, total, cashier, change) and an array of **Transaction Details** (line items with product ID, unit price, quantity, line total). |
| **`Client-side Persistence`** | `javascript_fundamentals.md` | Stores inventory stock adjustments and transaction history in `localStorage`, paired with a dedicated "Restock & Reset Session" utility. |
| **`Universal Zero-CORS Loading`** | Browser Security Standards | Runs seamlessly on direct double-click (`file:///`) via `js/app.bundle.js` with zero CORS blocking, while preserving modular source files in `js/` for academic grading. |

---

## <a id="core-system-features"></a><a id="core-features"></a>⚡ Core System Features

* 🛒 **50-Item Grocery Catalog:** Pre-populated with popular Filipino grocery items across 6 categories (*Snacks*, *Beverages*, *Pantry*, *Grains*, *Produce*, *Native Delicacies*).
* 🔍 **Dual-Mode Live Search & Category Filter:** Real-time text search instantly filters alongside the canonical category dropdown selector.
* ⚠️ **Stock Depletion & Warning Badges:** Items with $\le 5$ units trigger an orange warning badge; depleted items display an out-of-stock badge and automatically disable their add-to-cart action.
* 📱 **Mobile Sticky Floating Cart Bar:** On mobile screens ($\le 768\text{px}$), an anchored bottom floating bar displays real-time item counts and totals with a quick "View Cart" shortcut that smoothly scrolls to the cart.
* 🧾 **Master-Detail Thermal Receipt Modal:** Completing a sale launches an authentic thermal-receipt dialog complete with cashier name, transaction ID, timestamp, line breakdown, and change computation.
* 🖨️ **Print-Ready Thermal Stylesheet (`@media print`):** Clicking **"Print Receipt"** prints only the clean thermal receipt dialog, isolating it from application UI chrome.
* 📊 **Real-Time Analytics Dashboard:** Computes cumulative sales revenue, total transactions served, and automatically isolates the best-selling product(s).
* 🔄 **Supplier Catalog Sync with Local Fallback:** Integrates with external supplier feeds via Axios while ensuring continuous offline operation.
* 💾 **Session Reset & Restock Utility:** An instant "Restock All & Reset Session" utility clears local transaction history and reloads full warehouse stock for demonstration and grading.

---

## <a id="visual-ui-showcase--tour"></a><a id="ui-tour"></a><a id="ui-showcase"></a>📸 Visual UI Showcase & Tour

The web application is published live at [**https://zula-stdnt.github.io/sarisari-store-pos/**](https://zula-stdnt.github.io/sarisari-store-pos/). Below is a comprehensive visual walkthrough captured directly from the running system:

### 🖥️ Desktop Experience

| 1. Product Catalog & Category Filter | 2. Current Sale (Shopping Cart) |
| :---: | :---: |
| <img src="Desktop_WebPage_Screenshots/Screenshot%20(1327).png" alt="Catalog View" width="100%"> | <img src="Desktop_WebPage_Screenshots/Screenshot%20(1328).png" alt="Shopping Cart" width="100%"> |
| *50-item catalog with live search & category filter dropdown* | *Active cart with automatic subtotal calculation & line removal* |

| 3. Cashier Payment & Thermal Receipt | 4. Session Report & Master-Detail Log |
| :---: | :---: |
| <img src="Desktop_WebPage_Screenshots/Screenshot%20(1329).png" alt="Receipt Modal" width="100%"> | <img src="Desktop_WebPage_Screenshots/Screenshot%20(1330).png" alt="Session Report" width="100%"> |
| *Cash payment validation, change calculation, and printable thermal receipt* | *Real-time sales revenue, transaction counter, and best-seller analytics* |

---

### 📱 Mobile-First Experience

| Mobile Store Header & Filters | 1-Column Responsive Cards | Sticky Floating Cart Bar |
| :---: | :---: | :---: |
| <img src="Mobile_WebPage_Screenshots/IMG_1944.PNG" alt="Mobile Header" width="100%"> | <img src="Mobile_WebPage_Screenshots/IMG_1945.PNG" alt="Mobile Cards" width="100%"> | <img src="Mobile_WebPage_Screenshots/IMG_1946.PNG" alt="Mobile Cart Bar" width="100%"> |
| *Signboard with live supplier sync* | *Touch-friendly product cards* | *Real-time cart bar with 'View Cart' shortcut* |

| Mobile Checkout & Cash Tender | Mobile Thermal Receipt |
| :---: | :---: |
| <img src="Mobile_WebPage_Screenshots/IMG_1947.PNG" alt="Mobile Checkout" width="100%"> | <img src="Mobile_WebPage_Screenshots/IMG_1948.PNG" alt="Mobile Receipt" width="100%"> |
| *Clean numerical inputs & tender validation* | *Responsive customer receipt dialog with print support* |

---

## <a id="technology-stack--specifications"></a><a id="tech-stack"></a><a id="technology-stack"></a>🛠️ Technology Stack & Specifications

| Layer | Technology | Details & Implementation |
| :--- | :--- | :--- |
| **Markup** | HTML5 Semantic Web | Accessible structure using `<main>`, `<section>`, `<header>`, `<article>`, `<dialog>`, and `<button>`. |
| **Styles** | Modern CSS3 | Custom chalkboard aesthetic, CSS variables, CSS Grid, Flexbox, touch-friendly hitboxes ($\ge 44\text{px}$), and `@media print` rules. |
| **Typography** | Web Fonts & Sans | High-contrast readable sans-serif typography tuned for retail cashier legibility. |
| **Scripting** | JavaScript (ES6+) | Vanilla JS implementing factory functions, declarative array pipelines, and destructuring. |
| **Architecture** | Master-Detail Model | Relational structure decoupling transaction headers from itemized purchase line details. |
| **State & Storage** | LocalStorage API | Client-side persistence for inventory stock adjustments, sales transactions, and cashier session history. |
| **Networking** | Axios HTTP Client | External supplier catalog synchronization with automatic local dataset fallback. |
| **Distribution** | Zero-CORS Bundle | Standalone browser bundle [`js/app.bundle.js`](js/app.bundle.js) guaranteeing seamless execution on `file:///` and HTTP hosts alike. |

---

## <a id="repository-structure--file-inventory"></a><a id="repository-structure"></a>📂 Repository Structure & File Inventory

```text
7-27 sarisari store website/
├── index.html                      # Semantic HTML5 layout, panels, and receipt modal
├── style.css                       # Responsive stylesheet, chalkboard theme, print media rules
├── LICENSE                         # Official MIT License file
├── data/
│   └── products.json               # External supplier catalog JSON dataset
├── Desktop_WebPage_Screenshots/    # High-resolution desktop UI screenshots (1080p)
│   ├── Screenshot (1327).png       # Product catalog & filters
│   ├── Screenshot (1328).png       # Active shopping cart & pricing
│   ├── Screenshot (1329).png       # Payment tender & receipt modal
│   └── Screenshot (1330).png       # Session analytics & transaction log
├── Mobile_WebPage_Screenshots/     # Mobile phone UI screenshots
│   ├── IMG_1944.PNG                # Mobile store header & filters
│   ├── IMG_1945.PNG                # Mobile catalog cards
│   ├── IMG_1946.PNG                # Sticky mobile floating cart bar
│   ├── IMG_1947.PNG                # Mobile checkout & tender entry
│   └── IMG_1948.PNG                # Mobile receipt modal & log
├── js/
│   ├── app.bundle.js               # Universal browser bundle (runs with zero CORS on file:/// and localhost)
│   ├── api.js                      # Modular Axios API communication (supplier catalog sync)
│   ├── dom.js                      # Modular DOM rendering utilities & receipt generator
│   ├── main.js                     # Modular application orchestrator and event handlers
│   ├── products.js                 # Modular product catalog, factory functions, stock logic
│   ├── transactions.js             # Modular Master-Detail model, checkout, sales analytics
│   └── utils.js                    # Formatting helpers (formatPeso, formatDate) & storage
├── .gitignore                      # Git exclusion rules (.vscode, .kilocode, system files)
└── README.md                       # Comprehensive repository documentation
```

---

## <a id="local-setup--execution-guide"></a><a id="how-to-run"></a><a id="local-setup"></a>💻 Local Setup & Execution Guide

### Prerequisites
* Any modern web browser (Google Chrome, Brave, Mozilla Firefox, Microsoft Edge, Safari).
* Optional: Local Apache server (such as **XAMPP**) or VS Code with **Live Server**.

### Execution Options

#### Option A: Instant Live Web Demo (GitHub Pages — Recommended)
The project is hosted live on GitHub Pages with zero setup needed:  
👉 **[https://zula-stdnt.github.io/sarisari-store-pos/](https://zula-stdnt.github.io/sarisari-store-pos/)**

#### Option B: Direct Local Browser Launch (Zero Server Required)
Thanks to the universal bundle [`js/app.bundle.js`](js/app.bundle.js), you can browse to the project folder in File Explorer and **double-click [`index.html`](index.html)**. It runs with zero CORS errors and full offline capability.

#### Option C: Via XAMPP Apache
1. Move or clone this project folder into your XAMPP web root directory:
   ```text
   C:\xampp\htdocs\
   ```
2. Open the **XAMPP Control Panel** and click **Start** next to Apache.
3. Open your browser and navigate to:
   ```text
   http://localhost/3rd%20Year/1ST%20SEMESTER/ITE%20387%20Advance%20Programming/7-27%20sarisari%20store%20website/
   ```

#### Option D: Via VS Code Live Server
1. Open this repository in **Visual Studio Code**.
2. Install the **Live Server** extension by Ritwick Dey.
3. Right-click [`index.html`](index.html) and click **"Open with Live Server"**.

---

## <a id="step-by-step-github-deployment-guide"></a><a id="github-upload"></a><a id="deployment-guide"></a>🚀 Step-by-Step GitHub Deployment Guide

Follow these commands in your PowerShell or Git terminal to sync changes to GitHub:

```powershell
# 1. Navigate to the project directory
cd "C:\xampp\htdocs\3rd Year\1ST SEMESTER\ITE 387 Advance Programming\7-27 sarisari store website"

# 2. Stage all project files (respects .gitignore)
git add .

# 3. Commit the changes
git commit -m "docs: modernize README following standard academic portfolio format"

# 4. Push to remote repository
git push origin main
```

---

## <a id="academic-attribution--credits"></a><a id="credits"></a>👥 Academic Attribution & Credits

* **Student Author:** Zuriel Anthony Villaluna
* **Degree Program:** Bachelor of Science in Information Technology (BSIT)
* **Course:** ITE 387 – Advanced Programming
* **Academic Term:** 3rd Year, 1st Semester
* **Assignment:** Mini Project — Sari-Sari Store Point of Sale Web Application
* **Live Deployment:** [https://zula-stdnt.github.io/sarisari-store-pos/](https://zula-stdnt.github.io/sarisari-store-pos/)
* **Repository:** [https://github.com/Zula-stdnt/sarisari-store-pos](https://github.com/Zula-stdnt/sarisari-store-pos)

---

## <a id="license"></a>📄 License

This project is licensed under the **MIT License** — see the [LICENSE](https://github.com/Zula-stdnt/sarisari-store-pos/blob/main/LICENSE) file for complete details.

```text
MIT License

Copyright (c) 2026 Zuriel Anthony Villaluna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">
  <sub>Built with pride for academic excellence in Advanced Programming. © 2026 Tindahan ni Aling Neneng POS.</sub>
</div>
