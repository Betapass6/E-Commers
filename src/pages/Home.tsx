import React, { ElementType } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  SimpleGrid, 
  Container, 
  Stack,
  Image,
  Icon,
  VStack,
  HStack,
  useColorModeValue
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiTruck, FiLock, FiRefreshCcw } from 'react-icons/fi';
import { IconType } from 'react-icons';
import ProductCard from '../components/product/ProductCard';
import useProducts from '../hooks/useProducts';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface Feature {
    icon: ElementType;
    title: string;
    desc: string;
}

const features: Feature[] = [
    { icon: FiTruck as ElementType, title: "Free Shipping", desc: "On orders over $100" },
    { icon: FiLock as ElementType, title: "Secure Payment", desc: "100% secure payment" },
    { icon: FiRefreshCcw as ElementType, title: "Easy Returns", desc: "30 days return policy" }
];

const Home: React.FC = () => {
    const { products, loading } = useProducts();
    const featuredProducts = products.slice(0, 3);
    const bgGradient = useColorModeValue(
      'linear(to-r, teal.500, blue.500)',
      'linear(to-r, teal.600, blue.600)'
    );

    return (
        <Box>
            {/* Hero Section */}
            <Box 
              position="relative" 
              height={{ base: "400px", md: "600px" }}
              mb={10}
            >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bgImage="url('https://images.unsplash.com/photo-1441986300917-64674bd600d8')"
                  bgPosition="center"
                  bgSize="cover"
                  _after={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bg: 'blackAlpha.600',
                  }}
                />
                
                <Container maxW="container.xl" position="relative" height="100%">
                    <Stack
                      spacing={6}
                      w={{ base: "100%", md: "65%" }}
                      position="absolute"
                      top="50%"
                      transform="translateY(-50%)"
                      color="white"
                    >
                        <Heading 
                          as="h1" 
                          size="2xl" 
                          lineHeight="shorter"
                          textShadow="2px 2px 4px rgba(0,0,0,0.3)"
                        >
                            Welcome to Our Online Marketplace
                        </Heading>
                        <Text 
                          fontSize="xl" 
                          textShadow="1px 1px 2px rgba(0,0,0,0.3)"
                        >
                            Discover amazing products at unbeatable prices!
                        </Text>
                        <Box>
                            <Link to="/products">
                                <Button 
                                  size="lg" 
                                  bgGradient={bgGradient}
                                  color="white"
                                  _hover={{
                                    bgGradient: 'linear(to-r, teal.600, blue.600)',
                                  }}
                                >
                                    Shop Now
                                </Button>
                            </Link>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxW="container.xl" py={10}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    {features.map((feature, idx) => (
                        <VStack 
                          key={idx} 
                          align="center" 
                          p={6} 
                          bg={useColorModeValue('white', 'gray.700')}
                          rounded="lg"
                          shadow="md"
                        >
                            <Icon as={feature.icon} w={10} h={10} color="teal.500" />
                            <Text fontWeight="bold" fontSize="lg">{feature.title}</Text>
                            <Text color="gray.500" align="center">{feature.desc}</Text>
                        </VStack>
                    ))}
                </SimpleGrid>
            </Container>

            {/* Featured Products Section */}
            <Box 
              py={16} 
              bg={useColorModeValue('gray.50', 'gray.900')}
            >
                <Container maxW="container.xl">
                    <VStack spacing={8}>
                        <Heading as="h2" size="xl" textAlign="center">
                            Featured Products
                        </Heading>
                        <Text fontSize="lg" color="gray.600" textAlign="center">
                            Check out our most popular items
                        </Text>
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <SimpleGrid 
                              columns={{ base: 1, md: 2, lg: 3 }} 
                              spacing={8} 
                              w="full"
                            >
                                {featuredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </SimpleGrid>
                        )}
                    </VStack>
                </Container>
            </Box>

            {/* Newsletter Section */}
            <Box py={16}>
                <Container maxW="container.xl">
                    <Stack 
                      direction={{ base: 'column', md: 'row' }} 
                      spacing={8} 
                      align="center"
                    >
                        <Box flex={1}>
                            <Image
                                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                                alt="Newsletter"
                                rounded="lg"
                                shadow="2xl"
                            />
                        </Box>
                        <VStack flex={1} align="start" spacing={4}>
                            <Heading size="lg">Stay Updated</Heading>
                            <Text color="gray.600">
                                Subscribe to our newsletter to receive updates, news, and exclusive offers!
                            </Text>
                            <HStack w="full">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    style={{
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        border: '1px solid #E2E8F0',
                                        width: '100%'
                                    }}
                                />
                                <Button colorScheme="teal">Subscribe</Button>
                            </HStack>
                        </VStack>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;