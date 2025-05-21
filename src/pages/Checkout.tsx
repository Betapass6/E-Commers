import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentForm from '../components/checkout/PaymentForm';

const Checkout: React.FC = () => {
    const handleSubmit = () => {
        // Handle the submission of the forms
    };

    return (
        <Box p={5}>
            <Heading as="h2" size="lg" mb={5}>Checkout</Heading>
            <ShippingForm />
            <PaymentForm />
            <Button colorScheme="teal" onClick={handleSubmit} mt={4}>
                Complete Purchase
            </Button>
        </Box>
    );
};

export default Checkout;