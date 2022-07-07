import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestStart, requestSuccess, requestFail } from './requestsSlice';
import commerce from '../../lib/commerce';
import { Cart } from '@chec/commerce.js/types/cart';

interface CartState {
  cart: Cart|null;
};

const initialState: CartState = {
  cart: null,
};

interface AddProductAction {
  productId: string;
  quantity: number;
};

interface RemoveProductAction {
  lineItemId: string;
}

interface UpdateCartAction {
  lineItemId: string;
  dataToUpdate: any;
};

export const fetchCart = createAsyncThunk<Cart>('products/fetchCart', async (args, { dispatch, rejectWithValue }) => {
  dispatch(requestStart({ type: 'products/fetchCart' }));
  try {
    const cart = await commerce.cart.retrieve();
    dispatch(requestSuccess({ type: 'products/fetchCart' }));
    return cart;
  } catch (err) {
    console.log(err);
    dispatch(requestFail({ type: 'products/fetchCart' }));
    return rejectWithValue(err);
  }
});

export const addProductToCart = createAsyncThunk<Cart, AddProductAction>('products/addProductToCart', async ({ productId, quantity }, { dispatch, rejectWithValue }) => {
  dispatch(requestStart({ type: `products/addProductToCart/${productId}` }));
  try {
    const { cart } = await commerce.cart.add(productId, quantity);
    dispatch(requestSuccess({ type: `products/addProductToCart/${productId}`}));
    return cart;
  } catch (err) {
    console.log(err);
    dispatch(requestFail({ type: `products/addProductToCart/${productId}`}));
    return rejectWithValue(err);
  }
});

export const removeProductFromCart = createAsyncThunk<Cart, RemoveProductAction>('products/removeProductFromCart', async ({ lineItemId }, { rejectWithValue, dispatch }) => {
  dispatch(requestStart({ type: `products/removeProductFromCart/${lineItemId}` }));
  try {
    const { cart } = await commerce.cart.remove(lineItemId);
    dispatch(requestSuccess({ type: `products/removeProductFromCart/${lineItemId}` }));
    return cart;
  } catch (err) {
    console.log(err);
    dispatch(requestFail({ type: `products/removeProductFromCart/${lineItemId}` }));
    return rejectWithValue(err);
  }
});

export const updateCart = createAsyncThunk<Cart, UpdateCartAction>('products/updateCart', async ({ lineItemId, dataToUpdate }, { rejectWithValue, dispatch }) => {
  dispatch(requestStart({ type: 'products/updateCart' }));
  try {
    const { cart } = await commerce.cart.update(lineItemId, dataToUpdate);
    console.log(cart)
    dispatch(requestSuccess({ type: 'products/updateCart' }));
    return cart;
  } catch (err) {
    console.log(err);
    dispatch(requestFail({ type: 'products/updateCart' }));
    return rejectWithValue(err);
  }
});

export const clearCart = createAsyncThunk<Cart>('products/clearCart', async (args, { rejectWithValue, dispatch }) => {
  dispatch(requestStart({ type: 'products/clearCart' }));
  try {
    const { cart } = await commerce.cart.empty();
    dispatch(requestSuccess({ type: 'products/clearCart' }));
    return cart;
  } catch (err) {
    console.log(err);
    dispatch(requestFail({ type: 'products/clearCart' }));
    return rejectWithValue(err);
  }
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });
    builder.addCase(addProductToCart.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });
    builder.addCase(removeProductFromCart.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });
    builder.addCase(updateCart.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });
    builder.addCase(clearCart.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });
  },
});

export const { } = cartSlice.actions;

export default cartSlice.reducer;