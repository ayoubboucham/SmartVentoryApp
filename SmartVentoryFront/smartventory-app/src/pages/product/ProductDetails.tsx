import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../../models/Product';
import { getProductById } from '../../services/productService';
import {  getAllCategories } from '../../services/categoryService';
import { Category } from '../../models/Category';


const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!id) return;

    const parsedId = Number(id);
    if (isNaN(parsedId)) return;

    getProductById(parsedId)
      .then(setProduct)
      .catch(() => alert('Product not found'));

    getAllCategories()
      .then(setCategories)
      .catch(() => alert('Failed to load categories'));
  }, [id]);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'N/A';
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Product Details</h1>
      <div className="flex justify-end mb-4">
      <Link to="/" className="text-sm text-blue-600 hover:underline">
      ←   Back
        </Link></div>
      <ul className="space-y-2 text-sm">
        <li>
          <span className="font-medium text-gray-600">ID:</span> {product.id}
        </li>
        <li>
          <span className="font-medium text-gray-600">Name:</span> {product.name}
        </li>
        <li>
          <span className="font-medium text-gray-600">Price:</span> {product.price} DH
        </li>
        <li>
          <span className="font-medium text-gray-600">Quantity:</span> {product.quantity}
        </li>
        <li>
          <span className="font-medium text-gray-600">Category:</span> {getCategoryName(product.categoryId)}
        </li>
      </ul>
    </div>
  );
  
};

export default ProductDetails;
