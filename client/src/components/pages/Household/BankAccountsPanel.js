// Chakra Ui Components
import { Thead, Tr, Table, Th, Tbody } from "@chakra-ui/react";

// Redux Hooks
import { useSelector } from "react-redux";

// Components
import BankAccountTableRow from "./BankAccountTableRow";

const BankAccountsPanel = () => {
   const household = useSelector((state) => state.household.household);
   const bankAccounts = useSelector((state) =>
      state.bankAccounts.bankAccounts.filter(
         (account) => account.linkedTo === household._id
      )
   );

   return (
      <Table variant="simple" w="100%">
         <Thead>
            <Tr>
               <Th>Name</Th>
               <Th>Type</Th>
               <Th>Created At</Th>
               <Th>Actions</Th>
            </Tr>
         </Thead>
         <Tbody>
            {bankAccounts.map((account) => {
               return (
                  <BankAccountTableRow account={account} key={account._id} />
               );
            })}
         </Tbody>
      </Table>
   );
};

export default BankAccountsPanel;
