// Chakra Ui Components
import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogContent,
   AlertDialogOverlay,
   Button,
   useToast,
   useDisclosure,
} from "@chakra-ui/react";

// useSelector and useDispatch Hook
import { useDispatch, useSelector } from "react-redux";

// Axios
import axios from "axios";

// Redux Actions
import { setHousehold } from "../../../slicers/householdSlice";
import { changeRole } from "../../../slicers/authSlice";

// History hook
import { useHistory } from "react-router-dom";

const DeleteHouseholdDialog = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const household = useSelector((state) => state.household.household);

   const token = useSelector((state) => state.auth.token);

   const toast = useToast();

   const dispatch = useDispatch();

   const history = useHistory();

   const deleteHousehold = async () => {
      try {
         // eslint-disable-next-line
         const res = await axios.delete(`/api/households/${household._id}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         dispatch(setHousehold(null));
         dispatch(changeRole("personal"));
         history.push("/");
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
         <Button
            colorScheme="red"
            ml={{ base: 0, sm: 6 }}
            mt={{ base: 4, sm: 0 }}
            onClick={onOpen}
         >
            Delete Household
         </Button>
         <AlertDialog isOpen={isOpen} onClose={onClose}>
            {household ? (
               <AlertDialogOverlay>
                  <AlertDialogContent>
                     <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Your Household
                     </AlertDialogHeader>

                     <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                     </AlertDialogBody>

                     <AlertDialogFooter>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button
                           colorScheme="red"
                           ml={3}
                           onClick={deleteHousehold}
                        >
                           Delete
                        </Button>
                     </AlertDialogFooter>
                  </AlertDialogContent>
               </AlertDialogOverlay>
            ) : (
               ""
            )}
         </AlertDialog>
      </>
   );
};

export default DeleteHouseholdDialog;
