// Chakra Ui Components
import { Stat, StatLabel, StatNumber, Box } from "@chakra-ui/react";

const CurrentBalance = ({ bankAccount }) => {
   const calculateCurrentBalance = () => {
      // Calculate total expenses
      let totalExpenses = 0;

      const expenses = bankAccount.transactions.filter(
         (transaction) => transaction.type !== "deposit"
      );

      expenses.forEach((expense) => {
         totalExpenses += expense.amount;
      });

      // Subtract total expenses from starting balance
      let balance = bankAccount.balance - totalExpenses;

      // Calculate total income
      let totalIncome = 0;

      const incomes = bankAccount.transactions.filter(
         (transaction) => transaction.type === "deposit"
      );

      incomes.forEach((income) => {
         totalIncome += income.amount;
      });

      // Add income
      balance += totalIncome;

      return balance;
   };

   return (
      <Box w="100%" h="100%" bg="white" boxShadow="sm" p={8} borderRadius={8}>
         <Stat>
            <StatLabel>Current Balance</StatLabel>
            {bankAccount ? (
               <StatNumber
                  color={
                     calculateCurrentBalance() > bankAccount.lowBalanceAlert
                        ? "green.500"
                        : "red.400"
                  }
                  fontSize={32}
               >
                  ${calculateCurrentBalance()}
               </StatNumber>
            ) : (
               <StatNumber>...</StatNumber>
            )}
         </Stat>
      </Box>
   );
};

export default CurrentBalance;
