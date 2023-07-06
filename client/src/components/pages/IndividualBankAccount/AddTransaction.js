// useState hook
import { useState } from "react";

// Chakra Ui Components
import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   FormControl,
   Button,
   FormLabel,
   Input,
   Select,
   InputGroup,
   InputLeftAddon,
   InputRightAddon,
   useToast,
} from "@chakra-ui/react";

// Components
import ErrorAlert from "../../alerts/ErrorAlert";

// Redux hooks
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { updateBankAccount } from "../../../slicers/bankAccountsSlice";
import { setUser } from "../../../slicers/authSlice";

// UseHistory hook to redirect user
import { useHistory } from "react-router-dom";

// Axios
import axios from "axios";

const AddTransaction = ({ isOpen, onClose, bankAccount, setBankAccount }) => {
   // Blank user input to be used when resetting input
   const blankInput = {
      amount: 0,
      type: "",
      memo: "",
   };

   // Control user input form
   const [userInput, setUserInput] = useState(blankInput);

   // Handle input change event to update state
   const inputOnChange = (e) => {
      setUserInput({ ...userInput, [e.target.id]: e.target.value });
   };

   // Store errors
   const [errors, setErrors] = useState(null);

   // Define dispatch to dispatch actions
   const dispatch = useDispatch();

   // Handle closing error alert
   const closeError = () => {
      setErrors(null);
   };

   // Access token from state
   const token = useSelector((state) => state.auth.token);

   // history hook to redirect user
   let history = useHistory();

   // usetoast hook to toast on successful request
   const toast = useToast();

   // Loading state from form submission
   const [isLoading, setIsLoading] = useState(false);

   // Add Transaction Handler
   const addTransaction = () => {
      setIsLoading(true);

      const body = { bankId: bankAccount._id, ...userInput };

      axios
         .post("/api/transactions/create", body, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            setIsLoading(false);
            dispatch(updateBankAccount(res.data));
            setBankAccount(res.data);
            toast({
               title: "Transaction Added",
               status: "success",
               duration: 7000,
               isClosable: true,
            });
            onClose();
         })
         .catch((err) => {
            if (err.response.status !== 401) {
               setIsLoading(false);
               setErrors(Object.values(err.response.data.errors));
            } else {
               alert("Session expired. Please login again");
               localStorage.removeItem("token");
               dispatch(setUser(null));
               history.push("/login");
            }
         });
   };

   return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Add Transaction</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
               <ErrorAlert errors={errors} closeHandler={closeError} />
               <FormControl mt={4}>
                  <FormLabel>Amount</FormLabel>
                  <InputGroup>
                     <InputLeftAddon children="$" />
                     <Input
                        placeholder="Amount"
                        value={userInput.amount}
                        id="amount"
                        onChange={inputOnChange}
                        type="number"
                     />
                     <InputRightAddon children=".00" />
                  </InputGroup>
               </FormControl>
               <FormControl mt={4}>
                  <FormLabel>Type</FormLabel>
                  <Select
                     placeholder="Type"
                     value={userInput.type}
                     onChange={inputOnChange}
                     id="type"
                  >
                     <option value="deposit">Deposit</option>
                     <option value="withdrawal">Withdrawal</option>
                     <option value="point of sale">Point of Sale</option>
                  </Select>
               </FormControl>
               <FormControl mt={4}>
                  <FormLabel>Memo</FormLabel>
                  <Input
                     placeholder="Memo"
                     value={userInput.memo}
                     onChange={inputOnChange}
                     id="memo"
                  />
               </FormControl>
            </ModalBody>
            <ModalFooter>
               <Button
                  colorScheme="green"
                  mr={3}
                  onClick={addTransaction}
                  isLoading={isLoading}
                  loadingText="Adding Transaction"
               >
                  Add Transaction
               </Button>
               <Button colorScheme="red" onClick={onClose}>
                  Cancel
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};

export default AddTransaction;
