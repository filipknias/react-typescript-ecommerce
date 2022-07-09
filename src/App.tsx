import { FC, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Product from './pages/Product';
import Basket from './pages/Basket';
import Checkout from './pages/Checkout';
import { useAppDispatch } from './redux/hooks';
import { fetchCart } from './redux/features/cartSlice';

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto py-10 px-5 h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
