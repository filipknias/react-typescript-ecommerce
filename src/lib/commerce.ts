import Commerce from '@chec/commerce.js';
export default new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY || "");