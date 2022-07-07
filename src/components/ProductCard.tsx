import { FC } from 'react';
import { Product } from '@chec/commerce.js/types/product';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addProductToCart, getProductFromCart } from '../redux/features/cartSlice';
import { getNamedRequest } from '../redux/features/requestsSlice';

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const addProductInProgress = useAppSelector((state) => getNamedRequest(state.requests, `products/addProductToCart/${product.id}`));
  const productInCart = useAppSelector((state) => getProductFromCart(state.cart, product.id));
  const buttonColor = productInCart ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600";
  const navigate = useNavigate();

  const handleAddProduct = (): void => {
    if (addProductInProgress && addProductInProgress.inProgress) return;
    if (productInCart) navigate('/basket');
    else dispatch(addProductToCart({ productId: product.id, quantity: 1 }));
  };

  return (
    <div
      key={product.id} 
      className="flex flex-col hover:shadow-xl px-3 py-5 transition-shadow cursor-pointer border-2 rounded-md border-gray-200 shadow-md"
    >
      <Link to={`/product/${product.id}`} className="flex flex-col justify-between h-full">
        <img 
          src={product.image ? product.image.url : ""} 
          alt={product.name} 
          className="h-48 w-48 object-contain mx-auto select-none" 
        />
        <div className="flex items-center justify-between my-5 gap-5">
          <h3 className="text-md">{product.name}</h3>
          <h3 className="font-medium text-lg whitespace-nowrap">{product.price.formatted_with_symbol}</h3>
        </div>
      </Link>
      <button 
        type="button" 
        className={`product-button ${buttonColor} ${addProductInProgress && addProductInProgress.inProgress ? "bg-opacity-50 pointer-events-none cursor-default" : ""}`}
        onClick={handleAddProduct}
      >
        <FontAwesomeIcon icon={productInCart ? faCheck : faShoppingBasket} className="mr-2" />
        {productInCart ? "Already in basket" : "Buy now"}
      </button>
    </div>
  )
}

export default ProductCard;