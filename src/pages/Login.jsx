import React, { useState } from 'react';
import { Box, Heading, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = () => {
    if (email === 'admin@example.com' && password === 'admin') {
      login({ email: 'admin@example.com', isAdmin: true });
      navigate('/admin');
    } else if (email === 'user@example.com' && password === 'user') {
      login({ email: 'user@example.com', isAdmin: false });
      navigate('/orders');
    } else {
      toast({
        title: 'Login failed.',
        description: 'Invalid email or password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxWidth="400px" mx="auto">
      <Heading mb={6}>Login</Heading>
      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="teal" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
