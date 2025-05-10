import React from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Button,
  Stack
} from '@chakra-ui/react';
import { useCart } from '../context/CartContext';

const products = [
  { id: 1, name: 'T-Shirt', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Shoes', price: 49.99, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Hat', price: 14.99, image: 'https://via.placeholder.com/150' },
];

const Products = () => {
  const { addToCart } = useCart();

  return (
    <Box p={8}>
      <Heading mb={6}>Products</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {products.map((product) => (
          <Box key={product.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Image src={product.image} alt={product.name} />
            <Stack mt={2} spacing={2}>
              <Text fontWeight="bold">{product.name}</Text>
              <Text>${product.price}</Text>
              <Button colorScheme="teal" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Products;
