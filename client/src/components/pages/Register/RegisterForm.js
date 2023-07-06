// Chakra UI Components
import {
   Button,
   chakra,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   InputRightElement,
} from "@chakra-ui/react";

// useState Hook
import { useState } from "react";

// useDispatch hook
import { useDispatch } from "react-redux";

// Auth Slice Actions
import { setUser, setErrors } from "../../../slicers/authSlice";

// Import axios
import axios from "axios";

// useHistory hook
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
   // Redux Dispatch
   const dispatch = useDispatch();

   // Loading state from form submission
   const [isLoading, setIsLoading] = useState(false);

   // Whether the password should be shown or not
   const [passwordShow, setPasswordShow] = useState(false);

   // Hande click of show/hide button for password input
   const handlePasswordClick = () => setPasswordShow(!passwordShow);

   // Store input margin
   const inputMargin = 7;

   // Store user's input
   const [userInput, setUserInput] = useState({
      name: "",
      email: "",
      password: "",
   });

   // Handle input change
   const handleInputChange = (e) => {
      setUserInput({ ...userInput, [e.target.id]: e.target.value });
   };

   // History
   let history = useHistory();

   // Handle Form Submission
   const handleFormSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      // Api Request
      axios
         .post("/api/auth/register", userInput)
         .then((res) => {
            setIsLoading(false);
            dispatch(setUser(res.data.token));
            localStorage.setItem("token", res.data.token);
            history.push("/");
         })
         .catch((err) => {
            setIsLoading(false);
            dispatch(setErrors(Object.values(err.response.data.errors)));
         });
   };

   return (
      <chakra.form py={5} w="85%" m="auto" onSubmit={handleFormSubmit}>
         <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
               placeholder="Name"
               size="sm"
               focusBorderColor="green.400"
               id="name"
               value={userInput.name}
               onChange={handleInputChange}
               borderRadius={8}
            />
         </FormControl>
         <FormControl mt={inputMargin}>
            <FormLabel>Email</FormLabel>
            <Input
               placeholder="Email"
               type="email"
               size="sm"
               focusBorderColor="green.400"
               id="email"
               value={userInput.email}
               onChange={handleInputChange}
               borderRadius={8}
            />
         </FormControl>
         <FormControl mt={inputMargin}>
            <FormLabel>Password</FormLabel>
            <InputGroup size="sm">
               <Input
                  pr="4.5rem"
                  type={passwordShow ? "text" : "password"}
                  placeholder="Password"
                  focusBorderColor="green.400"
                  id="password"
                  value={userInput.password}
                  onChange={handleInputChange}
                  borderRadius={8}
               />
               <InputRightElement width="4.5rem">
                  <Button h="1.25rem" size="xs" onClick={handlePasswordClick}>
                     {passwordShow ? "Hide" : "Show"}
                  </Button>
               </InputRightElement>
            </InputGroup>
         </FormControl>
         <Button
            colorScheme="green"
            mt={inputMargin + 2}
            type="submit"
            isLoading={isLoading}
            loadingText="Registering"
         >
            Register
         </Button>
      </chakra.form>
   );
};

export default RegisterForm;
