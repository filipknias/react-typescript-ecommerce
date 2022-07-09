import { FC, Dispatch, useState } from 'react';
import { ShippingData } from '../../pages/Checkout';

interface Props {
  shippingData: ShippingData;
  setShippingData: Dispatch<React.SetStateAction<ShippingData>>;
}

const AddressForm: FC<Props> = ({ shippingData, setShippingData }) => {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="form-group">
        <label htmlFor="first-name" className="font-medium text-lg">First name</label>
        <input
          type="text"
          id="first-name"
          placeholder="First name"
          required
          className="text-input"
          value={shippingData.firstName}
          onChange={(e) => setShippingData((data) => ({ ...data, firstName: e.target.value }))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="last-name" className="font-medium text-lg">Last name</label>
        <input
          type="text"
          id="last-name"
          placeholder="Last name"
          required
          className="text-input"
          value={shippingData.lastName}
          onChange={(e) => setShippingData((data) => ({ ...data, lastName: e.target.value }))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="font-medium text-lg">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="E-mail"
          required
          className="text-input"
          value={shippingData.email}
          onChange={(e) => setShippingData((data) => ({ ...data, email: e.target.value }))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="street" className="font-medium text-lg">Street</label>
        <input
          type="text"
          id="street"
          placeholder="Street"
          required
          className="text-input"
          value={shippingData.street}
          onChange={(e) => setShippingData((data) => ({ ...data, street: e.target.value }))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="city" className="font-medium text-lg">City</label>
        <input
          type="text"
          id="city"
          placeholder="City"
          required
          className="text-input"
          value={shippingData.city}
          onChange={(e) => setShippingData((data) => ({ ...data, city: e.target.value }))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="postal-code" className="font-medium text-lg">Zip / Postal code</label>
        <input
          type="text"
          id="postal-code"
          placeholder="Postal code"
          required
          className="text-input"
          value={shippingData.postalCode}
          onChange={(e) => setShippingData((data) => ({ ...data, postalCode: e.target.value }))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="shipping-country" className="font-medium text-lg">Shipping country</label>
        <select 
          id="shipping-country" 
          className="select-input"
          onChange={(e) => setShippingData((data) => ({ ...data, shippingCountry: e.target.value }))}
        >
          
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="shipping-subdivision" className="font-medium text-lg">Shipping subdivision</label>
        <select 
          id="shipping-subdivision" 
          className="select-input"
          onChange={(e) => setShippingData((data) => ({ ...data, shippingSubdivision: e.target.value }))}
        ></select>
      </div>
      <div className="form-group">
        <label htmlFor="shipping-options" className="font-medium text-lg">Shipping options</label>
        <select 
          id="shipping-options" 
          className="select-input"
          onChange={(e) => setShippingData((data) => ({ ...data, shippingOptions: e.target.value }))}
        ></select>
      </div>
    </div>
  )
}

export default AddressForm;