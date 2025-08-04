import axios from 'axios';
import { Product } from '../models/Product';

type ProductApiResponse = {
  $id: string;
  $values: Product[];
};

// const API_URL = 'http://localhost:5065/api/products';
const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get<ProductApiResponse>(API_URL);
  return response.data.$values;
};
export const createProduct = async (product: Omit<Product, 'id'>): Promise<void> => {
  await axios.post(API_URL, product);
};
export const getProductById = async (id: number): Promise<Product> => {
console.log(`${API_URL}/${id}`);
  const response = await axios.get<Product>(API_URL + `/${id}`);
  return response.data;
};
export const updateProduct = async ( id: number,product: Product): Promise<void> => {
console.log(API_URL+`/${product.id}`);
await axios.put(`${API_URL}/${id}`, product);
};

export const deleteProduct = async (id: number): Promise<void> => {
await axios.delete(`${API_URL}/${id}`);
};