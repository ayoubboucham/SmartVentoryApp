import { useEffect, useState } from 'react';
import { Category } from '../../models/Category';
import { getAllCategories, deleteCategory } from '../../services/categoryService';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this category?');
    if (!confirmed) return;

    try {
      await deleteCategory(id);
      alert('Category deleted');
      loadCategories();
    } catch (err) {
      console.error(err);
      alert('Error while deleting category');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
  
      <div className="mb-4">
        <Link to="/categories/create" className="text-sm text-blue-600 hover:underline">
          + Add Category
        </Link>
      </div>
  
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{cat.id}</td>
                <td className="px-4 py-2">{cat.name}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link to={`/categories/edit/${cat.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                  <Link to={`/categories/details/${cat.id}`} className="text-green-600 hover:underline">
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

export default CategoryList;
