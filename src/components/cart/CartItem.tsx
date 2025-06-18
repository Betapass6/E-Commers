import React from 'react';
import { Box, Text, HStack, Image, Badge, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, IconButton, Tooltip, VStack } from '@chakra-ui/react';
import { Product } from '../../types';
import { FaTrash } from 'react-icons/fa';

interface CartItemProps {
  item: Product & { quantity: number };
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      boxShadow="md"
      p={4}
      mb={4}
      display="flex"
      alignItems="center"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: 'xl' }}
    >
      <Image
        src={item.imageUrl}
        alt={item.title}
        boxSize="80px"
        borderRadius="md"
        objectFit="cover"
        mr={4}
      />
      <VStack align="start" spacing={1} flex={1}>
        <HStack>
          <Text fontWeight="bold">{item.title}</Text>
          {item.badge && (
            <Badge colorScheme={item.badge === 'Sale' ? 'red' : 'teal'}>{item.badge}</Badge>
          )}
        </HStack>
        <Text color="gray.500" fontSize="sm">${item.price.toFixed(2)}</Text>
        {item.colors && item.colors.length > 0 && (
          <HStack>
            <Text fontSize="xs" color="gray.400">Color:</Text>
            <Badge px={2} py={1} borderRadius="md" bg="gray.100" color="gray.700">{item.colors[0]}</Badge>
          </HStack>
        )}
        <NumberInput
          size="sm"
          maxW={20}
          min={1}
          value={item.quantity}
          onChange={(_, value) => onUpdateQuantity(item.id, value)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </VStack>
      <Text fontWeight="bold" fontSize="lg" mx={4}>${(item.price * item.quantity).toFixed(2)}</Text>
      <Tooltip label="Remove from cart">
        <IconButton
          icon={React.createElement(FaTrash as any)}
          colorScheme="red"
          variant="ghost"
          onClick={() => onRemove(item.id)}
          aria-label="Remove"
          _hover={{ bg: 'red.100', color: 'red.600', transform: 'scale(1.1)' }}
        />
      </Tooltip>
    </Box>
  );
};

export default CartItem;