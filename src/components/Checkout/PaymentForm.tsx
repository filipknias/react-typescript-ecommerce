import { FC, useState } from 'react';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe, StripeElements, Stripe, StripeError } from '@stripe/stripe-js';
import { ShippingData } from '../../pages/Checkout';
import { useAppDispatch } from '../../redux/hooks';
import { clearCart } from '../../redux/features/cartSlice';
import commerce from '../../lib/commerce';
import { useNavigate } from 'react-router-dom';

interface Props {
  checkoutToken: CheckoutToken;
  shippingData: ShippingData;
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "");

const PaymentForm: FC<Props> = ({ checkoutToken, shippingData }) => {                                          
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [paymentDisabled, setPaymentDisabled] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string|null>(null);

  const handleSubmit = async (elements: StripeElements|null, stripe: Stripe|null) => {
    if (elements === null || stripe === null) return;
    setPaymentError(null);

    // Create stripe payment method
    setPaymentDisabled(true);
    const cardElement = elements.getElement(CardElement);
    if (cardElement === null) return;
    const { error } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      setPaymentDisabled(false);
      if (error.message) setPaymentError(error.message);
      console.log(error);
    } else {
      // Prepare order data and handle capture token
      if (shippingData.shippingMethod === null || shippingData.shippingCountry === null || shippingData.shippingSubdivision === null) return;
      const orderData: CheckoutCapture = {
        line_items: checkoutToken.live.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { 
          name: 'International', 
          street: shippingData.street, 
          town_city: shippingData.city, 
          county_state: shippingData.shippingSubdivision, 
          postal_zip_code: shippingData.postalCode, 
          country: shippingData.shippingCountry, 
        },
        fulfillment: { shipping_method: shippingData.shippingMethod },
        payment: {
          gateway: 'test_gateway',
          card: {
            number: '4242424242424242',
            expiry_month: '02',
            expiry_year: '30',
            cvc: '123',
            postal_zip_code: shippingData.postalCode,
          },
        },
      };
      // Order capture request
      await handleCaptureCheckout(orderData);
      setPaymentDisabled(false);
    }
  };

  const handleCaptureCheckout = async (orderData: CheckoutCapture) => {
    try {
      const order = await commerce.checkout.capture(checkoutToken.id, orderData);
      dispatch(clearCart());
      navigate(`/order/${order.id}`);
    } catch (err: any) {
      console.log(err);
      setPaymentError(err.data.error.message);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>{({ elements, stripe }) => (
        <>
          <div className="my-6">
            <CardElement />
          </div>
          <div 
            onClick={() => handleSubmit(elements, stripe)} 
            className={`checkout-link-button w-full ${paymentDisabled ? "bg-opacity-50 pointer-events-none cursor-default" : ""}`}
          >
            Pay & Confirm ({checkoutToken.live.subtotal.formatted_with_symbol})
          </div>
          {paymentError && (
            <div className="mt-8 bg-red-200 text-red-700 py-3 px-5 rounded-md">{paymentError}</div>
          )}
        </>
      )}
      </ElementsConsumer>
    </Elements>
  )
}

export default PaymentForm;