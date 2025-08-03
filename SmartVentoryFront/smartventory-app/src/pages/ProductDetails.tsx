import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../models/Product';
import { getProductById } from '../services/productService';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    const parsedId = Number(id);
    if (isNaN(parsedId)) return;

    getProductById(parsedId)
      .then(setProduct)
      .catch(() => alert('Product not found'));
  }, [id]);

  if (!product) return <p>Loading</p>;

  return (
    <div>
      <h1>Product Details</h1>
      <ul>
        <li><strong>ID:</strong> {product.id}</li>
        <li><strong>Name:</strong> {product.name}</li>
        <li><strong>Price:</strong> {product.price} DH</li>
        <li><strong>Quantity:</strong> {product.quantity}</li>
        <li><strong>Category ID:</strong> {product.categoryId}</li>
      </ul>
    </div>
  );
};

export default ProductDetails;