import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addProductToCart, getProductFromCart } from '../redux/features/cartSlice';
import { getRequestInProgress } from '../redux/features/requestsSlice';

interface Props {
  productId: string;
  quantity: number;
}

const ProductButton: FC<Props> = ({ productId, quantity }) => {
  const dispatch = useAppDispatch();
  const addProductInProgress = useAppSelector((state) => getRequestInProgress(state.requests, 'products/addProductToCart', productId));
  const productInCart = useAppSelector((state) => getProductFromCart(state.cart, productId));
  const buttonColor = productInCart ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600";
  const navigate = useNavigate();

  const handleAddProduct = (): void => {
    if (addProductInProgress && addProductInProgress.inProgress) return;
    if (productInCart) navigate('/basket');
    else dispatch(addProductToCart({ productId: productId, quantity }));
  };

  return (
    <button 
      type="button" 
      className={`product-button ${buttonColor} ${addProductInProgress && addProductInProgress.inProgress ? "bg-opacity-50 pointer-events-none cursor-default" : ""}`}
      onClick={handleAddProduct}
    >
      <FontAwesomeIcon icon={productInCart ? faCheck : faShoppingBasket} className="mr-2" />
      {productInCart ? "Already in basket" : "Buy now"}
    </button>
  )
}

export default ProductButton;