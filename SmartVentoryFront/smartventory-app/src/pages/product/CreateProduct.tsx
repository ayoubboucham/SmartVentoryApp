import { useEffect, useState } from 'react';
import { createProduct } from '../../services/productService';
import { getAllCategories } from '../../services/categoryService';
import { Category } from '../../models/Category';
import { Link } from 'react-router-dom';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // When the component loads, fetch the list of categories from the backend
useEffect(() => {
  getAllCategories()
    .then(setCategories)
    .catch((err) => {
      console.error(err);
      alert('Failed to load categories');
    });
}, []);

// Handle the form submission when user tries to add a new product
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // Prevent default form submission behavior (page reload)

  console.log(categoryId); 

  try {
    // Attempt to create a new product using the form values
    await createProduct({ name, price, quantity, categoryId });

    alert('Product added successfully');

    // Reset the form fields after successful submission
    setName('');
    setPrice(0);
    setQuantity(0);
    setCategoryId(0);
  } catch (err) {
    console.error(err);
    alert('Error while adding the product');
  }
};

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <div className="flex justify-end mb-4">
      <Link to="/" className="text-sm text-blue-600 hover:underline">
      ←   Back
        </Link></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
  
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
  
        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>
  
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
  
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>
    </div>
  );
  
};

export default CreateProduct;