import { Box, Container, SimpleGrid, Input, InputGroup, InputLeftElement, VStack } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import ItineraryCard from '../components/ItineraryCard';

// Dummy data for demonstration
const dummyItineraries = [
  {
    title: "Tokyo Adventure",
    description: "Explore the vibrant streets of Tokyo, from traditional temples to modern districts.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1371&q=80",
    rating: 4.5,
    budget: 2500,
  },
  {
    title: "Paris Romance",
    description: "Experience the magic of Paris with this carefully curated romantic getaway.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1373&q=80",
    rating: 4.8,
    budget: 3000,
  },
  {
    title: "Bali Relaxation",
    description: "Unwind in paradise with this relaxing Bali itinerary featuring beaches and temples.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1377&q=80",
    rating: 4.7,
    budget: 1800,
  },
];

export default function Home() {
  return (
    <Box pt="80px" minH="100vh">
      <Container maxW="1200px">
        <VStack spacing={8} w="100%">
          <InputGroup size="lg" maxW="600px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search itineraries..."
              borderRadius="full"
              bg="white"
              _dark={{ bg: 'gray.700' }}
            />
          </InputGroup>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            w="100%"
            py={8}
          >
            {dummyItineraries.map((itinerary, index) => (
              <ItineraryCard key={index} {...itinerary} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
