import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Button } from '@chakra-ui/react';
import products from '../data/products.json';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();

  if (!product) {
    return (
      <Box p={8}>
        <Heading>Product Not Found</Heading>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading mb={4}>{product.name}</Heading>
      <Image src={product.image} alt={product.name} maxW="300px" mb={4} />
      <Text mb={2}>Category: {product.category}</Text>
      <Text mb={2}>Price: Rp {product.price.toLocaleString()}</Text>
      <Button colorScheme="teal" onClick={() => addToCart(product)}>
        Add to Cart
      </Button>
    </Box>
  );
};

export default ProductDetail;

