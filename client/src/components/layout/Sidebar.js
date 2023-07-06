import {
   Box,
   Flex,
   Heading,
   LinkBox,
   LinkOverlay,
   VStack,
   Text,
} from "@chakra-ui/layout";
import { CheckIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = ({ page }) => {
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

   return (
      <Box
         w="100%"
         h="100%"
         bg="white"
         boxShadow="sm"
         p={8}
         borderRadius={8}
         display={{ base: "none", md: "block" }}
      >
         <Flex mb={8}>
            <Box
               borderRadius="50%"
               bg="green.400"
               w="27.5px"
               h="27.5px"
               d="flex"
               justifyContent="center"
               alignItems="center"
            >
               <CheckIcon color="white" />
            </Box>
            <Heading
               as="h3"
               size="md"
               ml={4}
               color="gray.600"
               fontWeight="semibold"
            >
               Welcome, {user.name}!
            </Heading>
         </Flex>
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
      </Box>
   );
};

export default Sidebar;
