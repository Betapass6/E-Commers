import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import { useAuth } from '../contexts/AuthContext';
import { Address } from '../types';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, FormControl, FormLabel, SimpleGrid, Radio, RadioGroup, Stack, Divider, Text, HStack, VStack, Icon } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaTruck, FaCreditCard, FaListAlt, FaCheckCircle, FaEdit, FaShareAlt } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { Collapse } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const Checkout: React.FC = () => {
    const { user } = useAuth();
    const { cartItems, totalAmount } = useCart();
    const [addressModalOpen, setAddressModalOpen] = React.useState(false);
    const [addresses, setAddresses] = React.useState<Address[]>(() => {
        const userId = user?.id;
        if (userId) {
            const saved = localStorage.getItem(`addresses_${userId}`);
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });
    const [selectedAddressId, setSelectedAddressId] = React.useState<string | undefined>(() => {
        const userId = user?.id;
        if (userId) {
            return localStorage.getItem(`selected_address_${userId}`) || undefined;
        }
        return undefined;
    });
    const [newAddress, setNewAddress] = React.useState<Partial<Address>>({});
    const [shipping, setShipping] = React.useState('standard');
    const [showAddForm, setShowAddForm] = React.useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const { clearCart } = useCart();

    const handleOpenAddressModal = () => setAddressModalOpen(true);
    const handleCloseAddressModal = () => setAddressModalOpen(false);
    const handleAddAddress = () => {
        if (!newAddress.label || !newAddress.recipient || !newAddress.phone || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zip || !newAddress.country) return;
        const addr: Address = { ...newAddress, id: Date.now().toString() } as Address;
        const updated = [...addresses, addr];
        setAddresses(updated);
        setNewAddress({});
        setSelectedAddressId(addr.id);
        const userId = user?.id;
        if (userId) {
            localStorage.setItem(`addresses_${userId}`, JSON.stringify(updated));
            localStorage.setItem(`selected_address_${userId}`, addr.id);
        }
    };
    const handleSelectAddress = (id: string) => {
        setSelectedAddressId(id);
        const userId = user?.id;
        if (userId) {
            localStorage.setItem(`selected_address_${userId}`, id);
        }
    };

    const handleSubmit = () => {
        if (!selectedAddressId) {
            toast({
                title: 'No address selected',
                description: 'Please select a shipping address before completing your purchase.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }
        if (cartItems.length === 0) {
            toast({
                title: 'Cart is empty',
                description: 'Please add items to your cart before checking out.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }
        // Optionally: Save order to localStorage or backend here
        clearCart();
        navigate('/payment-success');
    };

    const shippingCost = shipping === 'express' ? 9.99 : 0;
    const orderTotal = totalAmount + shippingCost;

    return (
        <Box bg="gray.50" minH="100vh" py={10}>
            <Box maxW="container.xl" mx="auto" px={4}>
                <Box display={{ base: 'block', md: 'flex' }} gap={8} alignItems="flex-start">
                    {/* Left: Forms */}
                    <Box flex={2} minW={0}>
                        {/* Address Selection */}
                        <Box bg="white" p={6} borderRadius="xl" boxShadow="md" mb={6}>
                            <HStack mb={4} spacing={2}>
                                {React.createElement(FaMapMarkerAlt as any)}
                                <Heading as="h3" size="md">Shipping Address</Heading>
                            </HStack>
                            <Button leftIcon={React.createElement(FaMapMarkerAlt as any)} colorScheme="teal" variant="outline" onClick={handleOpenAddressModal} mb={2}>
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
                        <Modal isOpen={addressModalOpen} onClose={handleCloseAddressModal} size="lg">
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Select or Add Address</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    {/* Address List */}
                                    <VStack align="stretch" spacing={4} mb={4}>
                                        {addresses.length === 0 && (
                                            <Text color="gray.500">No addresses yet. Please add one below.</Text>
                                        )}
                                        {addresses.map((addr, idx) => {
                                            const isSelected = selectedAddressId === addr.id;
                                            return (
                                                <Box
                                                    key={addr.id}
                                                    borderWidth={2}
                                                    borderColor={isSelected ? 'green.400' : 'gray.200'}
                                                    bg={isSelected ? 'green.50' : 'white'}
                                                    borderRadius="lg"
                                                    p={4}
                                                    position="relative"
                                                    boxShadow={isSelected ? 'md' : 'sm'}
                                                    transition="all 0.2s"
                                                    cursor="pointer"
                                                    onClick={() => handleSelectAddress(addr.id)}
                                                >
                                                    <HStack align="start" spacing={3}>
                                                        <Box flex={1}>
                                                            <HStack spacing={2} mb={1}>
                                                                <Text fontWeight="bold">{addr.label}</Text>
                                                                {idx === 0 && (
                                                                    <Box as="span" bg="green.400" color="white" px={2} py={0.5} borderRadius="md" fontSize="xs">Main</Box>
                                                                )}
                                                                {isSelected && (
                                                                    React.createElement(FaCheckCircle as any, { color: 'green.400', style: { marginLeft: 4, fontSize: 20, verticalAlign: 'middle' } })
                                                                )}
                                                            </HStack>
                                                            <Text fontWeight="bold">{addr.recipient}</Text>
                                                            <Text fontSize="sm" color="gray.600">{addr.phone}</Text>
                                                            <Text fontSize="sm" color="gray.700" mt={1}>{addr.street}, {addr.city}, {addr.state}, {addr.zip}, {addr.country}</Text>
                                                        </Box>
                                                        <VStack spacing={1} align="end">
                                                            <Button size="xs" leftIcon={React.createElement(FaEdit as any)} variant="ghost" colorScheme="teal" isDisabled>Edit</Button>
                                                            <Button size="xs" leftIcon={React.createElement(FaShareAlt as any)} variant="ghost" colorScheme="teal" isDisabled>Share</Button>
                                                        </VStack>
                                                    </HStack>
                                                </Box>
                                            );
                                        })}
                                    </VStack>
                                    <Button
                                        colorScheme="teal"
                                        variant={showAddForm ? 'outline' : 'solid'}
                                        mb={2}
                                        w="full"
                                        onClick={() => setShowAddForm(f => !f)}
                                    >
                                        + Add New Address
                                    </Button>
                                    <Collapse in={showAddForm} animateOpacity>
                                        <Box bg="gray.50" p={4} borderRadius="md" mt={2}>
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
                                            <Button colorScheme="teal" mt={4} w="full" onClick={handleAddAddress}>Add Address</Button>
                                        </Box>
                                    </Collapse>
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="ghost" onClick={handleCloseAddressModal}>Close</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        {/* Shipping Method */}
                        <Box bg="white" p={6} borderRadius="xl" boxShadow="md" mb={6}>
                            <HStack mb={4} spacing={2}>
                                {React.createElement(FaTruck as any)}
                                <Heading as="h3" size="md">Shipping Method</Heading>
                            </HStack>
                            <RadioGroup value={shipping} onChange={setShipping}>
                                <Stack direction="row">
                                    <Radio value="standard">Standard (3-5 days, Free)</Radio>
                                    <Radio value="express">Express (1-2 days, $9.99)</Radio>
                                </Stack>
                            </RadioGroup>
                        </Box>
                        {/* Payment Form */}
                        <Box bg="white" p={6} borderRadius="xl" boxShadow="md" mb={6}>
                            <HStack mb={4} spacing={2}>
                                {React.createElement(FaCreditCard as any)}
                                <Heading as="h3" size="md">Payment</Heading>
                            </HStack>
            <PaymentForm />
                        </Box>
                        <Button colorScheme="teal" onClick={handleSubmit} mt={4} w="full" size="lg">
                Complete Purchase
            </Button>
                    </Box>
                    {/* Right: Order Summary */}
                    <Box flex={1} minW="320px" ml={{ md: 8 }} mt={{ base: 8, md: 0 }}>
                        <Box bg="white" p={6} borderRadius="xl" boxShadow="lg" position="sticky" top={24}>
                            <HStack mb={4} spacing={2}>
                                {React.createElement(FaListAlt as any)}
                                <Heading as="h3" size="md">Order Summary</Heading>
                            </HStack>
                            <Divider mb={4} />
                            <VStack spacing={4} align="stretch">
                                {cartItems.length === 0 ? (
                                    <Text color="gray.500">Your cart is empty.</Text>
                                ) : (
                                    cartItems.map(item => (
                                        <Box key={item.id} display="flex" alignItems="center" justifyContent="space-between">
                                            <Box>
                                                <Text fontWeight="medium">{item.title || item.name}</Text>
                                                <Text fontSize="sm" color="gray.500">Qty: {item.quantity}</Text>
                                            </Box>
                                            <Text fontWeight="bold">${(item.price * item.quantity).toFixed(2)}</Text>
                                        </Box>
                                    ))
                                )}
                            </VStack>
                            <Divider my={4} />
                            <HStack justify="space-between">
                                <Text fontWeight="medium">Subtotal</Text>
                                <Text fontWeight="bold">${totalAmount.toFixed(2)}</Text>
                            </HStack>
                            <HStack justify="space-between">
                                <Text fontWeight="medium">Shipping</Text>
                                <Text fontWeight="bold">{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</Text>
                            </HStack>
                            <Divider my={4} />
                            <HStack justify="space-between">
                                <Text fontWeight="bold">Total</Text>
                                <Text fontWeight="bold" fontSize="lg">${orderTotal.toFixed(2)}</Text>
                            </HStack>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Checkout;