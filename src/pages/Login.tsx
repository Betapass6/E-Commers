import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  Text,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const MAX_ATTEMPTS = 3;
const LOCKOUT_TIME = 1000 * 60 * 15; // 15 minutes

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(() => {
    const saved = localStorage.getItem('login_attempts');
    return saved ? JSON.parse(saved) : { count: 0, timestamp: 0 };
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const isLocked = attempts.count >= MAX_ATTEMPTS && 
    (Date.now() - attempts.timestamp) < LOCKOUT_TIME;

  useEffect(() => {
    localStorage.setItem('login_attempts', JSON.stringify(attempts));
  }, [attempts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) {
      const remainingTime = Math.ceil((LOCKOUT_TIME - (Date.now() - attempts.timestamp)) / 1000 / 60);
      toast({
        title: 'Account locked',
        description: `Too many failed attempts. Try again in ${remainingTime} minutes.`,
        status: 'error',
        duration: 3000,
      });
      return;
    }

    const success = login(username, password);
    
    if (success) {
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 2000,
      });
      setAttempts({ count: 0, timestamp: 0 });
      const from = location.state?.from?.pathname || '/';
      navigate(from);
    } else {
      const newAttempts = {
        count: attempts.count + 1,
        timestamp: Date.now()
      };
      setAttempts(newAttempts);
      
      toast({
        title: 'Login failed',
        description: `Invalid credentials. ${MAX_ATTEMPTS - newAttempts.count} attempts remaining.`,
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <VStack spacing={8} as="form" onSubmit={handleSubmit}>
        <Heading>Login</Heading>
        {isLocked && (
          <Text color="red.500">
            Account locked. Try again in {
              Math.ceil((LOCKOUT_TIME - (Date.now() - attempts.timestamp)) / 1000 / 60)
            } minutes.
          </Text>
        )}
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isDisabled={isLocked}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isDisabled={isLocked}
            />
            <InputRightElement>
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                icon={showPassword ? (React.createElement(FaEyeSlash as any)) : (React.createElement(FaEye as any))}
                size="sm"
                variant="ghost"
                onClick={() => setShowPassword((show) => !show)}
                tabIndex={-1}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button 
          type="submit" 
          colorScheme="teal" 
          width="full"
          isDisabled={isLocked}
        >
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;