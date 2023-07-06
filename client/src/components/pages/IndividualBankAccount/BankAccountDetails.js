// Chakra UI Components
import {
   Box,
   chakra,
   Heading,
   Text,
   Spinner,
   Button,
   Flex,
   useDisclosure,
   Input,
   Select,
   useToast,
} from "@chakra-ui/react";

// useState Hook
import { useEffect, useState } from "react";

// Components
import DeleteAccountDialog from "../BankAccounts/DeleteAccountDialog";

// Axios
import axios from "axios";

// Redux Hooks
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { updateBankAccount } from "../../../slicers/bankAccountsSlice";

const BankAccountDetails = ({ bankAccount, setBankAccount }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const [editingStatus, setEditingStatus] = useState(false);

   const [userInput, setUserInput] = useState({
      name: "",
      type: "",
      balance: "",
      lowBalanceAlert: "",
   });

   const inputChange = (e) => {
      setUserInput({ ...userInput, [e.target.id]: e.target.value });
   };

   useEffect(() => {
      if (bankAccount) {
         setUserInput({
            name: bankAccount.name,
            type: bankAccount.type,
            balance: bankAccount.balance,
            lowBalanceAlert: bankAccount.lowBalanceAlert,
         });
      }
   }, [bankAccount]);

   const toast = useToast();

   const token = useSelector((state) => state.auth.token);

   const dispatch = useDispatch();

   const [isLoading, setIsLoading] = useState(false);

   const updateHandler = async () => {
      setIsLoading(true);
      try {
         const res = await axios.put(
            `/api/bankaccounts/${bankAccount._id}`,
            userInput,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );

         toast({
            title: "Bank Account Updated",
            status: "success",
            duration: 7000,
            isClosable: true,
         });

         setEditingStatus(false);
         setIsLoading(false);

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
         <DeleteAccountDialog
            bankAccount={bankAccount}
            isOpen={isOpen}
            onClose={onClose}
         />
         <Box
            w="100%"
            h="100%"
            maxH="100%"
            bg="white"
            boxShadow="sm"
            position="relative"
            p={8}
            pt={6}
            borderRadius={8}
         >
            <Heading as="h3" size="md" color="gray.600" mb={4}>
               Bank Account Details
            </Heading>

            {bankAccount ? (
               <>
                  <Text
                     fontSize={16}
                     color="gray.600"
                     display={editingStatus ? "flex" : ""}
                  >
                     <chakra.span fontWeight="medium">Name: </chakra.span>
                     {!editingStatus ? (
                        bankAccount.name
                     ) : (
                        <Input
                           size="xs"
                           w={180}
                           value={userInput.name}
                           id="name"
                           onChange={inputChange}
                           ml={4}
                        />
                     )}
                  </Text>
                  <Text
                     fontSize={16}
                     color="gray.600"
                     mt={3}
                     display={editingStatus ? "flex" : ""}
                  >
                     <chakra.span fontWeight="medium">Type: </chakra.span>
                     {!editingStatus ? (
                        bankAccount.type[0].toUpperCase() +
                        bankAccount.type.substring(1, bankAccount.type.length)
                     ) : (
                        <Select
                           size="xs"
                           w={180}
                           value={userInput.type}
                           id="type"
                           onChange={inputChange}
                           ml={4}
                        >
                           <option value="checking">Checking</option>
                           <option value="savings">Savings</option>
                           <option value="credit">Credit</option>
                        </Select>
                     )}
                  </Text>
                  <Text
                     fontSize={16}
                     color="gray.600"
                     mt={3}
                     display={editingStatus ? "flex" : ""}
                  >
                     <chakra.span fontWeight="medium">
                        Starting Balance:{" "}
                     </chakra.span>
                     {!editingStatus ? (
                        bankAccount.balance
                     ) : (
                        <Input
                           size="xs"
                           w={180}
                           value={userInput.balance}
                           id="balance"
                           onChange={inputChange}
                           ml={4}
                        />
                     )}
                  </Text>
                  <Text
                     fontSize={16}
                     color="gray.600"
                     mt={3}
                     display={editingStatus ? "flex" : ""}
                  >
                     <chakra.span fontWeight="medium">
                        Low Balance Alert:{" "}
                     </chakra.span>
                     {!editingStatus ? (
                        bankAccount.lowBalanceAlert
                     ) : (
                        <Input
                           size="xs"
                           w={180}
                           value={userInput.lowBalanceAlert}
                           id="lowBalanceAlert"
                           onChange={inputChange}
                           ml={4}
                        />
                     )}
                  </Text>
                  <Flex mt={4}>
                     {!editingStatus ? (
                        <>
                           <Button
                              colorScheme="green"
                              size="sm"
                              onClick={setEditingStatus.bind(this, true)}
                           >
                              Edit Details
                           </Button>
                           <Button
                              colorScheme="red"
                              size="sm"
                              ml={4}
                              onClick={onOpen}
                           >
                              Delete Account
                           </Button>
                        </>
                     ) : (
                        <>
                           <Button
                              colorScheme="green"
                              size="sm"
                              onClick={updateHandler}
                              isLoading={isLoading}
                              loadingText="Updating"
                           >
                              Update
                           </Button>
                           <Button
                              colorScheme="red"
                              size="sm"
                              ml={4}
                              onClick={setEditingStatus.bind(this, false)}
                           >
                              Cancel
                           </Button>
                        </>
                     )}
                  </Flex>
               </>
            ) : (
               <Spinner color="green.400" />
            )}
         </Box>
      </>
   );
};

export default BankAccountDetails;
