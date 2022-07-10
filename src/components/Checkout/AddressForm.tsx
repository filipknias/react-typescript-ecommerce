import { FC, Dispatch, useState, useEffect } from 'react';
import { ShippingData } from '../../pages/Checkout';
import commerce from '../../lib/commerce';
import { LocaleListCountriesResponse, LocaleListSubdivisionsResponse } from '@chec/commerce.js/features/services';
import { GetShippingOptionsResponse } from '@chec/commerce.js/features/checkout';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';

interface Props {
  shippingData: ShippingData;
  setShippingData: Dispatch<React.SetStateAction<ShippingData>>;
  checkoutToken: CheckoutToken;
}

const AddressForm: FC<Props> = ({ shippingData, setShippingData, checkoutToken }) => {
  const [shippingCountries, setShippingCountries] = useState<LocaleListCountriesResponse|null>(null);
  const [shippingSubdivisions, setShippingSubdivisions] = useState<LocaleListSubdivisionsResponse|null>(null);
  const [shippingOptions, setShippingOptions] = useState<GetShippingOptionsResponse[]|null>(null);

  useEffect(() => {
    const fetchShippingCountries = async () => {
      const countries = await commerce.services.localeListShippingCountries(checkoutToken.id);  
      setShippingCountries(countries);
      setShippingData((data) => ({ ...data, shippingCountry: Object.keys(countries.countries)[0] }));
    };
    fetchShippingCountries();
  }, []);

  useEffect(() => {
    if (shippingData.shippingCountry === null) return;
    const fetchSubdivisions = async (countryCode: string) => {
      const subdivisions = await commerce.services.localeListSubdivisions(countryCode);
      setShippingSubdivisions(subdivisions);
      setShippingData((data) => ({ ...data, shippingSubdivision: Object.keys(subdivisions.subdivisions)[0] }));
    };
    fetchSubdivisions(shippingData.shippingCountry);
  }, [shippingData.shippingCountry]);

  useEffect(() => {
    if (shippingData.shippingCountry === null || shippingData.shippingSubdivision === null) return;
    const fetchShippingOptions = async (countryCode: string, subdivision: string) => {
      const options = await commerce.checkout.getShippingOptions(checkoutToken.id, { country: countryCode, region: subdivision });
      setShippingOptions(options);
      setShippingData((data) => ({ ...data, shippingMethod: options[0].id }));
    };
    fetchShippingOptions(shippingData.shippingCountry, shippingData.shippingSubdivision);
  }, [shippingData.shippingSubdivision]);

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
          value={shippingData.shippingCountry || ""}
          disabled={shippingCountries === null}
        >
          {shippingCountries && Object.entries(shippingCountries.countries).map(([code, country]) => (
            <option key={code} value={code}>{country}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="shipping-subdivision" className="font-medium text-lg">Shipping subdivision</label>
        <select 
          id="shipping-subdivision" 
          className="select-input"
          onChange={(e) => setShippingData((data) => ({ ...data, shippingSubdivision: e.target.value }))}
          value={shippingData.shippingSubdivision || ""}
          disabled={shippingSubdivisions === null}
        >
          {shippingSubdivisions && Object.entries(shippingSubdivisions.subdivisions).map(([code, country]) => (
            <option key={code} value={code}>{country}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="shipping-options" className="font-medium text-lg">Shipping options</label>
        <select 
          id="shipping-options" 
          className="select-input"
          onChange={(e) => setShippingData((data) => ({ ...data, shippingOptions: e.target.value }))}
          disabled={shippingOptions === null}
        >
          {shippingOptions && shippingOptions.map(({ id, description, price }) => (
            <option value={id} key={id}>{description} - ({price.formatted_with_symbol})</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default AddressForm;