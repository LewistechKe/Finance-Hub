// Axios for HTTP Requests
import axios from "axios";

// Store Actions
import { setBankAccounts } from "../slicers/bankAccountsSlice";
import { setUser } from "../slicers/authSlice";
import { setHousehold, setTransactions } from "../slicers/householdSlice";

export const fetchBankAccounts = async (token, dispatch, history) => {
   try {
      const res = await axios.get("/api/bankaccounts", {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      dispatch(setBankAccounts(res.data));
   } catch (err) {
      if (err.response.status === 401) {
         alert("Session expired. Please login again");
         localStorage.removeItem("token");
         dispatch(setUser(null));
         history.push("/login");
      }
   }
};

export const fetchHouseholdData = async (token, dispatch, history) => {
   try {
      const householdRes = await axios.get("/api/households/", {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      const household = householdRes.data;
      dispatch(setHousehold(household));

      const transactionsRes = await axios.get("/api/transactions/", {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         params: {
            householdId: household._id,
         },
      });
      dispatch(setTransactions(transactionsRes.data));
   } catch (err) {
      if (err.response.status === 401) {
         alert("Session expired. Please login again");
         localStorage.removeItem("token");
         dispatch(setUser(null));
         history.push("/login");
      }
   }
};
