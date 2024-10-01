import { useRouteError } from "react-router-dom";
import { Container, Heading, Text } from '@chakra-ui/react';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container id="error-page">
      <Heading>Oops!</Heading>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text>
        <i>{error.statusText || error.message}</i>
      </Text>
    </Container>
  );
}