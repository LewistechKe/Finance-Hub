// Chakra UI Components
import { Tr, Td } from "@chakra-ui/react";

const TransactionTableRow = ({ transaction }) => {
   const capitalise = (str) => {
      return `${str[0].toUpperCase()}${str.substring(1, str.length)}`;
   };

   const date = new Date(transaction.date);

   const dateOutput = `${date.toLocaleString("en-us", {
      weekday: "long",
   })}, ${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
   })} ${date.getFullYear()} - ${
      date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
   }:${date.getMinutes()} ${date.getHours() > 12 ? "PM" : "AM"}`;

   return (
      <Tr key={transaction._id}>
         <Td
            color={transaction.type !== "deposit" ? "red.400" : "green.400"}
            fontWeight="medium"
         >
            ${transaction.amount}
         </Td>
         <Td>{capitalise(transaction.type)}</Td>
         <Td>{transaction.memo}</Td>
         <Td>{dateOutput}</Td>
      </Tr>
   );
};

export default TransactionTableRow;
