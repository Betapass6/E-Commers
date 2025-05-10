import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const NotFound = () => (
  <Box p={8} textAlign="center">
    <Heading mb={4}>404 - Not Found</Heading>
    <Text>The page you are looking for does not exist.</Text>
  </Box>
);

export default NotFound;

