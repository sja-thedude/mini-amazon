import React, { createContext, useState, ReactNode } from "react";
import { Product } from "../types/product";

const initialProducts: Product[] = [
  {
    id: "1", name: "Running Shoes - Lightweight Cushioned Sole for Men & Women",
    description: "Experience ultimate comfort with these lightweight running shoes featuring responsive cushioning, breathable mesh upper, and durable rubber outsole. Perfect for daily runs, gym workouts, and casual wear. Available in multiple sizes.",
    price: 49.99, originalPrice: 79.99, category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    rating: 4.3, reviewCount: 2847, prime: true,
  },
  {
    id: "2", name: "Premium Leather Crossbody Bag - Adjustable Strap",
    description: "Crafted from genuine leather with a smooth finish. Features an adjustable shoulder strap, multiple interior compartments, secure zip closure, and antique brass hardware. Perfect for everyday use.",
    price: 29.99, originalPrice: 54.99, category: "Fashion",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
    rating: 4.5, reviewCount: 1203, prime: true,
  },
  {
    id: "3", name: "Classic Analog Watch - Stainless Steel Band, Water Resistant",
    description: "Elegant analog watch with a brushed stainless steel case and band. Features Japanese quartz movement, date display, luminous hands, and 50m water resistance. A timeless accessory for any occasion.",
    price: 119.99, originalPrice: 199.99, category: "Fashion",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    rating: 4.6, reviewCount: 5621, prime: true,
  },
  {
    id: "4", name: "Cotton Baseball Cap - Adjustable, One Size Fits All",
    description: "Classic six-panel baseball cap made from 100% brushed cotton. Features an adjustable metal buckle closure, pre-curved brim, and embroidered ventilation eyelets. Comfortable fit for all head sizes.",
    price: 14.99, originalPrice: 24.99, category: "Fashion",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=400",
    rating: 4.1, reviewCount: 892, prime: false,
  },
  {
    id: "5", name: "Polarized Aviator Sunglasses - UV400 Protection",
    description: "Premium aviator sunglasses with polarized TAC lenses for 100% UV400 protection. Lightweight metal alloy frame with adjustable nose pads and spring hinges for a comfortable, secure fit.",
    price: 34.99, originalPrice: 59.99, category: "Fashion",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    rating: 4.4, reviewCount: 3156, prime: true,
  },
  {
    id: "6", name: "Waterproof Winter Jacket - Insulated Fleece Lining",
    description: "Stay warm and dry with this insulated winter jacket. Features a waterproof outer shell, cozy fleece lining, adjustable hood, multiple zippered pockets, and elastic cuffs. Ideal for cold weather and outdoor activities.",
    price: 89.99, originalPrice: 149.99, category: "Fashion",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    rating: 4.7, reviewCount: 4230, prime: true,
  },
  {
    id: "7", name: "Laptop 15.6\" - 16GB RAM, 512GB SSD, Latest Processor",
    description: "High-performance laptop with 15.6-inch FHD display, 16GB DDR5 RAM, 512GB NVMe SSD, and the latest generation processor. Backlit keyboard, fingerprint reader, and all-day battery life. Perfect for work and creativity.",
    price: 899.99, originalPrice: 1299.99, category: "Electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    rating: 4.5, reviewCount: 8934, prime: true,
  },
  {
    id: "8", name: "Wireless Noise-Cancelling Headphones - 30hr Battery",
    description: "Immerse yourself in music with active noise cancellation, Hi-Res Audio support, and 30-hour battery life. Features comfortable over-ear cushions, multipoint connection, built-in microphone, and foldable design for portability.",
    price: 79.99, originalPrice: 129.99, category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    rating: 4.6, reviewCount: 12450, prime: true,
  },
  {
    id: "9", name: "Digital Camera 24MP - 4K Video, Interchangeable Lens",
    description: "Professional-grade mirrorless camera with 24.2MP APS-C sensor, 4K/60fps video recording, 11fps continuous shooting, in-body stabilization, and weather-sealed body. Includes 18-55mm kit lens.",
    price: 499.99, originalPrice: 749.99, category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
    rating: 4.8, reviewCount: 6789, prime: true,
  },
  {
    id: "10", name: "Smartphone 6.7\" OLED - 128GB, Triple Camera",
    description: "Flagship smartphone with 6.7-inch Dynamic AMOLED display, triple camera system (50MP + 12MP + 10MP), 128GB storage, 5G connectivity, all-day battery, and IP68 water resistance.",
    price: 699.99, originalPrice: 999.99, category: "Electronics",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
    rating: 4.4, reviewCount: 15678, prime: true,
  },
  {
    id: "11", name: "Tablet 11\" Liquid Retina - 256GB, Wi-Fi + Pencil Support",
    description: "Powerful tablet with 11-inch Liquid Retina display, latest chip, 256GB storage, Wi-Fi 6E, stylus support, USB-C, and all-day battery. Perfect for entertainment, note-taking, and light productivity.",
    price: 399.99, originalPrice: 599.99, category: "Electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    rating: 4.7, reviewCount: 9201, prime: true,
  },
  {
    id: "12", name: "Sport Sneakers - Breathable Mesh, Responsive Cushioning",
    description: "Engineered for performance with breathable mesh upper, responsive foam midsole, and durable rubber outsole. Features a padded collar, pull-on tab, and reflective details. Great for running, gym, and everyday wear.",
    price: 59.99, originalPrice: 89.99, category: "Fashion",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400",
    rating: 4.2, reviewCount: 1876, prime: true,
  },
  {
    id: "13", name: "Stainless Steel Water Bottle - 32oz Insulated, BPA Free",
    description: "Double-wall vacuum insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. Made from 18/8 food-grade stainless steel. Leak-proof lid, wide mouth, and powder-coated finish.",
    price: 19.99, originalPrice: 34.99, category: "Home",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    rating: 4.8, reviewCount: 23456, prime: true,
  },
  {
    id: "14", name: "Ergonomic Office Chair - Lumbar Support, Adjustable Height",
    description: "Premium ergonomic office chair with breathable mesh back, adjustable lumbar support, 3D armrests, seat depth adjustment, and smooth-rolling casters. Supports up to 300 lbs. Perfect for long work sessions.",
    price: 249.99, originalPrice: 399.99, category: "Home",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400",
    rating: 4.3, reviewCount: 7823, prime: true,
  },
  {
    id: "15", name: "Wireless Bluetooth Speaker - Portable, Waterproof IPX7",
    description: "Take your music anywhere with this portable Bluetooth 5.3 speaker. Features 360-degree sound, 20-hour battery life, IPX7 waterproof rating, built-in microphone, and USB-C charging. Pairs easily with any device.",
    price: 39.99, originalPrice: 69.99, category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    rating: 4.5, reviewCount: 18234, prime: true,
  },
  {
    id: "16", name: "Yoga Mat - Non-Slip, Extra Thick 6mm, with Carrying Strap",
    description: "Premium yoga mat made from eco-friendly TPE material. Features double-sided non-slip texture, 6mm cushioning for joint protection, alignment lines, and includes a carrying strap. 72\" x 24\".",
    price: 24.99, originalPrice: 39.99, category: "Home",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
    rating: 4.6, reviewCount: 5432, prime: false,
  },
];

type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (product: Product) => void;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  updateProduct: () => {},
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const removeProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
