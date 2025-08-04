import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../../models/Product';
import { getProductById } from '../../services/productService';
import {  getAllCategories } from '../../services/categoryService';
import { Category } from '../../models/Category';


const ProductDetails = () => {
  // We extract the 'id' from the URL parameters
  const { id } = useParams<{ id: string }>();

  // Local state to hold the product data once fetched
  const [product, setProduct] = useState<Product | null>(null);

  // Local state to hold all categories, used to display the category name
  const [categories, setCategories] = useState<Category[]>([]);

  // When the component mounts or the 'id' changes, we fetch product + category data
  useEffect(() => {
    // If there's no ID in the URL, we can't fetch anything
    if (!id) return;

    // Try to parse the ID into a number
    const parsedId = Number(id);
    if (isNaN(parsedId)) return;

    // Fetch product details by ID
    getProductById(parsedId)
      .then(setProduct)
      .catch(() => alert('Product not found'));

    // Fetch all categories to match category ID with its name
    getAllCategories()
      .then(setCategories)
      .catch(() => alert('Failed to load categories'));
  }, [id]);

  // Helper function: Given a category ID, return the corresponding category name
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
