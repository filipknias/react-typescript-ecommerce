import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeProductFromCart, updateCart } from '../redux/features/cartSlice';
import { getRequestInProgress } from '../redux/features/requestsSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const CartTable: FC = () => {
  const { requests } = useAppSelector((state) => state.requests);
  const { cart } = useAppSelector((state) => state.cart);
  const updateCartInProgress = useAppSelector((state) => getRequestInProgress(state.requests, 'products/updateCart'));
  const dispatch = useAppDispatch();
  
  const handleUpdateCart = (lineItemId: string, dataToUpdate: any) => {
    if (updateCartInProgress) return;
    dispatch(updateCart({ lineItemId, dataToUpdate }));
  };
  
  const handleRemoveProduct = (lineItemId: string, productId: string) => {
    if (getDeleteRequestInProgress(productId)) return;
    dispatch(removeProductFromCart({ lineItemId }));
  };
  
  const getDeleteRequestInProgress = (id: string) => {
    const deleteRequest = requests.find((request) => {
      return request.type === 'products/removeProductFromCart' && request.inProgress && request.id === id;
    });
    if (deleteRequest) return deleteRequest;
  };

  return (
    <table className="cart-table">
      <thead className="bg-gray-100 text-center text-sm lg:text-base">
        <td className="cart-table-head-title">#</td>
        <td className="cart-table-head-title">Product</td>
        <td className="cart-table-head-title">Quantity</td>
        <td className="cart-table-head-title">Price</td>
      </thead>
      <tbody className="text-center text-md lg:text-lg">
        {cart && cart.line_items.map(({ id, product_id, image, name, price, quantity }, index) => (
          <tr key={id}>
            <td>{index + 1}</td>
            <td className="lg:px-6 py-2 lg:py-4 flex items-center justify-between gap-5 min-w-max lg:min-w-0">
              <div className="flex items-center gap-5">
                <img src={image ? image.url : ""} alt={name} className="h-10 lg:h-20" />
                <Link to={`/product/${product_id}`}>
                  <h2 className="hover:underline">{name}</h2>
                </Link>
              </div>
              <button 
                className={`cart-table-delete-button ${getDeleteRequestInProgress(id) ? "bg-opacity-50 pointer-events-none" : ""}`}
                onClick={() => handleRemoveProduct(id, product_id)}  
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
            <td className="lg:px-6 py-2 lg:py-4">
              <div className="flex items-center justify-center gap-2">
                <h2 
                  className="text-gray-500 font-medium text-xl cursor-pointer"
                  onClick={() => handleUpdateCart(id, { quantity: quantity - 1 })}
                >
                  -
                </h2>
                {quantity}
                <h2 
                  className="text-gray-500 font-medium text-xl cursor-pointer"
                  onClick={() => handleUpdateCart(id, { quantity: quantity + 1 })}
                >
                  +
                </h2>
              </div>
            </td>
            <td className="lg:px-6 py-2 lg:py-4">${price.raw * quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CartTable;