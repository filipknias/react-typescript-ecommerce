import { FC } from 'react';
import { useAppSelector } from '../../redux/hooks';

const CartSummary: FC = () => {
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <>
      {cart && (
        <>
          {cart.line_items.map(({ id, name, price, quantity }) => (
            <div key={id}>
              <div className="flex items-center justify-between font-medium border-b-2 py-4">
                <h2>{name}</h2>
                <h2>{price.formatted_with_symbol} ({quantity})</h2>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between font-bold border-b-2 py-4 text-xl">
            <h2>Total</h2>
            <h2>{cart.subtotal.formatted_with_symbol}</h2>
          </div>
        </>
      )}
    </>
  )
}

export default CartSummary;