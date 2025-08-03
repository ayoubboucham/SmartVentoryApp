import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryById } from '../../services/categoryService';
import { Category } from '../../models/Category';

const CategoryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (!id) return;
    const parsedId = Number(id);
    if (isNaN(parsedId)) return;

    getCategoryById(parsedId)
      .then(setCategory)
      .catch(() => alert('Category not found'));
  }, [id]);

  if (!category) return <p>Loading...</p>;

  return (
    <div>
      <h1>Category Details</h1>
      <ul>
        <li><strong>ID:</strong> {category.id}</li>
        <li><strong>Name:</strong> {category.name}</li>
      </ul>
    </div>
  );
};

export default CategoryDetails;