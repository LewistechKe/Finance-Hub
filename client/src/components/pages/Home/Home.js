// Chakra UI Components
import { Container, Grid, GridItem } from "@chakra-ui/react";

// useEffect Hook
import { useEffect } from "react";

// Helmet to Access Head
import { Helmet } from "react-helmet";

// Page Components
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import BankAccountsBox from "./BankAccountsBox";
import TransactionsBox from "./TransactionsBox";
import TotalSpentBox from "./TotalSpentBox";
import ThingsToDoSection from "./ThingsToDoSection";

// useDispatch
import { useDispatch, useSelector } from "react-redux";

// useHistory hook to redirect user
import { useHistory } from "react-router";

// Axios for HTTP Requests
import axios from "axios";

// Store Actions
import { setBankAccounts } from "../../../slicers/bankAccountsSlice";
import { setUser } from "../../../slicers/authSlice";

const Home = () => {
   const dispatch = useDispatch();

   const history = useHistory();

   const token = useSelector((state) => state.auth.token);

   useEffect(() => {
      axios
         .get("/api/bankaccounts", {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            dispatch(setBankAccounts(res.data));
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
   }, [dispatch, history, token]);

   return (
      <>
         <Helmet>
            <title>Financial Portal - Home</title>
         </Helmet>
         <>
            <Navbar page="home" />
            <Container
               maxW="container.xl"
               h={{ base: "120vh", md: "75vh" }}
               overflowY="hidden"
               mt={{ base: -20, md: 16 }}
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
                     <Sidebar page="home" />
                  </GridItem>
                  <GridItem
                     colSpan={{ base: 8, sm: 8, md: 2, lg: 2 }}
                     rowSpan={1}
                  >
                     <BankAccountsBox />
                  </GridItem>
                  <GridItem
                     colSpan={{ base: 8, sm: 8, md: 1, lg: 2 }}
                     rowSpan={1}
                  >
                     <TransactionsBox />
                  </GridItem>
                  <GridItem
                     colSpan={{ base: 8, sm: 8, md: 2, lg: 2 }}
                     rowSpan={1}
                  >
                     <TotalSpentBox />
                  </GridItem>
                  <GridItem
                     colSpan={{ base: 8, sm: 8, md: 5, lg: 6 }}
                     rowSpan={4}
                  >
                     <ThingsToDoSection />
                  </GridItem>
               </Grid>
            </Container>
         </>
      </>
   );
};

export default Home;
