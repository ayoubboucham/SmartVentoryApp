import { useEffect, useState } from 'react';
import { createProduct } from '../../services/productService';
import { getAllCategories } from '../../services/categoryService';
import { Category } from '../../models/Category';

const CreateProduct = () => {
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(categoryId);
    try {
      await createProduct({ name, price,quantity, categoryId });
      alert('Product added successfully');
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
    <div>
      <h1>Add product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
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
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;