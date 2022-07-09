import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import AddressForm  from '../components/Checkout/AddressForm';

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

  return (
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
          <AddressForm shippingData={shippingData} setShippingData={setShippingData} />
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
  )
}

export default Checkout;