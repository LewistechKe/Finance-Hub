import { createSlice } from "@reduxjs/toolkit";

export const bankAccountsSlice = createSlice({
   name: "bankAccounts",
   initialState: {
      bankAccounts: [],
   },
   reducers: {
      setBankAccounts: (state, action) => {
         state.bankAccounts = action.payload;
      },
      addBankAccount: (state, action) => {
         state.bankAccounts.push(action.payload);
      },
      removeBankAccount: (state, action) => {
         state.bankAccounts = state.bankAccounts.filter(
            (account) => account._id !== action.payload
         );
      },
      updateBankAccount: (state, action) => {
         const index = state.bankAccounts.findIndex(
            (account) => account._id === action.payload._id
         );
         state.bankAccounts[index] = action.payload;
      },
   },
});

export const {
   setBankAccounts,
   addBankAccount,
   removeBankAccount,
   updateBankAccount,
} = bankAccountsSlice.actions;

export default bankAccountsSlice.reducer;
