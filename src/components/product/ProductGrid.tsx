import React from 'react';
import ProductCard from './ProductCard';
import { SimpleGrid } from '@chakra-ui/react';
import { Product } from '../../types';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductGrid;