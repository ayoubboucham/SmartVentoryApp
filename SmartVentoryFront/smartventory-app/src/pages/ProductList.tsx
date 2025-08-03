import { useEffect, useState } from 'react';
import { getAllProducts,deleteProduct } from '../services/productService';
import { Product } from '../models/Product';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      alert('Product deleted');
      loadProducts(); 
    } catch (err) {
      console.error(err);
      alert('Error while deleting the product');
    }
  };
  return (
    <div>
      <h1>Liste Product</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>:</th>
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
              <td>
                <Link to={`/edit/${p.id}`}>Update</Link>
                &nbsp;&nbsp;
                <button
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
                &nbsp;&nbsp;
                <Link to={`/product/${p.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;