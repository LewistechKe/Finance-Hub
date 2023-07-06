// Chakra UI Components
import { Container, Grid, GridItem } from "@chakra-ui/react";

// useEffect Hook
import { useEffect } from "react";

// Helmet to Access Head
import { Helmet } from "react-helmet";

// Page Components
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import HouseholdActions from "./HouseholdActions";
import Members from "./Members";
import HouseholdSpending from "./HouseholdSpending";
import HouseholdDeposits from "./HouseholdDeposits";

// useDispatch
import { useDispatch, useSelector } from "react-redux";

// useHistory hook to redirect user
import { useHistory } from "react-router";

// Api Requests
import {
   fetchBankAccounts,
   fetchHouseholdData,
} from "../../../util/apiRequests";
import HouseholdAccountsAndTransactions from "./HouseholdAccountsAndTransactions";

const Household = () => {
   const dispatch = useDispatch();

   const history = useHistory();

   const token = useSelector((state) => state.auth.token);

   useEffect(() => {
      fetchHouseholdData(token, dispatch, history);
      fetchBankAccounts(token, dispatch, history);
   }, [dispatch, history, token]);

   return (
      <>
         <Helmet>
            <title>Financial Portal - Your Household</title>
         </Helmet>
         <>
            <Navbar page="household" />
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
                     <Sidebar page="household" />
                  </GridItem>
                  <GridItem
                     colSpan={{ base: 8, sm: 8, md: 2, lg: 2 }}
                     rowSpan={1}
                  >
                     <Members />
                  </GridItem>
                  <GridItem
                     colSpan={{ base: 8, sm: 8, md: 1, lg: 2 }}
                     rowSpan={1}
                  >
                     <HouseholdSpending />
                  </GridItem>
                  <GridItem
                     colSpan={{ base: 8, sm: 8, md: 2, lg: 2 }}
                     rowSpan={1}
                  >
                     <HouseholdDeposits />
                  </GridItem>
                  <GridItem
                     colSpan={{ base: 8, sm: 8, md: 5, lg: 6 }}
                     rowSpan={3}
                  >
                     <HouseholdAccountsAndTransactions />
                  </GridItem>
                  <GridItem
                     colSpan={{ base: 8, sm: 8, md: 5, lg: 6 }}
                     rowSpan={1}
                  >
                     <HouseholdActions />
                  </GridItem>
               </Grid>
            </Container>
         </>
      </>
   );
};

export default Household;
