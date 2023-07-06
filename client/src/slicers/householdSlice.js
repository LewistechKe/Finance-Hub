import { createSlice } from "@reduxjs/toolkit";

export const householdSlice = createSlice({
   name: "household",
   initialState: {
      household: null,
      transactions: [],
   },
   reducers: {
      setHousehold: (state, action) => {
         state.household = action.payload;
      },
      setTransactions: (state, action) => {
         state.transactions = action.payload;
      },
   },
});

export const { setHousehold, setTransactions } = householdSlice.actions;

export default householdSlice.reducer;
