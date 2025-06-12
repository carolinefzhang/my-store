import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";

const LoginPage = () => {
  const { login, isLoading } = useAuth();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-br, teal.400, blue.500)"
    >
      <VStack
        spacing={8}
        p={10}
        bg="whiteAlpha.900"
        rounded="xl"
        shadow="2xl"
        maxW="sm"
        w="full"
        align="center"
      >
        <Heading size="lg" color="teal.600">
          Welcome to MERN Store
        </Heading>
        <Text color="gray.600" fontSize="md" textAlign="center">
          Please log in to continue to your dashboard.
        </Text>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={login}
          isLoading={isLoading}
          loadingText="Redirecting..."
          w="full"
        >
          Log In with Auth0
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
