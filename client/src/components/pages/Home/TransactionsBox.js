// Chakra Ui Components
import { Stat, StatLabel, StatNumber, Box } from "@chakra-ui/react";

// useSelector
import { useSelector } from "react-redux";

const TransactionsBox = () => {
   const user = useSelector((state) => state.auth.user);

   const bankAccounts = useSelector((state) =>
      state.bankAccounts.bankAccounts.filter(
         (account) => account.userId === user._id
      )
   );

   const calculateTransactionCount = () => {
      let total = 0;

      bankAccounts.forEach((account) => {
         total += account.transactions.length;
      });

      return total;
   };

   return (
      <Box w="100%" h="100%" bg="white" boxShadow="sm" p={8} borderRadius={8}>
         <Stat>
            <StatLabel>Transactions</StatLabel>
            <StatNumber>{calculateTransactionCount()}</StatNumber>
         </Stat>
      </Box>
   );
};

export default TransactionsBox;
