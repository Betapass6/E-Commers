import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();

    const handleContinueShopping = () => {
        navigate('/products');
    };

    return (
        <Box textAlign="center" py={10} px={6}>
            <Text fontSize="2xl" mb={4}>Payment Successful!</Text>
            <Text fontSize="lg" mb={6}>
                Thank you for your purchase. Your payment has been processed successfully.
            </Text>
            <Button colorScheme="teal" onClick={handleContinueShopping}>
                Continue Shopping
            </Button>
        </Box>
    );
};

export default PaymentSuccess;