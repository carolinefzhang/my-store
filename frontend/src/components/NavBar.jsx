import { Container, Flex, HStack, Text, Button, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiPlus, FiUser } from "react-icons/fi";
import { ColorModeButton } from "./ui/color-mode";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, accessToken, isAuthenticated, isLoading } = useAuth();
  console.log(user);
  isAuthenticated && console.log(accessToken)

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={4}
        bg="white"
        boxShadow="md"
      >
        <ChakraLink as={Link} to="/" _hover={{ textDecoration: "none", opacity: 0.85 }}>
          <Text
            fontSize={["2xl", "3xl", "4xl"]}
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            bgImage="linear-gradient({colors.teal.500}, {colors.blue.500}, {colors.purple.700})"
            bgClip="text"
            letterSpacing="widest"
          >
            MERN Store
          </Text>
        </ChakraLink>
        <HStack spacing={2} alignItems={"center"}>
          {isAuthenticated && (
            <>
              <Link to={"/profile"}>
                <Button>
                  <FiUser fontSize={20} />
                </Button>
              </Link>
              <Link to={"/create"}>
                <Button>
                  <FiPlus fontSize={20} />
                </Button>
              </Link>
            </>
          )}{" "}
          <ColorModeButton />
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
