import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faSync } from '@fortawesome/free-solid-svg-icons';
import CartTable from '../components/CartTable';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearCart } from '../redux/features/cartSlice';
import { getRequestInProgress } from '../redux/features/requestsSlice';

const Basket:FC = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const clearCartInProgress = useAppSelector((state) => getRequestInProgress(state.requests, 'products/clearCart'));
  const updateCartInProgress = useAppSelector((state) => getRequestInProgress(state.requests, 'products/updateCart'));
  const deleteProductInProgress = useAppSelector((state) => getRequestInProgress(state.requests, 'products/removeProductFromCart'));
  const dispatch = useAppDispatch();
  const [checkoutDisabled, setCheckoutDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (clearCartInProgress || updateCartInProgress || deleteProductInProgress) setCheckoutDisabled(true);
    else setCheckoutDisabled(false);
  }, [clearCartInProgress, updateCartInProgress, deleteProductInProgress]);

  const handleClearCart = () => {
    if (clearCartInProgress) return;
    dispatch(clearCart());   
  };

  return (
    <>
      <div className="page-header-container">
        <h2 className="page-header-text">Basket</h2>
        <button className={`page-header-button ${clearCartInProgress ? "bg-opacity-50 pointer-events-none cursor-default" : ""}`} onClick={handleClearCart}>
          <FontAwesomeIcon icon={faSync} />
          Clear basket
        </button>
      </div>
      <CartTable />
      <div className="flex items-center gap-6 w-full justify-end">
        {cart && <h2 className="text-xl lg:text-2xl font-medium">Total: {cart.subtotal.formatted_with_symbol}</h2>}
        {cart !== null && cart.line_items.length > 0 && (
          <Link 
            to='/checkout'
            className={`checkout-link-button ${checkoutDisabled ? "bg-opacity-50 pointer-events-none" : ""}`}
          >
            Go to checkout
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        )}
      </div>
    </>
  )
}

export default Basket;