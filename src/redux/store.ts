import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import requestsReducer from './features/requestsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    requests: requestsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;