import {
   Box,
   Button,
   chakra,
   Container,
   Heading,
   useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setUser } from "../../slicers/authSlice";
import MobileSidebar from "./MobileSidebar";

const Navbar = ({ page }) => {
   const dispatch = useDispatch();

   const history = useHistory();

   const logoutHandler = () => {
      localStorage.removeItem("token");
      dispatch(setUser(null));
      history.push("/login");
   };

   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
      <Box w="100vw" h="80px" bgColor="white" boxShadow="sm">
         <Container
            maxW="container.xl"
            h="100%"
            d="flex"
            alignItems="center"
            justifyContent="space-between"
         >
            <Heading as="h2" size="lg">
               Financial <chakra.span color="green.400">Portal</chakra.span>
            </Heading>
            <Button
               colorScheme="red"
               variant="outline"
               onClick={logoutHandler}
               display={{ base: "none", md: "block" }}
            >
               Logout
            </Button>
            <HamburgerIcon
               display={{ base: "block", md: "none" }}
               color="grey.700"
               w={6}
               h={6}
               onClick={onOpen}
            />
            <MobileSidebar isOpen={isOpen} onClose={onClose} page={page} />
         </Container>
      </Box>
   );
};

export default Navbar;
