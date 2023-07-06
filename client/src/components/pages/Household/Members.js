// Chakra Ui Components
import { Stat, StatLabel, StatNumber, Box } from "@chakra-ui/react";

// useSelector Hook
import { useSelector } from "react-redux";

const Members = () => {
   const household = useSelector((state) => state.household.household);

   return (
      <Box w="100%" h="100%" bg="white" boxShadow="sm" p={8} borderRadius={8}>
         <Stat>
            <StatLabel>Household Members</StatLabel>
            {household ? (
               <StatNumber color="gray.600" fontSize={32}>
                  {household.members.length}
               </StatNumber>
            ) : (
               <StatNumber>...</StatNumber>
            )}
         </Stat>
      </Box>
   );
};

export default Members;
