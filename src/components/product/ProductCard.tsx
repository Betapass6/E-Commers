import React from 'react';
import { Box, Image, Text, Button, VStack, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const cardBg = useColorModeValue('white', 'gray.800');
    const shadowColor = useColorModeValue('gray.200', 'gray.600');

    const handleClick = () => {
        navigate(`/products/${product.id}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <Box
            onClick={handleClick}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            cursor="pointer"
            transition="all 0.2s"
            _hover={{
                transform: 'translateY(-5px)',
                boxShadow: `0 12px 20px -8px ${shadowColor}`
            }}
            backgroundColor={cardBg}
            height="100%"
            display="flex"
            flexDirection="column"
        >
            <Box 
                position="relative" 
                height="200px"
                marginBottom={4}
            >
                <Image
                    src={product.imageUrl}
                    alt={product.title}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    borderRadius="md"
                />
            </Box>

            <VStack flex="1" spacing={2} align="stretch">
                <Text 
                    fontSize="xl" 
                    fontWeight="semibold" 
                    lineHeight="tight"
                    noOfLines={2}
                >
                    {product.title}
                </Text>
                
                <Text 
                    fontSize="md" 
                    color="gray.600"
                    noOfLines={2}
                >
                    {product.description}
                </Text>

                <Box mt="auto">
                    <Text 
                        fontSize="2xl" 
                        fontWeight="bold" 
                        color="teal.600"
                        mb={4}
                    >
                        ${product.price.toFixed(2)}
                    </Text>
                    
                    <Button
                        onClick={handleAddToCart}
                        colorScheme="teal"
                        width="100%"
                    >
                        Add to Cart
                    </Button>
                </Box>
            </VStack>
        </Box>
    );
};

export default ProductCard;