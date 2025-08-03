import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import ProductList from './pages/product/ProductList';
import CreateProduct from './pages/product/CreateProduct';
import UpdateProduct from './pages/product/UpdateProduct';
import ProductDetails from './pages/product/ProductDetails';
import CategoryList from './pages/Category/CategoryList';
import CreateCategory from './pages/Category/CreateCategory';
import UpdateCategory from './pages/Category/UpdateCategory';
import CategoryDetails from './pages/Category/CategoryDetails';
import StatsPage from './pages/stats/StatsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="max-w-4xl mx-auto p-6">
        <nav className="flex gap-8 border-b mb-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'pb-2 border-b-2 border-black font-semibold'
                : 'pb-2 text-gray-600 hover:text-black'
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive
                ? 'pb-2 border-b-2 border-black font-semibold'
                : 'pb-2 text-gray-600 hover:text-black'
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              isActive
                ? 'pb-2 border-b-2 border-black font-semibold'
                : 'pb-2 text-gray-600 hover:text-black'
            }
          >
            Stats
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/edit/:id" element={<UpdateProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/create" element={<CreateCategory />} />
          <Route path="/categories/edit/:id" element={<UpdateCategory />} />
          <Route path="/categories/details/:id" element={<CategoryDetails />} />

          
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
