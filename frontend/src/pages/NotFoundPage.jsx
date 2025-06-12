import { Link } from "react-router-dom";
import { Container, Text } from "@chakra-ui/react";

const NotFoundPage = () => {
  return (
    <Container maxW={"container.sm"}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-primary">
        Go Home
      </Link>
      <Text
        fontSize="5xl"
        fontWeight="bold"
        bgGradient="linear(to-r, teal.500, blue.700, purple.700)"
        bgClip="text"
      >
        MERN Store
      </Text>
    </Container>
  );
};

export default NotFoundPage;
