import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    <div>
      <h1>Edit Category</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={category.name}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateCategory;