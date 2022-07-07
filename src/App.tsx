import { FC } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Product from './pages/Product';

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className="container mx-auto py-10 px-5 h-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<Product />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
