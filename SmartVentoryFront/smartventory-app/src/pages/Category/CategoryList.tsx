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
    <div>
      <h1>Category List</h1>
      <Link to="/categories/create">Add Category</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>
                <Link to={`/categories/edit/${cat.id}`}>Edit</Link> &nbsp;&nbsp;
                <button onClick={() => handleDelete(cat.id)}>Delete</button> &nbsp;&nbsp;
                <Link to={`/categories/details/${cat.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
