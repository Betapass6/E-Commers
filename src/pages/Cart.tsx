import React, { useState } from 'react';
import { Box, Button, Heading, Text, VStack, useToast, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import PaymentForm from '../components/checkout/PaymentForm';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalAmount } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      toast({
        title: 'Please login',
        description: 'You need to login before checkout',
        status: 'warning',
        duration: 3000,
      });
      navigate('/login');
      return;
    }
    setIsCheckingOut(true);
  };

  const handlePayment = () => {
    // Simulate payment processing
    toast({
      title: 'Processing payment...',
      status: 'info',
      duration: 2000,
    });

    setTimeout(() => {
      clearCart();
      navigate('/payment-success');
    }, 2000);
  };

  return (
    <Box maxW="container.lg" mx="auto" py={8} px={4}>
      <VStack spacing={6} align="stretch">
        <Heading as="h2" size="lg">Shopping Cart</Heading>
        
        {cartItems.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <>
            {cartItems.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
            <Divider />
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Total: ${totalAmount.toFixed(2)}
              </Text>
            </Box>
            
            {isCheckingOut ? (
              <VStack spacing={4} align="stretch">
                <PaymentForm />
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={handlePayment}
                >
                  Complete Purchase
                </Button>
              </VStack>
            ) : (
              <Button
                colorScheme="teal"
                size="lg"
                onClick={handleCheckout}
                isDisabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            )}
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Cart;