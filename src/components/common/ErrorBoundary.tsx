import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box textAlign="center" p={8}>
          <Heading>Oops, something went wrong!</Heading>
          <Text my={4}>We apologize for the inconvenience.</Text>
          <Button
            colorScheme="teal"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;