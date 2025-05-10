import React from 'react';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useUser } from '../contexts/UserContext';

const adminOrders = [
  { id: 1, user: 'John Doe', product: 'T-Shirt', date: '2025-05-01', status: 'Shipped' },
  { id: 2, user: 'Jane Smith', product: 'Shoes', date: '2025-05-02', status: 'Pending' },
  { id: 3, user: 'Bob Lee', product: 'Hat', date: '2025-05-03', status: 'Delivered' },
];

const Admin = () => {
  const { user } = useUser();

  if (!user || !user.isAdmin) {
    return (
      <Box p={8}>
        <Heading mb={4}>You are not authorized to view this page.</Heading>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading mb={6}>Admin Panel</Heading>
      <Stack spacing={4}>
        {adminOrders.map((order) => (
          <Box key={order.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Text>User: {order.user}</Text>
            <Text>Product: {order.product}</Text>
            <Text>Date: {order.date}</Text>
            <Text>Status: {order.status}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Admin;
