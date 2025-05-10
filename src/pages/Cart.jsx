import React from 'react';
import {
  Box,
  Heading,
  Stack,
  Text,
  Button,
  Divider
} from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <Box p={8}>
      <Heading mb={4}>Your Cart</Heading>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <Stack spacing={4}>
          {cart.map((item, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
              <Text fontWeight="bold">{item.name}</Text>
              <Text>${item.price}</Text>
              <Button size="sm" colorScheme="red" onClick={() => removeFromCart(index)}>
                Remove
              </Button>
            </Box>
          ))}
          <Divider />
          <Text fontWeight="bold">
            Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
          </Text>
        </Stack>
      )}
    </Box>
  );
};

export default Cart;
