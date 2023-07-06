// Chakra Ui Components
import { Stat, StatLabel, StatNumber, Box } from "@chakra-ui/react";

const Deposits = ({ bankAccount }) => {
   const calculateTotalIncome = () => {
      let totalIncome = 0;

      const incomes = bankAccount.transactions.filter(
         (transaction) => transaction.type === "deposit"
      );

      incomes.forEach((income) => {
         totalIncome += income.amount;
      });
      return totalIncome;
   };

   return (
      <Box w="100%" h="100%" bg="white" boxShadow="sm" p={8} borderRadius={8}>
         <Stat>
            <StatLabel>Deposits</StatLabel>
            {bankAccount ? (
               <StatNumber color="green.500" fontSize={32}>
                  ${calculateTotalIncome()}
               </StatNumber>
            ) : (
               <StatNumber>...</StatNumber>
            )}
         </Stat>
      </Box>
   );
};

export default Deposits;
