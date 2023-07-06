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
   Select,
   useToast,
   useDisclosure,
} from "@chakra-ui/react";

// Axios for http requests
import axios from "axios";

// useState Hook
import { useState } from "react";

// useSelector Hook
import { useSelector, useDispatch } from "react-redux";

// History Hook
import { useHistory } from "react-router";

// Components
import ErrorAlert from "../../alerts/ErrorAlert";

// Redux Actions
import { setUser } from "../../../slicers/authSlice";

// Api Requests
import {
   fetchBankAccounts,
   fetchHouseholdData,
} from "../../../util/apiRequests";

const LinkBankAccount = () => {
   const user = useSelector((state) => state.auth.user);

   const bankAccounts = useSelector((state) => {
      return state.bankAccounts.bankAccounts.filter(
         (account) => account.userId === user._id && account.linkedTo === ""
      );
   });
   const [bankAccount, setBankAccount] = useState("");

   const [isLoading, setIsLoading] = useState(false);

   const [errors, setErrors] = useState(null);

   const { isOpen, onOpen, onClose } = useDisclosure();

   const household = useSelector((state) => state.household.household);

   const token = useSelector((state) => state.auth.token);

   const history = useHistory();

   const dispatch = useDispatch();

   const toast = useToast();

   const linkBankAccountHandler = async () => {
      setIsLoading(true);

      if (bankAccount === "") {
         setIsLoading(false);
         setErrors(["You must select a bank account"]);
      } else {
         try {
            // eslint-disable-next-line
            const res = await axios.put(
               `/api/bankaccounts/${bankAccount}/link`,
               { householdId: household._id },
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            );

            setIsLoading(false);

            toast({
               title: "Bank Account Linked.",
               status: "success",
               duration: 7000,
               isClosable: true,
            });

            onClose();

            fetchHouseholdData(token, dispatch, history);
            fetchBankAccounts(token, dispatch, history);
         } catch (err) {
            if (err.response.status !== 401) {
               setIsLoading(false);
               setErrors(Object.values(err.response.data.errors));
            } else {
               alert("Session expired. Please login again");
               localStorage.removeItem("token");
               dispatch(setUser(null));
               history.push("/login");
            }
         }
      }
   };

   return (
      <>
         <Button
            colorScheme="green"
            ml={{ base: 0, sm: 6 }}
            mt={{ base: 4, sm: 0 }}
            onClick={onOpen}
         >
            Link Bank Account
         </Button>
         <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Link Bank Account To Household</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <ErrorAlert
                     errors={errors}
                     closeHandler={() => setErrors(null)}
                  />
                  <FormControl mt={4}>
                     <FormLabel>Bank Account</FormLabel>
                     <Select
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                     >
                        <option disabled>Select an option</option>
                        {bankAccounts
                           ? bankAccounts.map((account) => {
                                return (
                                   <option
                                      value={account._id}
                                      key={account._id}
                                   >
                                      {account.name}
                                   </option>
                                );
                             })
                           : ""}
                     </Select>
                  </FormControl>
               </ModalBody>
               <ModalFooter>
                  <Button
                     colorScheme="green"
                     mr={3}
                     isLoading={isLoading}
                     loadingText="Linking Bank Account"
                     onClick={linkBankAccountHandler}
                  >
                     Link Bank Account
                  </Button>
                  <Button colorScheme="red" onClick={onClose}>
                     Cancel
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default LinkBankAccount;
