// Chakra UI Components
import { Box, Heading, Text } from "@chakra-ui/react";

const WhatIsAHousehold = () => {
   return (
      <Box w="100%" h="100%" bg="white" boxShadow="sm" p={8} borderRadius={8}>
         <Heading as="h3" size="md" color="gray.600">
            What is a household?
         </Heading>
         <Text mt={6} fontSize={15} color="gray.600">
            Creating a household allows you to link bank accounts to it and then
            view transactions for the whole household rather than just a
            specific account. You can also create a budget within a household
            for different areas such as groceries and tech.
         </Text>

         <Text mt={4} fontSize={15} color="gray.600">
            You can also invite others to your household and they can link their
            bank accounts to it. If you create a household and decide you don't
            need it anymore, you can always delete it and continue using your
            regular bank accounts.
         </Text>
      </Box>
   );
};

export default WhatIsAHousehold;
