import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import AddressForm  from '../components/Checkout/AddressForm';
import commerce from '../lib/commerce';
import { useAppSelector } from '../redux/hooks';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';

export interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  postalCode: string;
  shippingCountry: string|null;
  shippingSubdivision: string|null;
  shippingMethod: string|null;
}

const Checkout: FC = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const [shippingData, setShippingData] = useState<ShippingData>({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    postalCode: '',
    shippingCountry: null,
    shippingSubdivision: null,
    shippingMethod: null,
  });
  const [fetchingToken, setFetchingToken] = useState<boolean>(false);
  const [checkoutToken, setCheckoutToken] = useState<CheckoutToken|null>(null);

  useEffect(() => {
    const fetchCheckoutToken = async () => {
      if (cart === null) return;
      setFetchingToken(true);
      const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });
      setCheckoutToken(token);
      setFetchingToken(false);
    };
    fetchCheckoutToken();
  }, []);

  return (
    <>
      {fetchingToken ? (
        <div className="flex flex-col items-center justify-center gap-2 h-full">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="page-header-container">
            <h2 className="page-header-text">Checkout</h2>
            <Link to="/basket" className="page-header-button">
              <FontAwesomeIcon icon={faShoppingBasket} />
              Basket
            </Link>
          </div>
          <form className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col gap-5">
              <h1 className="font-medium text-2xl mb-2">Contact information</h1>
              {checkoutToken && 
                <AddressForm shippingData={shippingData} setShippingData={setShippingData} checkoutToken={checkoutToken} />
              }
            </div>
            <div className="flex flex-col gap-12">
              <div>
                <h1 className="font-medium text-2xl mb-2">Checkout summary</h1>
                {/* <Summary /> */}
              </div>
              <div>
                <h1 className="font-medium text-2xl mb-2">Payment method</h1>
                {/* <PaymentForm /> */}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Checkout;