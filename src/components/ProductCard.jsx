 // File: components/ProductCard.jsx
import React from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  Button,
  Stack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, price, image, category }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" shadow="md">
      <Image src={image} alt={name} borderRadius="md" mb={4} />
      <Badge colorScheme="teal">{category}</Badge>
      <Text mt={2} fontWeight="semibold" fontSize="lg">
        {name}
      </Text>
      <Text color="gray.600">Rp {price.toLocaleString()}</Text>
      <Stack mt={3} direction="row" justify="space-between">
        <Button as={Link} to={`/products/${id}`} size="sm" colorScheme="teal">
          Detail
        </Button>
        <Button size="sm" variant="outline">
          Tambah
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductCard;