// CHakra Ui Components
import { Stat, StatLabel, StatNumber, Box } from "@chakra-ui/react";

// useSelector
import { useSelector } from "react-redux";

const BankAccountsBox = () => {
   const user = useSelector((state) => state.auth.user);

   const userBankAccounts = useSelector((state) =>
      state.bankAccounts.bankAccounts.filter(
         (account) => account.userId === user._id
      )
   );

   return (
      <Box w="100%" h="100%" bg="white" boxShadow="sm" p={8} borderRadius={8}>
         <Stat>
            <StatLabel>Bank Accounts</StatLabel>
            <StatNumber>{userBankAccounts.length}</StatNumber>
         </Stat>
      </Box>
   );
};

export default BankAccountsBox;
