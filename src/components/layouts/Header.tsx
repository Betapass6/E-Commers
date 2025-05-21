import React from 'react';
import { Box, Flex, Heading, Link, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <Box as="header" bg="teal.500" color="white" p={4}>
      <Flex align="center" justify="space-between">
        <RouterLink to="/">
          <Heading size="lg">Marketplace</Heading>
        </RouterLink>
        <Flex align="center">
          <RouterLink to="/">
            <Link color="white" mx={2}>Home</Link>
          </RouterLink>
          <RouterLink to="/products">
            <Link color="white" mx={2}>Products</Link>
          </RouterLink>
          <RouterLink to="/cart">
            <Link color="white" mx={2}>Cart</Link>
          </RouterLink>
          {isLoggedIn ? (
            <Button
              colorScheme="teal"
              variant="outline"
              color="white"
              onClick={logout}
              ml={2}
            >
              Logout
            </Button>
          ) : (
            <RouterLink to="/login">
              <Link color="white" mx={2}>Login</Link>
            </RouterLink>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;