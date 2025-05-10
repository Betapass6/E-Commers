import React from 'react';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useUser } from '../context/UserContext';

const orders = [
  { id: 1, product: 'T-Shirt', date: '2025-05-01', status: 'Shipped' },
  { id: 2, product: 'Shoes', date: '2025-05-02', status: 'Pending' },
  { id: 3, product: 'Hat', date: '2025-05-03', status: 'Delivered' },
];

const Orders = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <Box p={8}>
        <Heading mb={4}>Please log in to view your orders</Heading>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading mb={6}>Your Orders</Heading>
      <Stack spacing={4}>
        {orders.map((order) => (
          <Box key={order.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Text>Product: {order.product}</Text>
            <Text>Date: {order.date}</Text>
            <Text>Status: {order.status}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Orders;
