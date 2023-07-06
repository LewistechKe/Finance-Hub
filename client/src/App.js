// useEffect Hook
import { useEffect } from "react";

// Import React Router Stuff
import {
   BrowserRouter as Router,
   Redirect,
   Route,
   Switch,
} from "react-router-dom";

// Import Pages
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import BankAccounts from "./components/pages/BankAccounts/BankAccounts";
import CreateHousehold from "./components/pages/CreateHousehold/CreateHousehold";
import IndividualBankAccount from "./components/pages/IndividualBankAccount/IndividualBankAccount";
import Household from "./components/pages/Household/Household";

// useDispatch hook and useSelector hook
import { useDispatch, useSelector } from "react-redux";

// setUser action
import { setUser } from "./slicers/authSlice";

const App = () => {
   // Redux Dispatch
   const dispatch = useDispatch();

   useEffect(() => {
      const token = localStorage.getItem("token");

      if (token) {
         dispatch(setUser(token));
      }
   }, [dispatch]);

   // isAuthenticated
   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

   return (
      <Router>
         <Switch>
            <Route
               exact
               path="/register"
               render={(props) => {
                  if (isAuthenticated) return <Redirect to="/" />;
                  return <Register {...props} />;
               }}
            />
            <Route
               exact
               path="/login"
               render={(props) => {
                  if (isAuthenticated) return <Redirect to="/" />;
                  return <Login {...props} />;
               }}
            />

            <Route
               exact
               path="/"
               render={(props) => {
                  if (!isAuthenticated) return <Redirect to="/login" />;
                  return <Home {...props} />;
               }}
            />

            <Route
               exact
               path="/bank-accounts"
               render={(props) => {
                  if (!isAuthenticated) return <Redirect to="/login" />;
                  return <BankAccounts {...props} />;
               }}
            />

            <Route
               exact
               path="/bank-accounts/:id"
               render={(props) => {
                  if (!isAuthenticated) return <Redirect to="/login" />;
                  return <IndividualBankAccount {...props} />;
               }}
            />

            <Route
               exact
               path="/household/create"
               render={(props) => {
                  if (!isAuthenticated) return <Redirect to="/login" />;
                  return <CreateHousehold {...props} />;
               }}
            />

            <Route
               exact
               path="/household"
               render={(props) => {
                  if (!isAuthenticated) return <Redirect to="/login" />;
                  return <Household {...props} />;
               }}
            />
         </Switch>
      </Router>
   );
};

export default App;
