import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Heading,
  Container,
  Spinner,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  HStack,
  VStack,
  Icon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Checkbox,
  CheckboxGroup,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Divider
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import ProductCard from '../components/product/ProductCard';
import useProducts from '../hooks/useProducts';

const Products: React.FC = () => {
    const { products, loading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Filter and sort logic
  let filtered = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchesColor = selectedColors.length === 0 || (p.colors?.some(color => selectedColors.includes(color)) ?? false);
    const matchesCategory = selectedCategories.length === 0 || (p.category ? selectedCategories.includes(p.category) : false);
    const matchesRating = selectedRatings.length === 0 || (p.rating ? selectedRatings.includes(Math.floor(p.rating)) : false);
    return matchesSearch && matchesPrice && matchesColor && matchesCategory && matchesRating;
  });

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'name-asc') filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  if (sort === 'name-desc') filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));

  const allColors = Array.from(new Set(products.flatMap(p => p.colors || [])));
  const allCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean) as string[]));

        return (
    <Box bg={"gray.50"} minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={6} mb={8}>
          <Heading as="h1" size="2xl" textAlign="center">
            Our Products
          </Heading>
          <Text fontSize="lg" color="gray.600" textAlign="center">
            Browse our latest and greatest products. Use the search and sort options to find what you need!
          </Text>
        </VStack>
        <HStack mb={8} spacing={4} flexWrap="wrap" justify="space-between">
          <InputGroup maxW={{ base: '100%', md: '350px' }}>
            <InputLeftElement pointerEvents="none">
              <Icon as={SearchIcon} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              bg="white"
              borderRadius="lg"
              shadow="sm"
            />
          </InputGroup>
          <Select
            maxW={{ base: '100%', md: '200px' }}
            value={sort}
            onChange={e => setSort(e.target.value)}
            bg="white"
            borderRadius="lg"
            shadow="sm"
          >
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </Select>
        </HStack>
        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
          <Box w={{ base: '100%', md: '250px' }} bg="white" p={4} borderRadius="lg" shadow="sm">
            <Accordion allowMultiple defaultIndex={[0, 1, 2, 3]}>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="bold">Price Range</Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack spacing={4}>
                    <Slider
                      min={0}
                      max={500}
                      step={10}
                      value={priceRange[0]}
                      onChange={(val) => setPriceRange([val, priceRange[1]])}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <Slider
                      min={0}
                      max={500}
                      step={10}
                      value={priceRange[1]}
                      onChange={(val) => setPriceRange([priceRange[0], val])}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <HStack w="full">
                      <Input
                        type="number"
                        min={0}
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={e => {
                          const val = Math.max(0, Math.min(Number(e.target.value), priceRange[1]));
                          setPriceRange([val, priceRange[1]]);
                        }}
                        size="sm"
                        w="50%"
                        placeholder="Min"
                      />
                      <Text color="gray.400">-</Text>
                      <Input
                        type="number"
                        min={priceRange[0]}
                        max={500}
                        value={priceRange[1]}
                        onChange={e => {
                          const val = Math.min(500, Math.max(Number(e.target.value), priceRange[0]));
                          setPriceRange([priceRange[0], val]);
                        }}
                        size="sm"
                        w="50%"
                        placeholder="Max"
                      />
                    </HStack>
                    <Text>${priceRange[0]} - ${priceRange[1]}</Text>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="bold">Colors</Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <CheckboxGroup value={selectedColors} onChange={(val) => setSelectedColors(val as string[])}>
                    <VStack align="start" spacing={2}>
                      {allColors.map(color => (
                        <Checkbox key={color} value={color}>{color}</Checkbox>
                      ))}
                    </VStack>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="bold">Categories</Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <CheckboxGroup value={selectedCategories} onChange={(val) => setSelectedCategories(val as string[])}>
                    <VStack align="start" spacing={2}>
                      {allCategories.map(category => (
                        <Checkbox key={category} value={category}>{category}</Checkbox>
                      ))}
                    </VStack>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="bold">Rating</Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <CheckboxGroup value={selectedRatings} onChange={(val) => setSelectedRatings(val as number[])}>
                    <VStack align="start" spacing={2}>
                      {[4, 3, 2, 1].map(rating => (
                        <Checkbox key={rating} value={rating}>{rating}★ & Up</Checkbox>
                      ))}
                    </VStack>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
          <Box flex="1">
            {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
                <Spinner size="xl" />
            </Box>
            ) : error ? (
            <Box textAlign="center" py={10}>
                <Text color="red.500">{error}</Text>
            </Box>
            ) : filtered.length === 0 ? (
              <Box textAlign="center" py={20}>
                <Text fontSize="xl" color="gray.500">No products found. Try a different search or filter.</Text>
              </Box>
            ) : (
            <SimpleGrid 
                columns={{ base: 1, sm: 2, md: 3, lg: 3 }}
                spacing={8}
                px={{ base: 2, md: 0 }}
            >
                {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </SimpleGrid>
            )}
          </Box>
        </Flex>
        </Container>
    </Box>
    );
};

export default Products;