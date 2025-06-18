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
    const featuredProducts = products.slice(0, 6);
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
              mb={16}
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
                    bg: 'blackAlpha.700',
                  }}
                />
                <Container maxW="container.xl" position="relative" height="100%">
                    <Stack
                      spacing={8}
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
                          textShadow="2px 2px 8px rgba(0,0,0,0.5)"
                        >
                            Welcome to Our Online Marketplace
                        </Heading>
                        <Text 
                          fontSize="2xl" 
                          textShadow="1px 1px 4px rgba(0,0,0,0.4)"
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
                                    transform: 'scale(1.05)'
                                  }}
                                  shadow="lg"
                                >
                                    Shop Now
                                </Button>
                            </Link>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxW="container.xl" py={12}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    {features.map((feature, idx) => (
                        <VStack 
                          key={idx} 
                          align="center" 
                          p={8} 
                          bg={useColorModeValue('white', 'gray.700')}
                          rounded="2xl"
                          shadow="lg"
                          transition="all 0.2s"
                          _hover={{ shadow: '2xl', transform: 'scale(1.04)' }}
                        >
                            <Icon as={feature.icon} w={12} h={12} color="teal.400" mb={2} />
                            <Text fontWeight="bold" fontSize="xl">{feature.title}</Text>
                            <Text color="gray.500" align="center">{feature.desc}</Text>
                        </VStack>
                    ))}
                </SimpleGrid>
            </Container>

            {/* Featured Products Section */}
            <Box 
              py={20} 
              bg={useColorModeValue('gray.50', 'gray.900')}
            >
                <Container maxW="container.xl">
                    <VStack spacing={10}>
                        <Heading as="h2" size="xl" textAlign="center">
                            Featured Products
                        </Heading>
                        <Text fontSize="xl" color="gray.600" textAlign="center">
                            Check out our most popular items
                        </Text>
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <SimpleGrid 
                              columns={{ base: 1, sm: 2, md: 3 }} 
                              spacing={10} 
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
            <Box py={20}>
                <Container maxW="container.xl">
                    <Stack 
                      direction={{ base: 'column', md: 'row' }} 
                      spacing={12} 
                      align="center"
                    >
                        <Box flex={1} minW={0}>
                            <Image
                                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                                alt="Newsletter"
                                rounded="2xl"
                                shadow="2xl"
                                w="100%"
                                h={{ base: '200px', md: '260px' }}
                                objectFit="cover"
                            />
                        </Box>
                        <VStack flex={1} align="start" spacing={6} w="full">
                            <Heading size="lg">Stay Updated</Heading>
                            <Text color="gray.600" fontSize="lg">
                                Subscribe to our newsletter to receive updates, news, and exclusive offers!
                            </Text>
                            <HStack w="full">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    style={{
                                        padding: '14px 18px',
                                        borderRadius: '8px',
                                        border: '1px solid #E2E8F0',
                                        width: '100%',
                                        fontSize: '1.1rem'
                                    }}
                                />
                                <Button colorScheme="teal" size="lg" px={8} shadow="md">Subscribe</Button>
                            </HStack>
                        </VStack>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;