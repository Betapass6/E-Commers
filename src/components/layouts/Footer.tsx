import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

const Footer: React.FC = () => {
    return (
        <Box as="footer" py={4} textAlign="center" bg="gray.100">
            <Text fontSize="sm">
                &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </Text>
            <Link href="/terms" color="blue.500" mx={2}>
                Terms of Service
            </Link>
            <Link href="/privacy" color="blue.500" mx={2}>
                Privacy Policy
            </Link>
        </Box>
    );
};

export default Footer;