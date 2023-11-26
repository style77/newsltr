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
}

const initialState: InitialState = {
  plan: null,
};

const paymentSlice = createSlice({
  name: "chosenPlan",
  initialState,
  reducers: {
    setChosenPlan: (state, action) => {
      state.plan = action.payload;
    },
  },
});

export const { setChosenPlan } = paymentSlice.actions;
export default paymentSlice.reducer;
