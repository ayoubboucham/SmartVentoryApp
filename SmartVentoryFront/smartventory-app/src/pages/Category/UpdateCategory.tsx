import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCategoryById, updateCategory } from '../../services/categoryService';
import { Category } from '../../models/Category';

const UpdateCategory = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const parsedId = Number(id);
    if (isNaN(parsedId)) return;

    getCategoryById(parsedId)
      .then(setCategory)
      .catch(() => alert('Category not found'));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;

    try {
      await updateCategory(category.id, category);
      alert('Category updated');
      navigate('/categories');
    } catch (err) {
      console.error(err);
      alert('Error while updating category');
    }
  };

  if (!category) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
      <div className="flex justify-end mb-4">
      <Link to="/categories" className="text-sm text-blue-600 hover:underline">
      ←   Back
        </Link></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
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

export default UpdateCategory;