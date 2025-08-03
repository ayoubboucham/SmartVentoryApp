import { useState } from 'react';
import { createCategory } from '../../services/categoryService';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory({ name });
      alert('Category added successfully');
      navigate('/categories');
    } catch (err) {
      console.error(err);
      alert('Error while adding the category');
    }
  };

  return (
    <div>
      <h1>Add Category</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CreateCategory;