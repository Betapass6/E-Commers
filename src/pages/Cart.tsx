import React, { useState } from 'react';
import { Box, Button, Heading, Text, VStack, useToast, Divider, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, FormControl, FormLabel, useDisclosure, SimpleGrid, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import PaymentForm from '../components/checkout/PaymentForm';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Address, User } from '../types';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalAmount } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const userId = localStorage.getItem('auth_data') ? JSON.parse(localStorage.getItem('auth_data')!).user.id : null;
    if (userId) {
      const saved = localStorage.getItem(`addresses_${userId}`);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>(() => {
    const userId = localStorage.getItem('auth_data') ? JSON.parse(localStorage.getItem('auth_data')!).user.id : null;
    if (userId) {
      return localStorage.getItem(`selected_address_${userId}`) || undefined;
    }
    return undefined;
  });
  const [newAddress, setNewAddress] = useState<Partial<Address>>({});

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
    navigate('/checkout');
  };

  const handleOpenAddressModal = () => setAddressModalOpen(true);
  const handleCloseAddressModal = () => setAddressModalOpen(false);

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.recipient || !newAddress.phone || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zip || !newAddress.country) return;
    const addr: Address = { ...newAddress, id: Date.now().toString() } as Address;
    const updated = [...addresses, addr];
    setAddresses(updated);
    setNewAddress({});
    setSelectedAddressId(addr.id);
    const userId = localStorage.getItem('auth_data') ? JSON.parse(localStorage.getItem('auth_data')!).user.id : null;
    if (userId) {
      localStorage.setItem(`addresses_${userId}`, JSON.stringify(updated));
      localStorage.setItem(`selected_address_${userId}`, addr.id);
    }
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    const userId = localStorage.getItem('auth_data') ? JSON.parse(localStorage.getItem('auth_data')!).user.id : null;
    if (userId) {
      localStorage.setItem(`selected_address_${userId}`, id);
    }
  };

  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Box maxW="container.xl" mx="auto" px={4}>
        <Box mb={6}>
          <Button leftIcon={React.createElement(FaMapMarkerAlt as any)} colorScheme="teal" variant="outline" onClick={handleOpenAddressModal}>
            {selectedAddressId ? 'Change Address' : 'Add Address'}
          </Button>
          {selectedAddressId && (
            <Box mt={2} p={3} bg="teal.50" borderRadius="md" fontSize="sm">
              <b>Deliver to:</b> {(() => {
                const addr = addresses.find(a => a.id === selectedAddressId);
                return addr ? `${addr.recipient}, ${addr.street}, ${addr.city}, ${addr.state}, ${addr.zip}, ${addr.country} (${addr.phone})` : '';
              })()}
            </Box>
          )}
        </Box>
        {/* Address Modal */}
        <Modal isOpen={addressModalOpen} onClose={handleCloseAddressModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select or Add Address</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <RadioGroup value={selectedAddressId} onChange={handleSelectAddress}>
                <Stack spacing={3}>
                  {addresses.map(addr => (
                    <Radio key={addr.id} value={addr.id}>
                      <Box>
                        <b>{addr.label}</b>: {addr.recipient}, {addr.street}, {addr.city}, {addr.state}, {addr.zip}, {addr.country} ({addr.phone})
                      </Box>
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
              <Divider my={4} />
              <Heading as="h4" size="sm" mb={2}>Add New Address</Heading>
              <SimpleGrid columns={2} spacing={2}>
                <FormControl isRequired><FormLabel>Label</FormLabel><Input value={newAddress.label || ''} onChange={e => setNewAddress(a => ({ ...a, label: e.target.value }))} /></FormControl>
                <FormControl isRequired><FormLabel>Recipient</FormLabel><Input value={newAddress.recipient || ''} onChange={e => setNewAddress(a => ({ ...a, recipient: e.target.value }))} /></FormControl>
                <FormControl isRequired><FormLabel>Phone</FormLabel><Input value={newAddress.phone || ''} onChange={e => setNewAddress(a => ({ ...a, phone: e.target.value }))} /></FormControl>
                <FormControl isRequired><FormLabel>Street</FormLabel><Input value={newAddress.street || ''} onChange={e => setNewAddress(a => ({ ...a, street: e.target.value }))} /></FormControl>
                <FormControl isRequired><FormLabel>City</FormLabel><Input value={newAddress.city || ''} onChange={e => setNewAddress(a => ({ ...a, city: e.target.value }))} /></FormControl>
                <FormControl isRequired><FormLabel>State</FormLabel><Input value={newAddress.state || ''} onChange={e => setNewAddress(a => ({ ...a, state: e.target.value }))} /></FormControl>
                <FormControl isRequired><FormLabel>ZIP</FormLabel><Input value={newAddress.zip || ''} onChange={e => setNewAddress(a => ({ ...a, zip: e.target.value }))} /></FormControl>
                <FormControl isRequired><FormLabel>Country</FormLabel><Input value={newAddress.country || ''} onChange={e => setNewAddress(a => ({ ...a, country: e.target.value }))} /></FormControl>
              </SimpleGrid>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleAddAddress}>Add Address</Button>
              <Button variant="ghost" onClick={handleCloseAddressModal}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Heading as="h2" size="lg" mb={8} textAlign="center">Shopping Cart</Heading>
        <Box display={{ base: 'block', md: 'flex' }} gap={8} alignItems="flex-start">
          {/* Cart Items */}
          <Box flex={2}>
        {cartItems.length === 0 ? (
              <Box bg="white" p={8} borderRadius="xl" boxShadow="md" textAlign="center">
                <Text fontSize="xl" color="gray.500">Your cart is empty.</Text>
                <Button mt={6} colorScheme="teal" onClick={() => navigate('/products')}>Continue Shopping</Button>
              </Box>
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
              </>
            )}
            </Box>
          {/* Summary Card */}
          <Box flex={1} minW="300px" ml={{ md: 8 }} mt={{ base: 8, md: 0 }}>
            <Box bg="white" p={6} borderRadius="xl" boxShadow="lg" position="sticky" top={24}>
              <Heading as="h3" size="md" mb={4}>Order Summary</Heading>
              <Divider mb={4} />
              <VStack spacing={3} align="stretch">
                <HStack justify="space-between">
                  <Text fontWeight="medium">Subtotal</Text>
                  <Text fontWeight="bold">${totalAmount.toFixed(2)}</Text>
                </HStack>
                {/* You can add shipping/tax breakdown here if needed */}
              </VStack>
              <Divider my={4} />
              <Button
                colorScheme="teal"
                size="lg"
                onClick={handleCheckout}
                isDisabled={cartItems.length === 0}
                w="full"
                shadow="md"
                _hover={{ bg: 'teal.700', transform: 'scale(1.03)' }}
                transition="all 0.2s"
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;