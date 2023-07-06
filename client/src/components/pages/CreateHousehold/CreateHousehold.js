// Chakra UI Components
import { Container, Grid, GridItem } from "@chakra-ui/react";

// Helmet to Access Head
import { Helmet } from "react-helmet";

// Page Components
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import HouseholdForm from "./HouseholdForm";
import WhatIsAHousehold from "./WhatIsAHousehold";

const CreateHousehold = () => {
   return (
      <>
         <Helmet>
            <title>Financial Portal - Create Household</title>
         </Helmet>
         <>
            <Navbar page="" />
            <Container maxW="container.xl" h="75vh" mt={16}>
               <Grid
                  h="100%"
                  templateRows="repeat(5, 1fr)"
                  templateColumns="repeat(8, 1fr)"
                  gap={4}
               >
                  <GridItem rowSpan={5} colSpan={2}>
                     <Sidebar page="" />
                  </GridItem>
                  <GridItem colSpan={6} rowSpan={1}>
                     <WhatIsAHousehold />
                  </GridItem>
                  <GridItem colSpan={6} rowSpan={4}>
                     <HouseholdForm />
                  </GridItem>
               </Grid>
            </Container>
         </>
      </>
   );
};

export default CreateHousehold;
