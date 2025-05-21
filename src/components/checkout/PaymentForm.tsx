import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';

const PaymentForm: React.FC = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle payment processing logic here
        console.log('Payment submitted:', { cardNumber, expiryDate, cvv });
    };

    return (
        <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="md">
            <Stack spacing={4}>
                <FormControl isRequired>
                    <FormLabel>Card Number</FormLabel>
                    <Input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Enter your card number"
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Expiry Date</FormLabel>
                    <Input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>CVV</FormLabel>
                    <Input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="Enter your CVV"
                    />
                </FormControl>
                <Button type="submit" colorScheme="teal">Submit Payment</Button>
            </Stack>
        </Box>
    );
};

export default PaymentForm;