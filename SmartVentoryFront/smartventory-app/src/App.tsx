import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import CreateProduct from './pages/CreateProduct';
import UpdateProduct from './pages/UpdateProduct';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <BrowserRouter>
      <nav className="">
        <Link to="/">Produits</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/create">Ajouter Produit</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/create" element={<CreateProduct />} />  
        <Route path="/edit/:id" element={<UpdateProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
