import React from 'react';
import { Box, Image, Text, Button, VStack, HStack, Badge, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ProductCardProps {
    product: Product;
}

const MotionBox = motion(Box);

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const cardBg = useColorModeValue('white', 'gray.800');
    const shadowColor = useColorModeValue('gray.200', 'gray.600');
    const [hovered, setHovered] = React.useState(false);

    const handleClick = () => {
        navigate(`/products/${product.id}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <MotionBox
            onClick={handleClick}
            borderWidth="2px"
            borderRadius="2xl"
            overflow="hidden"
            p={4}
            cursor="pointer"
            transition="all 0.2s"
            _hover={{
                transform: 'translateY(-8px) scale(1.03)',
                boxShadow: `0 16px 32px -8px ${shadowColor}`,
                borderColor: 'teal.400',
            }}
            backgroundColor={cardBg}
            height="100%"
            display="flex"
            flexDirection="column"
            boxShadow="md"
            position="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ boxShadow: '2xl' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Badge */}
            {product.badge && (
                <Badge
                    position="absolute"
                    top={3}
                    left={3}
                    colorScheme={product.badge === 'Sale' ? 'red' : 'teal'}
                    fontSize="0.8em"
                    px={3}
                    py={1}
                    borderRadius="md"
                    zIndex={1}
                >
                    {product.badge}
                </Badge>
            )}
            <Box 
                position="relative" 
                height="180px"
                marginBottom={4}
            >
                <Image
                    src={product.imageUrl}
                    alt={product.title}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    borderRadius="lg"
                />
            </Box>

            <VStack flex="1" spacing={2} align="stretch">
                <HStack justify="space-between" align="start">
                <Text 
                        fontSize="lg" 
                        fontWeight="bold" 
                    lineHeight="tight"
                    noOfLines={2}
                >
                    {product.title}
                </Text>
                    {/* Ratings */}
                    {product.rating && (
                        <HStack spacing={0.5} align="center">
                            {[...Array(5)].map((_, i) =>
                                React.createElement(FaStar as any, {
                                    key: i,
                                    color: i < Math.round(product.rating ?? 0) ? '#ECC94B' : '#CBD5E0',
                                    size: 16
                                })
                            )}
                            <Text fontSize="xs" color="gray.500" ml={1}>
                                ({product.reviews || 0})
                            </Text>
                        </HStack>
                    )}
                </HStack>
                <Text 
                    fontSize="sm" 
                    color="gray.600"
                    noOfLines={2}
                >
                    {product.description}
                </Text>
                    <Text 
                    fontSize="xl" 
                        fontWeight="bold" 
                    color="teal.500"
                    mt={2}
                    >
                        ${product.price.toFixed(2)}
                    </Text>
                <Box mt="auto">
                    <Button
                        onClick={handleAddToCart}
                        colorScheme="teal"
                        width="100%"
                        mt={2}
                        _hover={{ bg: 'teal.600', transform: 'scale(1.04)' }}
                        transition="all 0.2s"
                        opacity={hovered ? 1 : 0}
                        pointerEvents={hovered ? 'auto' : 'none'}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </VStack>
        </MotionBox>
    );
};

export default ProductCard;