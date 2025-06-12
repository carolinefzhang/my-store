import { Link } from "react-router-dom";
import { Alert, Container } from "@chakra-ui/react";

const LogoutSuccessPage = () => {
  return (
    <Container maxW={"container.sm"}>
      <Alert.Root status="info">
        <Alert.Indicator />
        <Alert.Title>You have successfully logged out. Click <Link to="/login">here</Link> to
          login again.</Alert.Title>
      </Alert.Root>
    </Container>
  );
};

export default LogoutSuccessPage;
