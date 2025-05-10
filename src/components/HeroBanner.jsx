 // File: components/HeroBanner.jsx
import React from 'react';
import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <Box textAlign="center" py={20} px={4} bgGradient="linear(to-r, teal.400, blue.500)" color="white">
      <Heading fontSize={{ base: '3xl', md: '5xl' }} fontWeight="bold">
        Temukan Produk Terbaik Untukmu
      </Heading>
      <Text fontSize={{ base: 'md', md: 'lg' }} mt={4}>
        Belanja mudah, cepat, dan aman hanya di MyShop
      </Text>
      <Stack direction="row" spacing={4} justify="center" mt={6}>
        <Button as={Link} to="/products" colorScheme="whiteAlpha" variant="solid">
          Lihat Produk
        </Button>
      </Stack>
    </Box>
  );
};

export default HeroBanner;

