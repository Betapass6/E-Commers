import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const ShippingForm: React.FC = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle shipping form submission
        console.log({ address, city, state, zip });
    };

    return (
        <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="lg">
            <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St"
                />
            </FormControl>
            <FormControl isRequired mt={4}>
                <FormLabel>City</FormLabel>
                <Input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Anytown"
                />
            </FormControl>
            <FormControl isRequired mt={4}>
                <FormLabel>State</FormLabel>
                <Input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="CA"
                />
            </FormControl>
            <FormControl isRequired mt={4}>
                <FormLabel>Zip Code</FormLabel>
                <Input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="12345"
                />
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
                Continue to Payment
            </Button>
        </Box>
    );
};

export default ShippingForm;