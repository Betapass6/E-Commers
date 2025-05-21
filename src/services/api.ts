import axios from 'axios';
import productsData from '../data/products.json';
import { Product } from '../types';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
});

export const getProducts = async (): Promise<{ data: Product[] }> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { data: productsData.products };
};

export const getProduct = async (id: string): Promise<{ data: Product }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const product = productsData.products.find(p => p.id === id);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  return { data: product };
};

export const createOrder = (orderData: any) => api.post('/orders', orderData);

export default api;