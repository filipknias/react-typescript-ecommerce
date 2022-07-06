import { FC } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto py-10 px-5 h-full">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
