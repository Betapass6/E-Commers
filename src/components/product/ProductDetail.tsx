import React from 'react';
import { Box, Heading, Text, Image, Button } from '@chakra-ui/react';

interface ProductDetailProps {
    product: {
        id: string;
        title: string;
        description: string;
        price: number;
        imageUrl: string;
    };
    onAddToCart: (productId: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
    return (
        <Box padding={5} borderWidth={1} borderRadius="lg">
            <Image src={product.imageUrl} alt={product.title} borderRadius="md" />
            <Heading as="h2" size="lg" marginTop={4}>
                {product.title}
            </Heading>
            <Text marginTop={2} fontSize="lg" color="gray.600">
                ${product.price.toFixed(2)}
            </Text>
            <Text marginTop={2}>{product.description}</Text>
            <Button
                marginTop={4}
                colorScheme="teal"
                onClick={() => onAddToCart(product.id)}
            >
                Add to Cart
            </Button>
        </Box>
    );
};

export default ProductDetail;