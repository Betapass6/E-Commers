// src/types/index.ts

export interface Product {
    id: string;
    title: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stockQuantity: number;
    features: string[];
    colors?: string[];
    category?: string;
    rating?: number;
    reviews?: number;
    badge?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Address {
    id: string;
    label: string;
    recipient: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    addresses?: Address[];
    selectedAddressId?: string;
}

export interface PaymentDetails {
    cardNumber: string;
    cardHolder: string;
    expirationDate: string;
    cvv: string;
}