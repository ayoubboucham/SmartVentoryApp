import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../../services/productService';
import { Product } from '../../models/Product';
import { getAllCategories } from '../../services/categoryService';
import { Category } from '../../models/Category';




const UpdateProduct = () => {
  const { id: idParam } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [id, setId] = useState<number>(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getAllCategories().then(setCategories).catch((err) => {
      console.error(err);
      alert('Failed to load categories');
    });
    if (!idParam) return;

    const parsedId = Number(idParam);
    if (isNaN(parsedId)) {
      alert('ID invalide');
      return;
    }

    getProductById(parsedId).then((product) => {
      setId(product.id);
      setName(product.name);
      setPrice(product.price);
      setCategoryId(product.categoryId);
    });
  }, [idParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedProduct: Product = {
        id,
        name,
        price,
        quantity,
        categoryId,
      };

      await updateProduct(id, updatedProduct);
      alert('Product updated successfully');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error while updating');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
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
          Update
        </button>
      </form>
    </div>
  );
  
};

export default UpdateProduct;