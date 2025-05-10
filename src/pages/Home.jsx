import React from 'react';
import { Box, Heading, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box p={8}>
      <Heading mb={4}>Welcome to our E-Commerce Store!</Heading>
      <Button colorScheme="teal" onClick={() => navigate('/products')}>
        Browse Products
      </Button>
    </Box>
  );
};

export default Home;
