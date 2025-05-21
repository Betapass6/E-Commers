import React from 'react';
import { Box, Text, Button, HStack, Input, Image } from '@chakra-ui/react';
import { Product } from '../../types';

interface CartItemProps {
  item: Product & { quantity: number };
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      p={4} 
      borderWidth="1px" 
      borderRadius="lg"
      mb={4}
    >
      <HStack spacing={4}>
        <Image 
          src={item.imageUrl} 
          alt={item.title} 
          boxSize="100px" 
          objectFit="cover" 
          borderRadius="md"
        />
        <Box>
          <Text fontWeight="bold" fontSize="lg">{item.title}</Text>
          <Text color="gray.600">${item.price.toFixed(2)}</Text>
          <HStack mt={2}>
            <Button
              size="sm"
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
            >
              -
            </Button>
            <Input
              value={item.quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value > 0) {
                  onUpdateQuantity(item.id, value);
                }
              }}
              size="sm"
              width="50px"
              textAlign="center"
            />
            <Button
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </HStack>
        </Box>
      </HStack>
      <Box textAlign="right">
        <Text fontWeight="bold" fontSize="lg">
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
        <Button
          colorScheme="red"
          size="sm"
          mt={2}
          onClick={() => onRemove(item.id)}
        >
          Remove
        </Button>
      </Box>
    </Box>
  );
};

export default CartItem;