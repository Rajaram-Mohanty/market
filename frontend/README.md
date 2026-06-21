# 💻 Market Frontend - React + TypeScript E-Commerce Client

This directory contains the client-side application for the Market Multi-Vendor Marketplace, built with React 19, TypeScript, Redux Toolkit, Material UI (MUI v7), and Tailwind CSS v4.

---

## 🎨 Tech Stack & Libraries

*   **Runtime Framework:** React 19.2.0 & React DOM 19.2.0
*   **State Management:** Redux Toolkit 2.11.2 (Redux Thunk middleware for async actions)
*   **Styling:**
    *   Material UI (MUI 7.3.6) for component structure and design theme.
    *   Tailwind CSS v4.1.18 for utility-based layout styling.
    *   Styled Components 6.1.19 & Emotion for customized layouts.
*   **Routing:** React Router DOM 7.12.0
*   **Forms & Validation:** Formik 2.4.9 and Yup 1.7.1
*   **HTTP Client:** Axios 1.13.3
*   **Carousels/Sliders:** React Slick 0.31.0 & Slick Carousel

---

## 📁 Folder Structure

The frontend application code is organized under `src/` as follows:

```
src/
├── admin/                 # Admin Dashboard pages and components
│   ├── account/           # Admin profile details
│   ├── coupon/            # Coupon creation and list controls
│   ├── dashboard/         # Main administrative overview telemetry
│   ├── homepage/          # Grid category, deals, and banner editors
│   └── sellers/           # Approving/verifying/suspending seller accounts
├── seller/                # Seller Dashboard pages and components
│   ├── account/           # Business, bank, and pickup addresses
│   ├── orders/            # Orders filterable by shipment state
│   ├── payment/           # Payment logs, transactions, and report sheets
│   ├── products/          # Product list, add product form, and edits
│   └── seller-dashboard/  # Main layout shell and sidebars
├── customer/              # Customer interface views
│   ├── checkout/          # Multi-step shipping and checkout process
│   ├── components/        # Shared customer components (e.g., Navbar)
│   ├── pages/             # Pages (Home, Product Listing, Details, Cart, Wishlist, Account)
│   └── wishlist/          # Saved items view
├── component/             # Global re-usable components (RequireAuth, GlobalSnackbar, etc.)
├── config/                # HTTP Axios configs and backend server hosts
├── state/                 # Redux Slices and Store configuration
│   ├── admin/             # Slices for admin coupons, deals, and reports
│   ├── customer/          # Slices for cart, products, reviews, orders, wishlist
│   ├── seller/            # Slices for products, orders, transactions
│   ├── authSlice.ts       # Customer/Admin auth sessions (signup/login/user profile)
│   ├── store.ts           # Root Redux store configuration
│   └── snackbarSlice.ts   # System-wide alert triggers
├── theme/                 # MUI Custom Theme configurations
├── types/                 # Custom TypeScript interfaces/types matching backend models
└── util/                  # Helper utility scripts
```

---

## 🧠 State Management (Redux Store)

The global application state is managed by Redux Toolkit, located in `src/state/store.ts`. Side-effects (such as HTTP requests to the Spring Boot REST API) are handled using Redux Thunks.

### Main Redux Slices
1.  **`auth`** (`authSlice.ts`): Manages authentication token (`jwt`), customer profile data, password resets, and login statuses.
2.  **`sellerAuth` & `seller`** (`sellerSlice.ts`): Holds seller onboarding details, verification states, and profile forms.
3.  **`product`** (`productSlice.ts`): Holds list of searched/filtered products, pagination indicators, and product detail states.
4.  **`cart`** (`cartSlice.ts`): Syncs shopping cart additions, quantity modifications, price math, and applied coupon tags.
5.  **`order`** (`orderSlice.ts`): Handles customer order creation tracking, details, and checkout history.
6.  **`wishlist`** (`wishlistSlice.ts`): Manages customer wishlist items.
7.  **`review`** (`reviewSlice.ts`): Handles submission and rendering of product reviews and ratings.
8.  **`admin`** (`adminSlice.ts`): Admin dashboards, vendor toggles, and report lookups.
9.  **`snackbar`** (`snackbarSlice.ts`): Dispatches global snackbar alerts for user action notifications.

---

## 🛣️ Navigation & Routing

Routing is handled by React Router DOM in `src/App.tsx`. Role-based route protection is implemented using the `RequireAuth` component.

*   **Public Routes:**
    *   `/` - Home Page (grids, deals, slider displays)
    *   `/login` - Login, signup, and reset passwords
    *   `/products/:category` - Category product listings
    *   `/product-details/:categoryId/:name/:productId` - Product specification sheet
    *   `/become-seller` - Onboarding form for new sellers
*   **Customer Protected Routes (`ROLE_CUSTOMER`):**
    *   `/cart` - Shop cart list
    *   `/wishlist` - Saved products grid
    *   `/checkout` - Checkout wizard
    *   `/account/*` - Customer panel (personal details, address list, order history)
    *   `/reviews/:productId/create` - Leave a product review
    *   `/payment/success/:orderId` - Confirmation screen
*   **Seller Protected Routes (`ROLE_SELLER`):**
    *   `/seller/*` - Seller dashboard (CRUD catalog listings, change orders, view earnings)
*   **Admin Protected Routes (`ROLE_ADMIN`):**
    *   `/admin/*` - Admin dashboard (manage coupons, home page controls, approve sellers)

---

## 🚀 Setup & Local Development

### Prerequisites
*   Make sure you have **Node.js 18+** and **npm** installed.
*   Confirm the backend service is running on `http://localhost:5454`.

### Installation
1.  Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Run Server
Start the Vite development server locally:
```bash
npm run dev
```
By default, the server runs on `http://localhost:5173`.

### Build App
Compile and build the production bundle:
```bash
npm run build
```
The optimized bundle will be compiled into the `dist/` directory.
