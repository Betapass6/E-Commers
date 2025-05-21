// src/types/index.ts

export interface Product {
    id: string;
    title: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stockQuantity: number;
    features?: string[];
    colors?: string[];
    quantity?: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    address: string;
}

export interface PaymentDetails {
    cardNumber: string;
    cardHolder: string;
    expirationDate: string;
    cvv: string;
}