# Mini Amazon - React Native

## Overview
Mini Amazon is a **prototype e-commerce app** built with React Native (Expo) to showcase mobile app development skills.  
It includes e-commerce features and dashboards for both admin and clients, with an Amazon-inspired UI theme.

## Features

### Client Side
- **Authentication** — Role-based login (admin/client) with mock credentials
- **Product Listing** — Browse 12+ products in a responsive grid layout
- **Product Details** — View full product info with image, price, and description
- **Shopping Cart** — Add/remove items, view total, clear cart
- **Checkout** — Review order and place it (mock payment)
- **Wishlist** — Like/unlike products, view and manage saved items
- **Add to Cart from Wishlist** — Move wishlist items directly to cart

### Admin Side
- **Dashboard** — View product count and order stats at a glance
- **Add Product** — Create new products with name, price, description, and image URL
- **Delete Product** — Remove products from the store
- **View Orders** — See all customer orders with item details and totals
- **Logout** — Secure logout with confirmation

## Tech Stack
- React Native (Expo)
- Expo Router (file-based routing)
- Context API (Auth, Cart, Product, Wishlist state management)
- TypeScript

## Get Started

1. Clone the repo

   ```bash
   git clone https://github.com/sja-thedude/mini-amazon.git
   cd mini-amazon
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Test Credentials

| Role   | Username | Password    |
| ------ | -------- | ----------- |
| Admin  | `admin`  | `admin123`  |
| Client | `client` | `client123` |

## App Structure

```
app/
  _layout.tsx          # Root layout with providers
  index.tsx            # Entry point with auth routing
  context/             # State management (Auth, Cart, Product, Wishlist)
  screens/             # Client screens (Home, ProductDetails, Cart, Checkout, Wishlist)
  admin/               # Admin screens (Dashboard, AddProduct, Orders)
  components/          # Reusable UI components (Button, Input, CartItem, ProductCard)
  types/               # TypeScript type definitions
```

## Future Enhancements
- Real payment integration (Stripe/PayPal)
- Product categories and search
- Ratings and reviews
- Push notifications
- User profiles
- Backend persistence (Firebase/Supabase)
