import React, { useState, useEffect } from "react";
import { Container, VStack, SimpleGrid, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const { login, accessToken } = useAuth();
  const LoginButton = () => {   
    return <Button onClick={() => login()}>Log In</Button>;
  };

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>
        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No product found{" "}
            {isAuthenticated && (
              <Link to={"/create"}>
                <Text
                  as="span"
                  color="blue.500"
                  _hover={{ textDecoration: "underline" }}
                >
                  Create one
                </Text>
              </Link>
            )}
          </Text>
        )}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="40px" w={"full"}>
          {products &&
            products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
        </SimpleGrid>
        {!isAuthenticated && (
          <>
            <Text
              fontSize="xl"
              textAlign={"center"}
              fontWeight="bold"
              color="gray.500"
            >
              Please log in to add products
            </Text>
            <LoginButton />
          </>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
