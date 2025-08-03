import { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';
import { Product } from '../models/Product';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  
  return (
    <div>
      <h1>Liste Product</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>

          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price} DH</td>
              <td>{p.quantity}</td>
              <td>{p.categoryId}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;