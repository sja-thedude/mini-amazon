# Mini Amazon - React Native

## Overview
Mini Amazon is a **prototype e-commerce app** built with React Native to showcase my skills as a mobile app developer.  
It includes basic e-commerce features and dashboards for both admin and clients. This version is a **minimal MVP** but designed to be **easily extendable**.

## Features (MVP)
- User authentication (login/logout) [mock or Firebase]
- Product listing with image, price, description
- Cart: Add/remove items, view total price
- Checkout (mock payment)
- Likes/Wishlist for products
- Admin dashboard: Add/remove products (basic)
- Client dashboard: View cart & order history (mocked)

## Future Enhancements
- Real payment integration (Stripe/PayPal)
- Product categories & search
- Ratings & reviews
- Push notifications
- User profiles

## Tech Stack
- React Native (Expo)
- React Navigation
- Context API or Redux (optional for cart state)

## Installation
```bash
# Clone the repo
git clone https://github.com/<username>/mini-amazon-react-native.git

# Navigate into the directory
cd mini-amazon-react-native

# Install dependencies
npm install

# Run the app
npx expo start
```

## Test:

| Role   | Username | Password    |
| ------ | -------- | ----------- |
| Admin  | `admin`  | `admin123`  |
| Client | `client` | `client123` |

## Usage
	•	Login with dummy credentials
	•	Browse products
	•	Add items to cart and checkout
	•	Admin can add/remove products
