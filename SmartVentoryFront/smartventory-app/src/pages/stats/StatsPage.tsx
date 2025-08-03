import { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService';
import { getAllCategories } from '../../services/categoryService';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Bar,
    Legend,
  } from 'recharts';
import { Link } from 'react-router-dom';

const StatsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
    getAllCategories().then(setCategories);
  }, []);

  const totalProducts = products.length;
  const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
  const stockValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

const productsPerCategory = categories.map((cat) => ({
  name: cat.name,
  value: products.filter(p => p.categoryId === cat.id).length,
}));

const quantityPerCategory = categories.map((cat) => ({
  name: cat.name,
  quantity: products
    .filter(p => p.categoryId === cat.id)
    .reduce((sum, p) => sum + p.quantity, 0),
}));
const stockValuePerCategory = categories.map((cat) => ({
    name: cat.name,
    value: products
      .filter((p) => p.categoryId === cat.id)
      .reduce((sum, p) => sum + p.price * p.quantity, 0),
  }));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8E44AD', '#FF6B6B'];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Product Statistics</h1>      
      <div className="flex justify-end mb-4">
      <Link to="/" className="text-sm text-blue-600 hover:underline">
      ←   Back
        </Link></div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500 text-sm">Total Products</p>
          <p className="text-xl font-semibold">{totalProducts}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500 text-sm">Total Quantity</p>
          <p className="text-xl font-semibold">{totalQuantity}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500 text-sm">Stock Value</p>
          <p className="text-xl font-semibold">{stockValue} DH</p>
        </div>
      </div>

      <div className=" rounded p-4 text-gray-400 text-sm text-center">
       
        <div className="bg-white rounded p-4 shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Products per Category</h2>
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
            <Pie
                data={productsPerCategory}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
            >
                {productsPerCategory.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Legend />
            <Tooltip />
            </PieChart>
        </ResponsiveContainer>
        </div>

        <div className="bg-white rounded p-4 shadow">
        <h2 className="text-lg font-semibold mb-4">Total Quantity per Category</h2>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quantityPerCategory}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#00C49F" />
            </BarChart>
        </ResponsiveContainer>
        </div>
        <div className="bg-white rounded p-4 shadow mt-8">
        <h2 className="text-lg font-semibold mb-4">Stock Value per Category</h2>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockValuePerCategory}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#FF8042" />
            </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
