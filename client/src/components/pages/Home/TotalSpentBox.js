// Chakra Ui Components
import { Stat, StatLabel, StatNumber, Box } from "@chakra-ui/react";

// useSelector
import { useSelector } from "react-redux";

const TotalSpentBox = () => {
   const user = useSelector((state) => state.auth.user);

   const bankAccounts = useSelector((state) =>
      state.bankAccounts.bankAccounts.filter(
         (account) => account.userId === user._id
      )
   );

   const calculateTotalSpent = () => {
      let total = 0;

      bankAccounts.forEach((account) => {
         const filteredTransactions = account.transactions.filter(
            (transaction) =>
               ["point of sale", "withdrawal"].includes(transaction.type)
         );
         filteredTransactions.forEach((transaction) => {
            total += transaction.amount;
         });
      });

      return total;
   };

   return (
      <Box w="100%" h="100%" bg="white" boxShadow="sm" p={8} borderRadius={8}>
         <Stat>
            <StatLabel>Total Spent</StatLabel>
            <StatNumber>${calculateTotalSpent()}</StatNumber>
         </Stat>
      </Box>
   );
};

export default TotalSpentBox;
