import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => (
  <Box as="footer" py={4} textAlign="center" bg="gray.100" mt={8}>
    <Text fontSize="sm" color="gray.600">
      &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
    </Text>
  </Box>
);

export default Footer;

