import { createSlice } from "@reduxjs/toolkit";
import { Feature, Prices } from "@/lib/types";

interface PlanState {
  product_id: string;
  name: string;
  description: string;
  features: Feature[];
  prices: Prices[];
}
interface InitialState {
  plan: PlanState | null;
  clientSecret: string;
}

const initialState: InitialState = {
  plan: null,
  clientSecret: "",
};

const paymentSlice = createSlice({
  name: "chosenPlan",
  initialState,
  reducers: {
    setChosenPlan: (state, action) => {
      state.plan = action.payload;
    },
    setClientSecret: (state, action) => {
      state.clientSecret = action.payload;
    },
  },
});

export const { setChosenPlan, setClientSecret } = paymentSlice.actions;
export default paymentSlice.reducer;
