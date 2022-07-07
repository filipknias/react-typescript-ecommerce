import { FC } from 'react';
import { Product } from '@chec/commerce.js/types/product';
import { Link } from 'react-router-dom';
import ProductButton from './ProductButton';

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
      <ProductButton productId={product.id} quantity={1} />
    </div>
  )
}

export default ProductCard;