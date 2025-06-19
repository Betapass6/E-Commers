import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, HStack, VStack, Text, Collapse } from '@chakra-ui/react';
import { FaCreditCard, FaUniversity, FaQrcode, FaCheckCircle } from 'react-icons/fa';

const paymentMethods = [
  {
    key: 'card',
    label: 'Credit/Debit Card',
    icon: FaCreditCard,
  },
  {
    key: 'bank',
    label: 'Bank Transfer',
    icon: FaUniversity,
  },
  {
    key: 'gopay',
    label: 'GoPay (QRIS)',
    icon: FaQrcode,
  },
];

const PaymentForm: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
  const [bankAccount, setBankAccount] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle payment processing logic here
    if (selectedMethod === 'card') {
      console.log('Card Payment:', { cardNumber, expiryDate, cvv });
    } else if (selectedMethod === 'bank') {
      console.log('Bank Transfer:', { bankAccount });
    } else if (selectedMethod === 'gopay') {
      console.log('GoPay Payment');
    }
    };

    return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack align="stretch" spacing={4}>
        <Text fontWeight="bold" mb={1}>Select Payment Method</Text>
        <HStack spacing={4} mb={2} flexWrap="wrap">
          {paymentMethods.map((method) => {
            const isSelected = selectedMethod === method.key;
            return (
              <Box
                key={method.key}
                borderWidth={2}
                borderColor={isSelected ? 'teal.400' : 'gray.200'}
                bg={isSelected ? 'teal.50' : 'white'}
                borderRadius="lg"
                p={3}
                minW="160px"
                cursor="pointer"
                boxShadow={isSelected ? 'md' : 'sm'}
                position="relative"
                onClick={() => setSelectedMethod(method.key)}
                display="flex"
                alignItems="center"
                transition="all 0.2s"
              >
                {React.createElement(method.icon as any, { size: 24, color: isSelected ? '#319795' : '#888', style: { marginRight: 10 } })}
                <Text fontWeight={isSelected ? 'bold' : 'normal'}>{method.label}</Text>
                {isSelected && React.createElement(FaCheckCircle as any, { color: '#319795', style: { marginLeft: 8, fontSize: 18 } })}
              </Box>
            );
          })}
        </HStack>
        {/* Only render the fields for the selected method */}
        {selectedMethod === 'card' && (
          <Stack spacing={4} mt={2}>
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
          </Stack>
        )}
        {selectedMethod === 'bank' && (
          <Stack spacing={4} mt={2}>
            <FormControl isRequired>
              <FormLabel>Bank Account Number</FormLabel>
              <Input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                placeholder="Enter your bank account number"
              />
            </FormControl>
            <Text fontSize="sm" color="gray.500">Transfer instructions will be shown after you place the order.</Text>
          </Stack>
        )}
        {selectedMethod === 'gopay' && (
          <Stack spacing={4} mt={2} align="center">
            <Text fontSize="sm" color="gray.500">A QR code will be shown after you place the order.</Text>
            <Box bg="gray.100" p={6} borderRadius="md" textAlign="center">
              {React.createElement(FaQrcode as any, { size: 48, color: '#319795' })}
              <Text mt={2} fontWeight="bold">Scan to Pay</Text>
            </Box>
            </Stack>
        )}
        <Button type="submit" colorScheme="teal" mt={4} w="full">Submit Payment</Button>
      </VStack>
        </Box>
    );
};

export default PaymentForm;