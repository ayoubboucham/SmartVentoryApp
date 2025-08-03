import axios from 'axios';
import { Product } from '../models/Product';

type ProductApiResponse = {
  $id: string;
  $values: Product[];
};

const API_URL = 'http://localhost:5065/api/products';

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get<ProductApiResponse>(API_URL);
  return response.data.$values;
};