// Chakra UI Components
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
   useToast,
} from "@chakra-ui/react";

// useState Hook
import { useState } from "react";

// Components
import ErrorAlert from "../../alerts/ErrorAlert";

// Import Axios
import axios from "axios";

// Redux hooks
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { addBankAccount } from "../../../slicers/bankAccountsSlice";
import { setUser } from "../../../slicers/authSlice";

// UseHistory hook to redirect user
import { useHistory } from "react-router-dom";

const CreateBankAccount = ({ modalIsOpen, modalOnClose }) => {
   // Blank user input to be used when resetting input
   const blankInput = {
      name: "",
      type: "",
      balance: 0,
      lowBalanceAlert: 0,
   };

   // Loading state from form submission
   const [isLoading, setIsLoading] = useState(false);

   // Control user input form
   const [userInput, setUserInput] = useState(blankInput);

   // Handle input change event to update state
   const inputOnChange = (e) => {
      setUserInput({ ...userInput, [e.target.id]: e.target.value });
   };

   // Store errors from axios request
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

   // Create Bank Account Handler called when create button is clicked
   const createBankAccountHandler = () => {
      setIsLoading(true);

      axios
         .post("/api/bankaccounts/create", userInput, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            setIsLoading(false);
            dispatch(addBankAccount(res.data));
            toast({
               title: "Bank Account Created.",
               description: "Your account has been created.",
               status: "success",
               duration: 7000,
               isClosable: true,
            });
            setUserInput(blankInput);
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
      <Modal isOpen={modalIsOpen} onClose={modalOnClose} isCentered size="lg">
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Create Bank Account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
               <ErrorAlert errors={errors} closeHandler={closeError} />
               <FormControl mt={4}>
                  <FormLabel>Name</FormLabel>
                  <Input
                     placeholder="Name"
                     value={userInput.name}
                     onChange={inputOnChange}
                     id="name"
                  />
               </FormControl>
               <FormControl mt={4}>
                  <FormLabel>Type</FormLabel>
                  <Select
                     placeholder="Type"
                     value={userInput.type}
                     onChange={inputOnChange}
                     id="type"
                  >
                     <option value="checking">Checking</option>
                     <option value="savings">Savings</option>
                     <option value="credit">Credit</option>
                  </Select>
               </FormControl>
               <FormControl mt={4}>
                  <FormLabel>Balance</FormLabel>
                  <Input
                     placeholder="Balance"
                     value={userInput.balance}
                     onChange={inputOnChange}
                     id="balance"
                     type="number"
                  />
               </FormControl>
               <FormControl mt={4}>
                  <FormLabel>Low Balance Alert</FormLabel>
                  <Input
                     placeholder="Low Balance Alert"
                     value={userInput.lowBalanceAlert}
                     onChange={inputOnChange}
                     id="lowBalanceAlert"
                     type="number"
                  />
               </FormControl>
            </ModalBody>
            <ModalFooter>
               <Button
                  colorScheme="green"
                  mr={3}
                  isLoading={isLoading}
                  loadingText="Creating Account"
                  onClick={createBankAccountHandler}
               >
                  Create Account
               </Button>
               <Button colorScheme="red" onClick={modalOnClose}>
                  Cancel
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};

export default CreateBankAccount;
