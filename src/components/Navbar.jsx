import { Box, Flex, Button, useColorMode, useColorModeValue, IconButton, Stack, HStack } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      navigate('/');
    } else {
      login();
    }
  };

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      zIndex="1000"
      px={4}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="1200px" mx="auto">
        <HStack spacing={8} alignItems="center">
          <Box fontSize="2xl" fontWeight="bold" color="teal.500">
            <Link to="/">Roamly</Link>
          </Box>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link to="/"><Button variant="ghost">Home</Button></Link>
            <Link to="/new"><Button variant="ghost">New</Button></Link>
            <Link to="/chat"><Button variant="ghost">Chat</Button></Link>
            {isLoggedIn && <Link to="/profile"><Button variant="ghost">Profile</Button></Link>}
          </HStack>
        </HStack>

        <Stack direction="row" spacing={4}>
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle color mode"
          />
          <Button colorScheme="teal" onClick={handleAuthClick}>
            {isLoggedIn ? 'Log Out' : 'Login'}
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
