import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import dialogReducer from "./features/dialogSlice";
import workspaceDeletionDialogReducer from "./features/workspaceDeletionDialogSlice";
import paymentReducer from "./features/paymentSlice";
import { apiSlice } from "./services/apiSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import workspaceDeletionDialogSlice from "./features/workspaceDeletionDialogSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuth = persistReducer(persistConfig, authReducer);
const persistedPayment = persistReducer(persistConfig, paymentReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedAuth,
    dialog: dialogReducer,
    workspaceDeletionDialog: workspaceDeletionDialogSlice,
    payment: persistedPayment,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
