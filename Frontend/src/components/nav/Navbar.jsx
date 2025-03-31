import { Box, Flex, Text, Link } from "@chakra-ui/react";
import AboutPTI from "./AboutPTI";
import Contact from "./Contact";

const Navbar = () => {
  return (
    <header>
      <Box bg="gray.800" p={4} width="100%">
        <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
          <Text fontSize="2xl" color="white" fontWeight="bold">
            NBA Visualization
          </Text>
          <Flex gap={6}>
            <Link
              color="white"
              fontSize="lg"
              _hover={{ textDecoration: "underline" }}
              onClick={() => {
                /* Add your navigation logic here */
              }}
            >
              <AboutPTI />
            </Link>
            <Link
              color="white"
              fontSize="lg"
              _hover={{ textDecoration: "underline" }}
              onClick={() => {
                /* Add your navigation logic here */
              }}
            >
              <Contact />
            </Link>
          </Flex>
        </Flex>
      </Box>
    </header>
  );
};

export default Navbar;
