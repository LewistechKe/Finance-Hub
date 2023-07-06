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

// useSelector Hook
import { useSelector } from "react-redux";

// Axios
import axios from "axios";

const DeleteTransactionDialog = ({
   isOpen,
   onClose,
   transaction,
   setBankAccount,
   bankAccountID,
}) => {
   const token = useSelector((state) => state.auth.token);

   const toast = useToast();

   const deleteTransaction = async () => {
      const body = { bankId: bankAccountID };

      try {
         const res = await axios.delete(
            `/api/transactions/${transaction._id}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
               data: {
                  ...body,
               },
            }
         );

         toast({
            title: "Transaction Deleted",
            status: "success",
            duration: 7000,
            isClosable: true,
         });

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
      <AlertDialog isOpen={isOpen} onClose={onClose}>
         <AlertDialogOverlay>
            <AlertDialogContent>
               <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Transaction
               </AlertDialogHeader>

               <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
               </AlertDialogBody>

               <AlertDialogFooter>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button colorScheme="red" ml={3} onClick={deleteTransaction}>
                     Delete
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialogOverlay>
      </AlertDialog>
   );
};

export default DeleteTransactionDialog;
