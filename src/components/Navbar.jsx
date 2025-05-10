import React from 'react';
import {
  Box,
  Flex,
  Button,
  Stack,
  useColorMode,
  useColorModeValue,
  Spacer,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  const { user, logout } = useUser();
  const navigate = useNavigate();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box fontWeight="bold">E-Commerce</Box>
        <Spacer />
        <Stack direction={'row'} spacing={4}>
          <ChakraLink as={Link} to="/">Home</ChakraLink>
          <ChakraLink as={Link} to="/products">Products</ChakraLink>
          <ChakraLink as={Link} to="/cart">Cart</ChakraLink>
          {user && <ChakraLink as={Link} to="/orders">Orders</ChakraLink>}
          {user?.isAdmin && <ChakraLink as={Link} to="/admin">Admin</ChakraLink>}
          {!user ? (
            <Button size="sm" onClick={() => navigate('/login')}>Login</Button>
          ) : (
            <Button size="sm" onClick={logout}>Logout</Button>
          )}
          <Button size="sm" onClick={toggleColorMode}>Mode</Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;
