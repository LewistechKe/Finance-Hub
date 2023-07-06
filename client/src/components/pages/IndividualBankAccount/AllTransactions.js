// Chakra UI Components
import {
   Box,
   Heading,
   Text,
   Table,
   Thead,
   Tbody,
   Tr,
   Th,
   Td,
   Button,
   useDisclosure,
   chakra,
} from "@chakra-ui/react";

// Components
import Transaction from "./Transaction";
import AddTransaction from "./AddTransaction";

const AllTransactions = ({ bankAccount, setBankAccount }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
      <>
         <AddTransaction
            isOpen={isOpen}
            onClose={onClose}
            bankAccount={bankAccount}
            setBankAccount={setBankAccount}
         />
         <Box
            w="100%"
            h="100%"
            maxH="100%"
            bg="white"
            boxShadow="sm"
            position="relative"
            px={8}
            pt={6}
            borderRadius={8}
            overflowY="scroll"
            sx={{
               "&::-webkit-scrollbar": {
                  width: "5px",
                  backgroundColor: "gray.50",
                  height: "5px",
               },
               "&::-webkit-scrollbar-thumb": {
                  backgroundColor: `green.400`,
               },
            }}
         >
            <Heading as="h3" size="md" color="gray.600">
               Transactions
            </Heading>

            {bankAccount && bankAccount.transactions.length === 0 ? (
               <Text mt={4} color="gray.600">
                  You have no transactions for this account.{" "}
                  <chakra.span
                     color="green.400"
                     textDecoration="underline"
                     onClick={onOpen}
                     cursor="pointer"
                  >
                     Add your first one
                  </chakra.span>
               </Text>
            ) : bankAccount ? (
               <Table variant="simple" mt={4} w="100%">
                  <Thead>
                     <Tr>
                        <Th>Amount</Th>
                        <Th>Memo</Th>
                        <Th>Date</Th>
                        <Th>Actions</Th>
                     </Tr>
                  </Thead>
                  <Tbody>
                     {bankAccount.transactions.map((transaction) => (
                        <Transaction
                           transaction={transaction}
                           bankAccountID={bankAccount._id}
                           key={transaction._id}
                           setBankAccount={setBankAccount}
                        />
                     ))}
                     <Tr>
                        <Td>
                           <Button
                              colorScheme="green"
                              size="xs"
                              pl={8}
                              pr={8}
                              onClick={onOpen}
                           >
                              Add Transaction
                           </Button>
                        </Td>
                     </Tr>
                  </Tbody>
               </Table>
            ) : (
               "..."
            )}
         </Box>
      </>
   );
};

export default AllTransactions;
