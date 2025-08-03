import { useState } from 'react';
import { createProduct } from '../services/productService';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
          <label>Category ID</label>
          <input
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            required
          />
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