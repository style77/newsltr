import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isUserAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  isUserAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isUserAuthenticated = true;
    },
    logout: (state) => {
      state.isUserAuthenticated = false;
    },
    isLoadingFinished: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setAuth, logout, isLoadingFinished } = authSlice.actions;
export default authSlice.reducer;
