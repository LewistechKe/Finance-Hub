// Chakra UI Components
import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogContent,
   AlertDialogOverlay,
   Button,
   useToast,
} from "@chakra-ui/react";

// useSelector and useDispatch Hook
import { useDispatch, useSelector } from "react-redux";

// Axios
import axios from "axios";

// Redux Actions
import { removeBankAccount } from "../../../slicers/bankAccountsSlice";

const DeleteAccountDialog = ({ isOpen, onClose, bankAccount }) => {
   const token = useSelector((state) => state.auth.token);

   const toast = useToast();

   const dispatch = useDispatch();

   const deleteBankAccount = async () => {
      try {
         const res = await axios.delete(
            `/api/bankaccounts/${bankAccount._id}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );

         toast({
            title: "Account Deleted",
            status: "success",
            duration: 7000,
            isClosable: true,
         });

         dispatch(removeBankAccount(res.data._id));
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
      <AlertDialog isOpen={isOpen} onClose={onClose}>
         {bankAccount ? (
            <AlertDialogOverlay>
               <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                     Delete Account Named '{bankAccount.name}'
                  </AlertDialogHeader>

                  <AlertDialogBody>
                     Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                     <Button onClick={onClose}>Cancel</Button>
                     <Button
                        colorScheme="red"
                        ml={3}
                        onClick={deleteBankAccount}
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
   );
};

export default DeleteAccountDialog;
