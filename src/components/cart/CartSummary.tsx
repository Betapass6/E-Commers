import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useCart } from '../../hooks/useCart';

const CartSummary: React.FC = () => {
    const { cartItems, totalAmount } = useCart();

    return (
        <Box borderWidth="1px" borderRadius="lg" p={4}>
            <Text fontSize="lg" fontWeight="bold">Cart Summary</Text>
            {cartItems.length === 0 ? (
                <Text>Your cart is empty.</Text>
            ) : (
                <>
                    {cartItems.map(item => (
                        <Text key={item.id}>
                            {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                        </Text>
                    ))}
                    <Text fontWeight="bold">Total: ${totalAmount.toFixed(2)}</Text>
                </>
            )}
        </Box>
    );
};

export default CartSummary;