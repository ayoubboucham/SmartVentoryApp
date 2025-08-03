import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/product/ProductList';
import CreateProduct from './pages/product/CreateProduct';
import UpdateProduct from './pages/product/UpdateProduct';
import ProductDetails from './pages/product/ProductDetails';
import CategoryList from './pages/Category/CategoryList';
import CreateCategory from './pages/Category/CreateCategory';
import UpdateCategory from './pages/Category/UpdateCategory';
import CategoryDetails from './pages/Category/CategoryDetails';

function App() {
  return (
    <BrowserRouter>
      <nav className="">
        <Link to="/">List products </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/create">Add product</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        ||
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/categories">List categories </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/categories/create">Add category</Link>
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
      </Routes>
    </BrowserRouter>
  );
}
export default App;
