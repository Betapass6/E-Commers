import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Image,
  Button,
  useToast,
  VStack,
  HStack,
  Badge,
  List,
  ListItem,
  ListIcon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Product } from '../types';
import { getProduct } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const { data } = await getProduct(id);
          setProduct(data);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Product not found",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, toast]);

  if (loading) return <LoadingSpinner />;
  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Success",
      description: `${quantity} ${product.title}${quantity > 1 ? 's' : ''} added to cart`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const stockStatus = product.stockQuantity > 10 
    ? { color: 'green', text: 'In Stock' }
    : product.stockQuantity > 0 
      ? { color: 'orange', text: 'Low Stock' }
      : { color: 'red', text: 'Out of Stock' };

  return (
    <Box maxW="1200px" mx="auto" p={8}>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
        <Box>
          <Image
            src={product.imageUrl}
            alt={product.title}
            borderRadius="lg"
            objectFit="cover"
            w="100%"
            h="auto"
            shadow="lg"
          />
        </Box>

        <VStack align="stretch" spacing={6}>
          <Box>
            <Heading size="xl">{product.title}</Heading>
            <Text color="gray.600" fontSize="lg" mt={2}>
              {product.name}
            </Text>
          </Box>

          <HStack>
            <Text fontSize="3xl" fontWeight="bold" color="teal.600">
              ${product.price.toFixed(2)}
            </Text>
            <Badge 
              colorScheme={stockStatus.color} 
              fontSize="md" 
              px={3} 
              py={1} 
              borderRadius="full"
            >
              {stockStatus.text}
            </Badge>
          </HStack>

          <Text color="gray.700" fontSize="md">
            {product.description}
          </Text>

          {product.features && (
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={2}>
                Key Features
              </Text>
              <List spacing={2}>
                {product.features.map((feature, index) => (
                  <ListItem key={index}>
                    <ListIcon as={CheckIcon} color="teal.500" />
                    {feature}
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          <Divider />

          <Box>
            <Text mb={2}>Quantity Available: {product.stockQuantity}</Text>
            <HStack spacing={4}>
              <NumberInput
                defaultValue={1}
                min={1}
                max={product.stockQuantity}
                onChange={(_, value) => setQuantity(value)}
                w="120px"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <Button
                colorScheme="teal"
                size="lg"
                onClick={handleAddToCart}
                isDisabled={product.stockQuantity === 0}
                flexGrow={1}
              >
                Add to Cart
              </Button>
            </HStack>
          </Box>

          {product.colors && (
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={2}>
                Available Colors
              </Text>
              <HStack>
                {product.colors.map((color) => (
                  <Badge key={color} px={3} py={1}>
                    {color}
                  </Badge>
                ))}
              </HStack>
            </Box>
          )}
        </VStack>
      </Grid>
    </Box>
  );
};

export default ProductDetail;