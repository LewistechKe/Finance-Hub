// Chakra UI Components
import {
   Box,
   Heading,
   Table,
   Thead,
   Tbody,
   Tr,
   Th,
   Button,
   Text,
} from "@chakra-ui/react";

// useSelector Hook to access state
import { useSelector } from "react-redux";

// Add Icon For Create Bank Account Btn
import { AddIcon } from "@chakra-ui/icons";

// Components
import IndividualAccount from "./IndividualAccount";

const AllAccounts = (props) => {
   const user = useSelector((state) => state.auth.user);

   const bankAccounts = useSelector((state) => {
      return state.bankAccounts.bankAccounts.filter(
         (account) => account.userId === user._id
      );
   });

   return (
      <Box
         w="100%"
         h={{ base: "80vh", md: "100%" }}
         maxH={{ base: "999vh", md: "75vh" }}
         bg="white"
         boxShadow="sm"
         position="relative"
         p={8}
         borderRadius={8}
         overflowY="scroll"
         sx={{
            "&::-webkit-scrollbar": {
               width: "5px",
               backgroundColor: "gray.50",
            },
            "&::-webkit-scrollbar-thumb": {
               backgroundColor: `green.400`,
            },
         }}
      >
         <Heading
            as="h3"
            size="md"
            color="gray.600"
            textAlign={{ base: "center", md: "left" }}
         >
            Your Bank Accounts
         </Heading>

         <Button
            colorScheme="green"
            size="md"
            position={{ base: "relative", md: "absolute" }}
            top={{ md: 5, lg: 8 }}
            right={{ md: 5, lg: 8 }}
            left={{ base: "50%", md: "initial" }}
            transform={{ base: "translateX(-50%)", md: "none" }}
            onClick={props.onOpen}
            mt={{ base: 6, md: 0 }}
         >
            <AddIcon mr={2} /> Create Bank Account
         </Button>

         {bankAccounts.length === 0 ? (
            <Text mt={8} color="gray.700" fontSize="md">
               You have no bank accounts.
            </Text>
         ) : (
            <Table variant="simple" mt={12} w="100%">
               <Thead>
                  <Tr>
                     <Th>Name</Th>
                     <Th>Type</Th>
                     <Th>Transactions Count</Th>
                     <Th>Actions</Th>
                  </Tr>
               </Thead>
               <Tbody>
                  {bankAccounts.map((account) => (
                     <IndividualAccount account={account} key={account._id} />
                  ))}
               </Tbody>
            </Table>
         )}
      </Box>
   );
};

export default AllAccounts;
