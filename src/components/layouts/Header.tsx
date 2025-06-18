import React from 'react';
import { Box, Flex, Heading, Button, IconButton, Badge, HStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { FaHome, FaBoxOpen, FaShoppingCart, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box as="header" bg="teal.600" color="white" px={6} py={3} boxShadow="md" position="sticky" top={0} zIndex={1000}>
      <Flex align="center" justify="space-between">
        <RouterLink to="/">
          <HStack spacing={2}>
            {React.createElement(FaBoxOpen as any, { size: 28 })}
            <Heading size="lg" fontWeight="extrabold" letterSpacing="tight">E-COMMERS</Heading>
          </HStack>
        </RouterLink>
        <HStack spacing={3}>
          <Button
            as={RouterLink}
            to="/"
            leftIcon={React.createElement(FaHome as any)}
            variant="ghost"
            colorScheme="whiteAlpha"
            _hover={{ bg: 'teal.700' }}
            fontWeight="bold"
          >
            Home
          </Button>
          <Button
            as={RouterLink}
            to="/products"
            leftIcon={React.createElement(FaBoxOpen as any)}
            variant="ghost"
            colorScheme="whiteAlpha"
            _hover={{ bg: 'teal.700' }}
            fontWeight="bold"
          >
            Products
          </Button>
          <Button
            as={RouterLink}
            to="/cart"
            leftIcon={React.createElement(FaShoppingCart as any)}
            variant="ghost"
            colorScheme="whiteAlpha"
            _hover={{ bg: 'teal.700' }}
            fontWeight="bold"
            position="relative"
          >
            Cart
            {cartCount > 0 && (
              <Badge
                colorScheme="red"
                borderRadius="full"
                position="absolute"
                top={1}
                right={2}
                fontSize="0.7em"
                px={2}
              >
                {cartCount}
              </Badge>
            )}
          </Button>
          {isLoggedIn ? (
            <Button
              leftIcon={React.createElement(FaSignOutAlt as any)}
              variant="solid"
              colorScheme="red"
              onClick={logout}
              fontWeight="bold"
            >
              Logout
            </Button>
          ) : (
            <Button
              as={RouterLink}
              to="/login"
              leftIcon={React.createElement(FaSignInAlt as any)}
              variant="solid"
              colorScheme="teal"
              fontWeight="bold"
            >
              Login
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;