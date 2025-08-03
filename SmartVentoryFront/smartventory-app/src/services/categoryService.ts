import axios from 'axios';
import { Category } from '../models/Category';

const API_URL = 'http://localhost:5065/api/categories';

export const getAllCategories = async (): Promise<Category[]> => {
    const response = await axios.get<{ $values: Category[] }>(API_URL);
    return response.data.$values;
  };
  
export const getCategoryById = async (id: number): Promise<Category> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
  };

export const createCategory = async (category: Omit<Category, 'id'>): Promise<void> => {
    await axios.post(API_URL, category);
  };

export const updateCategory = async (id: number, category: Category): Promise<void> => {
    await axios.put(`${API_URL}/${id}`, category);
  };

export const deleteCategory = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  };