import { useState } from 'react';
import { createCategory } from '../../services/categoryService';
import { Link, useNavigate } from 'react-router-dom';

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
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Category</h1>
      <div className="flex justify-end mb-4">
      <Link to="/categories" className="text-sm text-blue-600 hover:underline">
      ←   Back
        </Link></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
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

export default CreateCategory;