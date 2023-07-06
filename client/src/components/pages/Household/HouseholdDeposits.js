// Chakra Ui Components
import { Stat, StatLabel, StatNumber, Box } from "@chakra-ui/react";

// useSelector Hook
import { useSelector } from "react-redux";

const HouseholdDeposits = () => {
   const transactions = useSelector((state) => state.household.transactions);

   const calculateTotalIncome = () => {
      let totalIncome = 0;

      const incomes = transactions.filter(
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
            <StatLabel>Household Deposits</StatLabel>
            {transactions ? (
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

export default HouseholdDeposits;
