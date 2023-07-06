// useState hook
import { useState } from "react";

// Chakra UI Components
import {
   Tr,
   Td,
   Flex,
   InputGroup,
   InputLeftAddon,
   InputRightAddon,
   Input,
   Text,
   Select,
   useToast,
} from "@chakra-ui/react";

// Icons
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

// Axios
import axios from "axios";

// useSelector + useDispatch hook
import { useDispatch, useSelector } from "react-redux";

// UpdateBankAccount Action
import { updateBankAccount } from "../../../slicers/bankAccountsSlice";
import DeleteTransactionDialog from "./DeleteTransactionDialog";

const Transaction = ({ transaction, bankAccountID, setBankAccount }) => {
   const date = new Date(transaction.date);

   const dateOutput = `${date.toLocaleString("en-us", {
      weekday: "long",
   })}, ${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
   })} ${date.getFullYear()} - ${
      date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
   }:${date.getMinutes()} ${date.getHours() > 12 ? "PM" : "AM"}`;

   const [editingMode, setEditingMode] = useState(false);

   const [userInput, setUserInput] = useState({
      amount: transaction.amount,
      type: transaction.type,
      memo: transaction.memo,
   });

   const inputChange = (e) =>
      setUserInput({ ...userInput, [e.target.id]: e.target.value });

   const toast = useToast();

   const token = useSelector((state) => state.auth.token);

   const dispatch = useDispatch();

   const [isOpen, setIsOpen] = useState(false);

   const onClose = () => setIsOpen(false);

   const updateTransaction = async () => {
      const body = { ...userInput, bankId: bankAccountID };
      try {
         const res = await axios.put(
            `/api/transactions/${transaction._id}`,
            body,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );

         toast({
            title: "Transaction Updated",
            status: "success",
            duration: 7000,
            isClosable: true,
         });

         setEditingMode(false);

         dispatch(updateBankAccount(res.data));
         setBankAccount(res.data);
      } catch (err) {
         toast({
            title: "An error occured.",
            status: "error",
            duration: 7000,
            isClosable: true,
         });
      }
   };

   return (
      <>
         <Tr key={transaction._id}>
            <Td
               color={
                  transaction.type === "deposit" && !editingMode
                     ? "green.400"
                     : !editingMode
                     ? "red.400"
                     : "grey.600"
               }
               fontWeight="medium"
            >
               {editingMode ? (
                  <>
                     <Text
                        fontSize={14}
                        mb={2}
                        color="grey.400"
                        fontWeight="light"
                     >
                        Amount
                     </Text>
                     <InputGroup size="xs">
                        <InputLeftAddon children="$" />
                        <Input
                           w={128}
                           value={userInput.amount}
                           id="amount"
                           onChange={inputChange}
                        />
                        <InputRightAddon children=".00" />
                     </InputGroup>
                  </>
               ) : (
                  `$${transaction.amount}`
               )}
            </Td>
            <Td fontSize="sm">
               {editingMode ? (
                  <>
                     <Text
                        fontSize={14}
                        mb={2}
                        color="grey.400"
                        fontWeight="light"
                     >
                        Type
                     </Text>
                     <Select
                        w={128}
                        size="xs"
                        value={userInput.type}
                        id="type"
                        onChange={inputChange}
                     >
                        <option value="deposit">Deposit</option>
                        <option value="withdrawal">Withdrawal</option>
                        <option value="point of sale">Point of Sale</option>
                     </Select>
                  </>
               ) : (
                  transaction.memo
               )}
            </Td>
            <Td fontSize="sm">
               {editingMode ? (
                  <>
                     <Text
                        fontSize={14}
                        mb={2}
                        color="grey.400"
                        fontWeight="light"
                     >
                        Memo
                     </Text>
                     <Input
                        w={175}
                        size="xs"
                        value={userInput.memo}
                        id="memo"
                        onChange={inputChange}
                     />
                  </>
               ) : (
                  dateOutput
               )}
            </Td>
            <Td>
               <Flex>
                  {editingMode ? (
                     <>
                        <CheckIcon
                           w={5}
                           h={5}
                           color="green.400"
                           cursor="pointer"
                           onClick={() => updateTransaction()}
                        />{" "}
                        <CloseIcon
                           ml={2}
                           w={4}
                           h={4}
                           color="red.400"
                           cursor="pointer"
                           onClick={() => setEditingMode(false)}
                        />
                     </>
                  ) : (
                     <>
                        <EditIcon
                           w={5}
                           h={5}
                           color="green.400"
                           cursor="pointer"
                           onClick={() => setEditingMode(true)}
                        />
                        <DeleteIcon
                           ml={2}
                           w={5}
                           h={5}
                           color="red.400"
                           cursor="pointer"
                           onClick={() => setIsOpen(true)}
                        />
                     </>
                  )}
               </Flex>
            </Td>
         </Tr>
         <DeleteTransactionDialog
            isOpen={isOpen}
            onClose={onClose}
            transaction={transaction}
            setBankAccount={setBankAccount}
            bankAccountID={bankAccountID}
         />
      </>
   );
};

export default Transaction;
