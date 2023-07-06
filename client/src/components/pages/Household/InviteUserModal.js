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

const InviteUserModal = () => {
   const [userEmail, setUserEmail] = useState("");

   const [isLoading, setIsLoading] = useState(false);

   const [errors, setErrors] = useState(null);

   const { isOpen, onOpen, onClose } = useDisclosure();

   const household = useSelector((state) => state.household.household);

   const token = useSelector((state) => state.auth.token);

   const history = useHistory();

   const dispatch = useDispatch();

   const toast = useToast();

   const inviteUserHandler = async () => {
      setIsLoading(true);
      const emailRegex =
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (emailRegex.test(userEmail.toLowerCase())) {
         try {
            // eslint-disable-next-line
            const res = await axios.post(
               `/api/households/invite/${household._id}`,
               { userEmail },
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            );

            setIsLoading(false);

            toast({
               title: "User Invited.",
               status: "success",
               duration: 7000,
               isClosable: true,
            });

            onClose();
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
      } else {
         setIsLoading(false);
         setErrors(["You must enter an email adress"]);
      }
   };

   return (
      <>
         <Button colorScheme="green" onClick={onOpen}>
            Invite User
         </Button>
         <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Invite User To Household</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <ErrorAlert
                     errors={errors}
                     closeHandler={() => setErrors(null)}
                  />
                  <FormControl mt={4}>
                     <FormLabel>User's Email</FormLabel>
                     <Input
                        placeholder="User's Email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                     />
                  </FormControl>
               </ModalBody>
               <ModalFooter>
                  <Button
                     colorScheme="green"
                     mr={3}
                     isLoading={isLoading}
                     loadingText="Inviting User"
                     onClick={inviteUserHandler}
                  >
                     Invite User
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

export default InviteUserModal;
