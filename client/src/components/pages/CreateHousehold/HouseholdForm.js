// Chakra UI Components
import {
   Box,
   Heading,
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

// Access Redux State
import { useDispatch, useSelector } from "react-redux";

// useHistory hook
import { useHistory } from "react-router-dom";

// Redux Actions
import { setUser } from "../../../slicers/authSlice";

// Components
import ErrorAlert from "../../alerts/ErrorAlert";

const HouseholdForm = () => {
   const [userInput, setUserInput] = useState({ name: "", greeting: "" });

   const handleChange = (e) => {
      setUserInput({ ...userInput, [e.target.id]: e.target.value });
   };

   const token = useSelector((state) => state.auth.token);

   const [isLoading, setIsLoading] = useState(false);

   const toast = useToast();

   const [errors, setErrors] = useState(null);

   const history = useHistory();

   const dispatch = useDispatch();

   const createHouseholdHandler = () => {
      setIsLoading(true);
      axios
         .post(`/api/households/create/`, userInput, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            setIsLoading(false);
            toast({
               title: "Household created.",
               description:
                  "You may need to log out and in for changes to apply.",
               status: "success",
               duration: 7000,
               isClosable: true,
            });
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
      <Box w="100%" h="100%" bg="white" boxShadow="sm" p={8} borderRadius={8}>
         <Heading as="h3" size="md" color="gray.600">
            Create Household
         </Heading>
         <ErrorAlert errors={errors} closeHandler={() => setErrors(null)} />
         <FormControl mt={8}>
            <FormLabel>Name</FormLabel>
            <Input
               placeholder="Name"
               value={userInput.name}
               onChange={handleChange}
               id="name"
               w="60%"
            />
         </FormControl>
         <FormControl mt={6}>
            <FormLabel>Greeting</FormLabel>
            <Input
               placeholder="Greeting"
               value={userInput.greeting}
               onChange={handleChange}
               id="greeting"
               w="60%"
            />
         </FormControl>
         <Button
            colorScheme="green"
            mt={6}
            isLoading={isLoading}
            loadingText="Creating Household"
            onClick={createHouseholdHandler}
         >
            Create Household
         </Button>
      </Box>
   );
};

export default HouseholdForm;
