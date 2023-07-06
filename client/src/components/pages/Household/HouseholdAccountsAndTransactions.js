// Chakra Ui Components
import {
   Box,
   Heading,
   Spinner,
   TabList,
   TabPanel,
   TabPanels,
   Tabs,
   Tab,
} from "@chakra-ui/react";

// Redux Hooks
import { useSelector } from "react-redux";

// Components
import BankAccountsPanel from "./BankAccountsPanel";
import TransactionsPanel from "./TransactionsPanel";

const HouseholdAccountsAndTransactions = () => {
   const household = useSelector((state) => state.household.household);
   const tabPanelProps = {
      pl: -2,
      overflowY: "scroll",
      h: "300px",
      sx: {
         "&::-webkit-scrollbar": {
            width: "5px",
            backgroundColor: "gray.50",
            height: "5px",
         },
         "&::-webkit-scrollbar-thumb": {
            backgroundColor: `green.400`,
         },
      },
   };

   return (
      <Box
         w="100%"
         h="100%"
         bg="white"
         boxShadow="sm"
         p={8}
         borderRadius={8}
         overflow="hidden"
      >
         {household ? (
            <>
               <Heading
                  as="h3"
                  size="md"
                  color="gray.600"
                  textAlign={{ base: "center", md: "left" }}
               >
                  {household.name}
               </Heading>
               <Tabs mt={5} isFitted>
                  <TabList mb={2}>
                     <Tab
                        fontWeight="medium"
                        color="gray.500"
                        sx={{ _focus: { outline: "none" } }}
                        _selected={{
                           bg: "green.100",
                        }}
                     >
                        Bank Accounts
                     </Tab>
                     <Tab
                        fontWeight="medium"
                        color="gray.500"
                        sx={{ _focus: { outline: "none" } }}
                        _selected={{
                           bg: "green.100",
                        }}
                     >
                        Transactions
                     </Tab>
                  </TabList>
                  <TabPanels>
                     <TabPanel {...tabPanelProps}>
                        <BankAccountsPanel />
                     </TabPanel>
                     <TabPanel {...tabPanelProps}>
                        <TransactionsPanel />
                     </TabPanel>
                  </TabPanels>
               </Tabs>
            </>
         ) : (
            <Spinner color="green.400" />
         )}
      </Box>
   );
};

export default HouseholdAccountsAndTransactions;
