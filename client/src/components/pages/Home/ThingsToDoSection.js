// Chakra UI Components
import {
   Box,
   Flex,
   Heading,
   LinkBox,
   LinkOverlay,
   SimpleGrid,
   useDisclosure,
} from "@chakra-ui/react";

// Icons
import { ViewIcon, ArrowForwardIcon, AddIcon } from "@chakra-ui/icons";

// NavLink from react router dom
import { NavLink } from "react-router-dom";

// useSelector hook to access state
import { useSelector } from "react-redux";
import JoinHouseholdModal from "./JoinHouseholdModal";

const ThingsToDoSection = () => {
   const userRole = useSelector((state) => state.auth.user.role);

   const hasHousehold = userRole !== "personal";

   const linkBoxProps = {
      as: "div",
      w: "100%",
      minH: "100px",
      borderRadius: 6,
      sx: { _hover: { background: "gray.50" } },
      transition: "background .3s ease-in-out",
      border: "1px",
      borderColor: "gray.100",
      cursor: "pointer",
   };

   const { isOpen, onOpen, onClose } = useDisclosure();

   const handleHouseholdClick = () => {
      if (!hasHousehold) {
         onOpen();
      }
   };

   return (
      <>
         <Box
            w="100%"
            h={{ base: "55vh", md: "100%" }}
            bg="white"
            boxShadow="sm"
            p={8}
            borderRadius={8}
         >
            <Heading as="h3" size="md" color="gray.600">
               Things To Do
            </Heading>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mt={8}>
               <LinkBox {...linkBoxProps}>
                  <Flex alignItems="center" justifyContent="center" h="100%">
                     <ViewIcon color="green.400" w={5} height={5} mr={5} />
                     <Heading as="h5" size="md" color="green.400">
                        <LinkOverlay as={NavLink} to="/bank-accounts">
                           View Bank Accounts
                        </LinkOverlay>
                     </Heading>
                  </Flex>
               </LinkBox>
               <LinkBox {...linkBoxProps} onClick={handleHouseholdClick}>
                  <Flex alignItems="center" justifyContent="center" h="100%">
                     <ArrowForwardIcon
                        color="green.400"
                        w={5}
                        height={5}
                        mr={5}
                     />
                     <Heading as="h5" size="md" color="green.400">
                        {hasHousehold ? (
                           <>
                              <LinkOverlay as={NavLink} to="/household">
                                 View Household
                              </LinkOverlay>
                           </>
                        ) : (
                           "Join Household"
                        )}
                     </Heading>
                  </Flex>
               </LinkBox>

               {hasHousehold ? (
                  ""
               ) : (
                  <LinkBox {...linkBoxProps}>
                     <Flex alignItems="center" justifyContent="center" h="100%">
                        <AddIcon color="green.400" w={5} height={5} mr={5} />
                        <Heading as="h5" size="md" color="green.400">
                           <LinkOverlay as={NavLink} to="/household/create">
                              Create Household
                           </LinkOverlay>
                        </Heading>
                     </Flex>
                  </LinkBox>
               )}
            </SimpleGrid>
         </Box>
         <JoinHouseholdModal isOpen={isOpen} onClose={onClose} />
      </>
   );
};

export default ThingsToDoSection;
