import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faShoppingBasket, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const Navbar: FC = () => {
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <div className="w-full bg-gray-700 text-white	py-5">
      <div className="container mx-auto px-5">
        <div className="flex justify-between">
          <div className="flex flex-1 gap-10 pr-10">
            <Link to="/">
              <div className="flex items-center gap-3 text-green-400">
                <FontAwesomeIcon icon={faBookmark} className="text-xl" />
                <h1 className="text-3xl font-bold text-green-400 select-none">ecommerce</h1>        
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-end gap-6">
            <Link to="/">
              <div className="nav-item hidden md:flex">
                <FontAwesomeIcon icon={faThLarge} />
                <span className="hidden md:block">Products</span>
              </div>
            </Link>
            <Link to="/basket">
              <div className="nav-item">
                <FontAwesomeIcon icon={faShoppingBasket} />
                <span className="hidden md:block">Basket</span>
                {cart && <div className="bg-red-500 p-1 h-6 w-6 text-xs text-center font-medium rounded-sm">{cart.line_items.length}</div>}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;