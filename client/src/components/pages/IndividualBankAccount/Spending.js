// Chakra Ui Components
import { Stat, StatLabel, StatNumber, Box } from "@chakra-ui/react";

const Spending = ({ bankAccount }) => {
   const calculateTotalExpenses = () => {
      let totalExpenses = 0;

      const expenses = bankAccount.transactions.filter(
         (transaction) => transaction.type !== "deposit"
      );

      expenses.forEach((expense) => {
         totalExpenses += expense.amount;
      });

      return totalExpenses;
   };

   return (
      <Box w="100%" h="100%" bg="white" boxShadow="sm" p={8} borderRadius={8}>
         <Stat>
            <StatLabel>Spending</StatLabel>
            {bankAccount ? (
               <StatNumber color="red.400" fontSize={32}>
                  ${calculateTotalExpenses()}
               </StatNumber>
            ) : (
               <StatNumber>...</StatNumber>
            )}
         </Stat>
      </Box>
   );
};

export default Spending;
