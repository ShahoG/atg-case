import { configureStore } from '@reduxjs/toolkit';
import betTypesReducer from './betyTypeSlice';

const store = configureStore({
  reducer: {
    betTypes: betTypesReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
