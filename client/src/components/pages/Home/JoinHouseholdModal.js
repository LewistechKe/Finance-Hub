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
   useToast,
} from "@chakra-ui/react";

// Axios for http requests
import axios from "axios";

// useState Hook
import { useState } from "react";

// useSelector and useDispatch Hook for redux
import { useDispatch, useSelector } from "react-redux";

// useHistory Hook
import { useHistory } from "react-router-dom";

// Redux Actions
import { setUser } from "../../../slicers/authSlice";

// Components
import ErrorAlert from "../../alerts/ErrorAlert";

const JoinHouseholdModal = ({ isOpen, onClose }) => {
   const [invitationalCode, setInvitationalCode] = useState("");

   const [isLoading, setIsLoading] = useState(false);

   const [errors, setErrors] = useState(null);

   // Access token from state
   const token = useSelector((state) => state.auth.token);

   // usetoast hook to toast on successful request
   const toast = useToast();

   const dispatch = useDispatch();

   const history = useHistory();

   const joinHouseholdHandler = () => {
      setIsLoading(true);

      if (invitationalCode !== "") {
         axios
            .put(`/api/households/join/${invitationalCode}`, false, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            })
            .then((res) => {
               setIsLoading(false);
               toast({
                  title: "Household Joined.",
                  description:
                     "You may need to log out and in for changes to apply.",
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
      } else {
         setIsLoading(false);
         setErrors(["You must enter an invitational code."]);
      }
   };

   return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Join Household</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
               <ErrorAlert
                  errors={errors}
                  closeHandler={() => setErrors(null)}
               />
               <FormControl mt={4}>
                  <FormLabel>Invitional Code</FormLabel>
                  <Input
                     placeholder="Invitation Code"
                     value={invitationalCode}
                     onChange={(e) => setInvitationalCode(e.target.value)}
                     id="name"
                  />
               </FormControl>
            </ModalBody>
            <ModalFooter>
               <Button
                  colorScheme="green"
                  mr={3}
                  isLoading={isLoading}
                  loadingText="Joining Household"
                  onClick={joinHouseholdHandler}
               >
                  Join Household
               </Button>
               <Button colorScheme="red" onClick={onClose}>
                  Cancel
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};

export default JoinHouseholdModal;
