// useHistory Hook to redirect user
import { useHistory } from "react-router-dom";

// Chakra UI Components
import { Tr, Td, Flex, Button, useDisclosure } from "@chakra-ui/react";

// Components
import DeleteAccountDialog from "./DeleteAccountDialog";

const IndividualAccount = ({ account }) => {
   const { isOpen, onClose, onOpen } = useDisclosure();

   const capitalise = (str) => {
      return `${str[0].toUpperCase()}${str.substring(1, str.length)}`;
   };

   let history = useHistory();

   const redirectUser = (route) => {
      history.push(route);
   };

   return (
      <>
         <DeleteAccountDialog
            bankAccount={account}
            isOpen={isOpen}
            onClose={onClose}
         />
         <Tr key={account._id}>
            <Td>{account.name}</Td>
            <Td>{capitalise(account.type)}</Td>
            <Td>{account.transactions.length}</Td>
            <Td>
               <Flex>
                  <Button
                     colorScheme="green"
                     size="sm"
                     onClick={redirectUser.bind(
                        this,
                        `/bank-accounts/${account._id}`
                     )}
                  >
                     View Account
                  </Button>
                  <Button
                     colorScheme="red"
                     variant="outline"
                     size="sm"
                     ml={4}
                     onClick={onOpen}
                  >
                     Delete Account
                  </Button>
               </Flex>
            </Td>
         </Tr>
      </>
   );
};

export default IndividualAccount;
