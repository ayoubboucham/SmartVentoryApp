import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
