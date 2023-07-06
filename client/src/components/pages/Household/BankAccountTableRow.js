// useHistory Hook to redirect user
import { useHistory } from "react-router-dom";

// Chakra UI Components
import { Tr, Td, Button } from "@chakra-ui/react";

const BankAccountTableRow = ({ account }) => {
   let history = useHistory();

   const redirectUser = (route) => {
      history.push(route);
   };

   const capitalise = (str) => {
      return `${str[0].toUpperCase()}${str.substring(1, str.length)}`;
   };
   const date = new Date(account.createdAt);

   const dateOutput = `${date.toLocaleString("en-us", {
      weekday: "long",
   })}, ${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
   })} ${date.getFullYear()} - ${
      date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
   }:${date.getMinutes()} ${date.getHours() > 12 ? "PM" : "AM"}`;

   return (
      <Tr key={account._id}>
         <Td>{account.name}</Td>
         <Td>{capitalise(account.type)}</Td>
         <Td>{dateOutput}</Td>
         <Td>
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
         </Td>
      </Tr>
   );
};

export default BankAccountTableRow;
