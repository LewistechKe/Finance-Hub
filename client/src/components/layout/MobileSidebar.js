// Chakra Ui Components
import {
   Drawer,
   DrawerBody,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
   LinkBox,
   LinkOverlay,
   VStack,
   Text,
   DrawerFooter,
   Button,
} from "@chakra-ui/react";

// UseSelector hook to access store
import { useSelector } from "react-redux";

// Navlink From React Router
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setUser } from "../../slicers/authSlice";

const MobileSidebar = ({ isOpen, onClose, page }) => {
   const user = useSelector((state) => state.auth.user);
   let links =
      user.role === "personal"
         ? [
              { displayText: "HOME", route: "/", page: "home" },
              {
                 displayText: "BANK ACCOUNTS",
                 route: "/bank-accounts",
                 page: "bankaccount",
              },
           ]
         : [
              { displayText: "HOME", route: "/", page: "home" },
              {
                 displayText: "BANK ACCOUNTS",
                 route: "/bank-accounts",
                 page: "bankaccount",
              },
              {
                 displayText: "HOUSEHOLD",
                 route: "/household",
                 page: "household",
              },
           ];

   const dispatch = useDispatch();

   const history = useHistory();

   const logoutHandler = () => {
      localStorage.removeItem("token");
      dispatch(setUser(null));
      history.push("/login");
   };

   return (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
         <DrawerOverlay />
         <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Navigation</DrawerHeader>

            <DrawerBody>
               <VStack>
                  {links.map((link) => (
                     <LinkBox
                        w="100%"
                        as="div"
                        h="40px"
                        bg={page === link.page ? "green.50" : "white"}
                        d="flex"
                        alignItems="center"
                        pl={3}
                        transition="background .25s ease-in-out"
                        key={link.page}
                        sx={
                           page !== link.page
                              ? {
                                   _hover: {
                                      background: "gray.100",
                                      ".sidebar-text": {
                                         color: "gray.700",
                                      },
                                   },
                                }
                              : ""
                        }
                     >
                        <Text
                           fontSize="sm"
                           fontWeight="bold"
                           color={page === link.page ? "green.300" : "gray.600"}
                           className="sidebar-text"
                        >
                           <LinkOverlay as={NavLink} to={link.route}>
                              {link.displayText}
                           </LinkOverlay>
                        </Text>
                     </LinkBox>
                  ))}
               </VStack>
            </DrawerBody>
            <DrawerFooter>
               <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={logoutHandler}
                  position="absolute"
                  left={6}
                  bottom={6}
               >
                  Logout
               </Button>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
   );
};

export default MobileSidebar;
