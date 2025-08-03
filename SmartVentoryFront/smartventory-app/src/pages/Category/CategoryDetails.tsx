import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Category Details</h1>     
       <div className="flex justify-end mb-4">
      <Link to="/categories" className="text-sm text-blue-600 hover:underline">
      ←   Back
        </Link></div>
      <ul className="space-y-2 text-sm">
        <li>
          <span className="font-medium text-gray-600">ID:</span> {category.id}
        </li>
        <li>
          <span className="font-medium text-gray-600">Name:</span> {category.name}
        </li>
      </ul>
    </div>
  );
};

export default CategoryDetails;