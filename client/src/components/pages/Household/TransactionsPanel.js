// Chakra Ui Components
import { Thead, Tr, Table, Th, Tbody } from "@chakra-ui/react";

// Redux Hooks
import { useSelector } from "react-redux";
import TransactionTableRow from "./TransactionTableRow";

// Components

const TransactionsPanel = () => {
   const transactions = useSelector((state) => state.household.transactions);

   return (
      <Table variant="simple" w="100%">
         <Thead>
            <Tr>
               <Th>Amount</Th>
               <Th>Type</Th>
               <Th>Memo</Th>
               <Th>Date</Th>
            </Tr>
         </Thead>
         <Tbody>
            {transactions.map((transaction) => {
               return (
                  <TransactionTableRow
                     key={transaction._id}
                     transaction={transaction}
                  />
               );
            })}
         </Tbody>
      </Table>
   );
};

export default TransactionsPanel;
