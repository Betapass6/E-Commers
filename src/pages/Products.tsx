import React from 'react';
import { Box, SimpleGrid, Heading, Container, Spinner, Text } from '@chakra-ui/react';
import ProductCard from '../components/product/ProductCard';
import useProducts from '../hooks/useProducts';

const Products: React.FC = () => {
    const { products, loading, error } = useProducts();

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" py={10}>
                <Text color="red.500">{error}</Text>
            </Box>
        );
    }

    return (
        <Container maxW="1200px" py={8}>
            <Heading as="h1" mb={8} textAlign="center">Our Products</Heading>
            <SimpleGrid 
                columns={{ base: 1, sm: 2, md: 3, lg: 4 }} 
                spacing={6}
                px={{ base: 4, md: 8 }}
            >
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default Products;