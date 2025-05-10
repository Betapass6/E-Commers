import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import theme from './theme';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
