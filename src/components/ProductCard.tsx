import { FC } from 'react';
import { Product } from '@chec/commerce.js/types/product';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
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
        className={`bg-green-500 hover:bg-green-600 rounded-sm py-2 font-bold transition-colors px-10 text-white text-center`}
      >
        <FontAwesomeIcon icon={faShoppingBasket} className="mr-2" />
        Buy now
      </button>
    </div>
  )
}

export default ProductCard;