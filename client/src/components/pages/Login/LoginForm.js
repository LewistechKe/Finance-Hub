// Chakra UI Components
import {
   Button,
   chakra,
   Flex,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   InputRightElement,
} from "@chakra-ui/react";

// useState Hook
import { useEffect, useState } from "react";

// useDispatch hook
import { useDispatch } from "react-redux";

// Auth Slice Actions
import { setUser, setErrors } from "../../../slicers/authSlice";

// Import axios
import axios from "axios";

// useHistory hook
import { useHistory } from "react-router-dom";

const LoginForm = () => {
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
      email: "",
      password: "",
   });

   // Handle input change
   const handleInputChange = (e) => {
      setUserInput({ ...userInput, [e.target.id]: e.target.value });
   };

   // History
   let history = useHistory();

   // Login API Request
   const loginRequest = () => {
      axios
         .post("/api/auth/login", userInput)
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

   // Handle Form Submission
   const handleFormSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      loginRequest();
   };

   // Handle Login As Demo User Button Click
   const loginAsDemoUser = () => {
      setIsLoading(true);
      setUserInput({
         email: "demo@gmail.com",
         password: "demo1234",
      });
   };

   useEffect(() => {
      if (isLoading) {
         loginRequest();
      }
      // eslint-disable-next-line
   }, [userInput]);

   return (
      <chakra.form py={5} w="85%" m="auto" onSubmit={handleFormSubmit}>
         <FormControl>
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
         <Flex
            mt={inputMargin + 2}
            justifyContent="center"
            alignItems="center"
            flexDirection={{ base: "column", lg: "row" }}
         >
            <Button
               colorScheme="green"
               type="submit"
               isLoading={isLoading}
               loadingText="Logging In"
               width={{ base: "100%", lg: "initial" }}
            >
               Login
            </Button>
            <chakra.span
               color="gray.600"
               mx={6}
               display={{ base: "none", lg: "block" }}
            >
               OR
            </chakra.span>
            <Button
               colorScheme="green"
               variant="outline"
               onClick={loginAsDemoUser}
               isLoading={isLoading}
               loadingText="Logging In"
               mt={{ base: inputMargin, lg: 0 }}
               width={{ base: "100%", lg: "initial" }}
            >
               Login As Demo User
            </Button>
         </Flex>
      </chakra.form>
   );
};

export default LoginForm;
