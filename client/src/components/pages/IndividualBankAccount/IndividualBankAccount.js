// Chakra UI Components
import { Container, Grid, GridItem } from "@chakra-ui/react";

// useEffect Hook
import { useEffect, useState } from "react";

// Helmet to Access Head
import { Helmet } from "react-helmet";

// Page Components
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import CurrentBalance from "./CurrentBalance";
import Spending from "./Spending";
import Deposits from "./Deposits";
import AllTransactions from "./AllTransactions";
import BankAccountDetails from "./BankAccountDetails";

// useDispatch
import { useDispatch, useSelector } from "react-redux";

// useHistory hook to redirect user
import { useHistory } from "react-router";

// Axios for HTTP Requests
import axios from "axios";

// Store Actions
import { setUser } from "../../../slicers/authSlice";

const IndividualBankAccount = (props) => {
   const {
      match: { params },
   } = props;

   const dispatch = useDispatch();

   const history = useHistory();

   const token = useSelector((state) => state.auth.token);

   const [bankAccount, setBankAccount] = useState(null);

   useEffect(() => {
      axios
         .get(`/api/bankaccounts/${params.id}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            setBankAccount(res.data);
         })
         .catch((err) => {
            if (err.response.status === 401) {
               alert("Session expired. Please login again");
               setTimeout(() => {
                  localStorage.removeItem("token");
                  dispatch(setUser(null));
                  history.push("/login");
               });
            }
         });
   }, [dispatch, history, token, params.id]);

   return (
      <>
         <Helmet>
            <title>
               Financial Portal - {bankAccount ? bankAccount.name : "..."}
            </title>
         </Helmet>
         <>
            <Navbar page="bankaccount" />
            <Container
               maxW="container.xl"
               h={{ base: "130vh", md: "75vh" }}
               overflowY="hidden"
               mt={{ base: -20, md: 16 }}
               mb={{ base: 12, md: 0 }}
            >
               <Grid
                  h="100%"
                  templateRows={{
                     base: "repeat(8, 1fr)",
                     md: "repeat(5, 1fr)",
                  }}
                  templateColumns="repeat(8, 1fr)"
                  gap={4}
               >
                  <GridItem
                     rowSpan={{ base: 0, md: 5 }}
                     colSpan={{ base: 0, md: 3, lg: 2 }}
                  >
                     <Sidebar page="bankaccount" />
                  </GridItem>
                  <GridItem
                     colSpan={{ base: 8, sm: 8, md: 2, lg: 2 }}
                     rowSpan={1}
                  >
                     <CurrentBalance bankAccount={bankAccount} />
                  </GridItem>
                  <GridItem
                     colSpan={{ base: 8, sm: 8, md: 1, lg: 2 }}
                     rowSpan={1}
                  >
                     <Spending bankAccount={bankAccount} />
                  </GridItem>
                  <GridItem
                     colSpan={{ base: 8, sm: 8, md: 2, lg: 2 }}
                     rowSpan={1}
                  >
                     <Deposits bankAccount={bankAccount} />
                  </GridItem>
                  <GridItem
                     colSpan={{ base: 8, sm: 8, md: 5, lg: 6 }}
                     rowSpan={2}
                  >
                     <BankAccountDetails
                        bankAccount={bankAccount}
                        setBankAccount={setBankAccount}
                     />
                  </GridItem>

                  <GridItem
                     colSpan={{ base: 8, sm: 8, md: 5, lg: 6 }}
                     rowSpan={2}
                  >
                     <AllTransactions
                        bankAccount={bankAccount}
                        setBankAccount={setBankAccount}
                     />
                  </GridItem>
               </Grid>
            </Container>
         </>
      </>
   );
};

export default IndividualBankAccount;
