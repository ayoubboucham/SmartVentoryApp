import { useEffect, useState } from 'react';
import { getAllProducts,deleteProduct } from '../../services/productService';
import { Product } from '../../models/Product';
import { Link } from 'react-router-dom';
import { Category } from '../../models/Category';
import { getAllCategories } from '../../services/categoryService';

const ProductList = () => {
  // We store all products returned from the API in this state
  const [products, setProducts] = useState<Product[]>([]);

  // We store the list of all categories to use them (e.g., showing category names)
  const [categories, setCategories] = useState<Category[]>([]);

  // This function loads both products and categories from the backend
  // It's called once when the component mounts, and again after deletion
  const loadData = async () => {
    const productsData = await getAllProducts();
    const categoriesData = await getAllCategories();

    console.log(categoriesData);

    setProducts(productsData);
    setCategories(categoriesData);
  };

  // Load products and categories when the component first loads
  useEffect(() => {
    loadData();
  }, []);

  // This function deletes a product after user confirms
  // If deletion is successful, it refreshes the product list
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      alert('Product deleted');

      // Refresh the data after successful deletion
      loadData(); 
    } catch (err) {
      console.error(err);
      alert('Error while deleting the product');
    }
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name ? category.name : 'N/A';
  };
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      <div className="mb-4">
        <Link to="/create" className="text-sm text-blue-600 hover:underline">
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">${p.price}</td>
                <td className="px-4 py-2">{p.quantity}</td>
                <td className="px-4 py-2">{getCategoryName(p.categoryId)}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link to={`/edit/${p.id}`} className="text-blue-600 hover:underline">Edit</Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                  <Link to={`/product/${p.id}`} className="text-green-600 hover:underline">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;