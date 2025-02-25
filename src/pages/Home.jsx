import { Box, Container, SimpleGrid, Input, InputGroup, InputLeftElement, VStack, Text, Heading } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import ItineraryCard from '../components/ItineraryCard';
import { useState, useMemo } from 'react';

// Dummy data for demonstration
const dummyItineraries = [
  {
    id: 1,
    title: "Tokyo Adventure",
    description: "Explore the vibrant streets of Tokyo, from traditional temples to modern districts.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1371&q=80",
    rating: 4.5,
    budget: 2500,
    tags: ["Japan", "City", "Culture", "Food", "Shopping"],
    location: "Tokyo, Japan"
  },
  {
    id: 2,
    title: "Paris Romance",
    description: "Experience the magic of Paris with this carefully curated romantic getaway.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1373&q=80",
    rating: 4.8,
    budget: 3000,
    tags: ["France", "Romance", "Culture", "Food", "Art"],
    location: "Paris, France"
  },
  {
    id: 3,
    title: "Bali Relaxation",
    description: "Unwind in paradise with this relaxing Bali itinerary featuring beaches and temples.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1377&q=80",
    rating: 4.7,
    budget: 1800,
    tags: ["Indonesia", "Beach", "Relaxation", "Culture", "Nature"],
    location: "Bali, Indonesia"
  },
  {
    id: 4,
    title: "New York City Explorer",
    description: "Discover the best of NYC with this comprehensive city guide and itinerary.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    rating: 4.6,
    budget: 2800,
    tags: ["USA", "City", "Culture", "Food", "Shopping"],
    location: "New York, USA"
  },
  {
    id: 5,
    title: "Swiss Alps Adventure",
    description: "Experience the majestic Swiss Alps with this outdoor adventure itinerary.",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    rating: 4.9,
    budget: 3500,
    tags: ["Switzerland", "Mountains", "Adventure", "Nature", "Sports"],
    location: "Swiss Alps, Switzerland"
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItineraries = useMemo(() => {
    if (!searchQuery) return dummyItineraries;

    const query = searchQuery.toLowerCase();
    return dummyItineraries.filter(itinerary => {
      const searchableText = [
        itinerary.title,
        itinerary.description,
        itinerary.location,
        ...itinerary.tags
      ].join(' ').toLowerCase();

      // Check if the query matches any part of the searchable text
      const matchesText = searchableText.includes(query);

      // Check if the query is a number and matches the budget range (+/- 500)
      const queryNumber = parseFloat(query);
      const matchesBudget = !isNaN(queryNumber) && 
        Math.abs(itinerary.budget - queryNumber) <= 500;

      // Check if the query matches the rating
      const matchesRating = !isNaN(queryNumber) && 
        queryNumber <= 5 && 
        Math.abs(itinerary.rating - queryNumber) <= 0.2;

      return matchesText || matchesBudget || matchesRating;
    });
  }, [searchQuery]);

  return (
    <Box pt="80px" minH="100vh">
      <Container maxW="1200px">
        <VStack spacing={8} w="100%">
          <VStack spacing={4} w="100%" align="center">
            <Heading size="lg" textAlign="center">
              Discover Amazing Travel Itineraries
            </Heading>
            <Text color="gray.600" _dark={{ color: 'gray.400' }} textAlign="center" maxW="600px">
              Search by destination, activity, budget, or rating to find your perfect travel plan
            </Text>
            <InputGroup size="lg" maxW="600px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try 'Tokyo', 'Beach', '4.5 rating' or 'under 2000'"
                borderRadius="full"
                bg="white"
                _dark={{ bg: 'gray.700' }}
              />
            </InputGroup>
          </VStack>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            w="100%"
            py={8}
          >
            {filteredItineraries.length > 0 ? (
              filteredItineraries.map((itinerary) => (
                <ItineraryCard key={itinerary.id} {...itinerary} />
              ))
            ) : (
              <Box gridColumn="1/-1" textAlign="center" py={8}>
                <Text fontSize="lg" color="gray.600" _dark={{ color: 'gray.400' }}>
                  No itineraries found matching your search. Try different keywords or filters.
                </Text>
              </Box>
            )}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
