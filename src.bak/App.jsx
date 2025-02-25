import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, CSSReset, Box, extendTheme } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      500: '#319795',
      600: '#2C7A7B',
      900: '#1A4646',
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'light' ? 'gray.50' : 'gray.900',
      },
    }),
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Router>
        <Box minH="100vh">
          <Navbar />
          <Box as="main" pt="16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<Box p={8}>New Itinerary Page (Coming Soon)</Box>} />
              <Route path="/chat" element={<Box p={8}>Chat Page (Coming Soon)</Box>} />
              <Route path="/profile" element={<Box p={8}>Profile Page (Coming Soon)</Box>} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
