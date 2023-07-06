import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicers/authSlice";
import bankAccountsReducer from "./slicers/bankAccountsSlice";
import householdReducer from "./slicers/householdSlice";

export default configureStore({
   reducer: {
      auth: authReducer,
      bankAccounts: bankAccountsReducer,
      household: householdReducer,
   },
});
