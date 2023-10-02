import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import counterReducer from "./features/counter/counterSlice";
import authReducer from "./features/authSlice";
import { apiSlice } from "./services/apiSlice";

const store = configureStore({
  reducer: {
    // count: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
