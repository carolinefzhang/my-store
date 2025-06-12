import React from "react";
import { useAuth } from "../context/AuthContext";
import { Container, VStack, Box, Heading, Button } from "@chakra-ui/react";
import { useColorMode } from "../components/ui/color-mode";

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Container maxW={"container.sm"}>
        <VStack spacing={8}>
          <Heading as={"h1"} size={"2xl"} textAlign={"center"} mt={8} mb={8}>
            Profile
          </Heading>
          <Box
            w={"100%"}
            bg={useColorMode("white", "gray.800")}
            p={6}
            rounded={"lg"}
            shadow={"md"}
          >
            <VStack spacing={4}>
              <img src={user.picture} alt={user.name} />
              <h2>Username: {user.name}</h2>
              <p>Email: {user.email}</p>
              <Button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    )
  );
};

export default ProfilePage;
