import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Image,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  Button,
  Avatar,
  Divider,
  Icon,
  useColorModeValue,
  SimpleGrid,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaHeart, FaShare, FaUserFriends } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { MdAttachMoney } from 'react-icons/md';
import HotelCard from '../components/HotelCard';

// Expanded dummy data with more details
const dummyItineraries = {
  1: {
    title: "Tokyo Adventure",
    description: "Explore the vibrant streets of Tokyo, from traditional temples to modern districts.",
    fullDescription: "Immerse yourself in the perfect blend of traditional and modern Japan with this carefully curated Tokyo adventure. From the serene Meiji Shrine to the bustling Shibuya Crossing, experience the many faces of Tokyo. Visit ancient temples, explore modern art museums, and indulge in the world's finest sushi.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1371&q=80",
    rating: 4.5,
    budget: 2500,
    tags: ["Japan", "City", "Culture", "Food", "Shopping"],
    location: "Tokyo, Japan",
    duration: "7 days",
    groupSize: "2-4 people",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 4.8,
      trips: 45
    },
    dailySchedule: [
      {
        day: 1,
        title: "Arrival & Traditional Tokyo",
        activities: [
          "Arrive at Narita International Airport",
          "Visit Senso-ji Temple in Asakusa",
          "Evening street food tour in Ueno"
        ]
      },
      {
        day: 2,
        title: "Modern Tokyo Experience",
        activities: [
          "Morning visit to Tsukiji Outer Market",
          "Explore Harajuku and Takeshita Street",
          "Evening at Shibuya Crossing and Sky Tree"
        ]
      },
      {
        day: 3,
        title: "Cultural Immersion",
        activities: [
          "Tea ceremony experience",
          "Visit Meiji Shrine",
          "Explore Akihabara Electric Town"
        ]
      }
    ],
    highlights: [
      "Experience authentic tea ceremony",
      "Visit top-rated sushi restaurants",
      "Explore ancient temples and modern architecture",
      "Shop in trendy districts",
      "Learn about Japanese culture and traditions"
    ],
    recommendedStays: [
      {
        name: "Park Hyatt Tokyo",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
        rating: 4.8,
        price: 450,
        reviews: 1250,
        description: "Luxury hotel featuring stunning views of Tokyo, exceptional service, and world-class dining options.",
        amenities: ["wifi", "pool", "parking", "breakfast", "gym"],
        bookingLink: "https://example.com/book-park-hyatt-tokyo"
      },
      {
        name: "Mandarin Oriental Tokyo",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
        rating: 4.9,
        price: 550,
        reviews: 980,
        description: "Contemporary luxury in the heart of Tokyo with spectacular city views and award-winning restaurants.",
        amenities: ["wifi", "pool", "parking", "breakfast", "gym"],
        bookingLink: "https://example.com/book-mandarin-oriental-tokyo"
      },
      {
        name: "Asakusa View Hotel",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
        rating: 4.5,
        price: 200,
        reviews: 2100,
        description: "Traditional Japanese hospitality with modern amenities, located in the historic Asakusa district.",
        amenities: ["wifi", "parking", "breakfast"],
        bookingLink: "https://example.com/book-asakusa-view"
      },
      {
        name: "Tokyu Stay Shinjuku",
        image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
        rating: 4.3,
        price: 150,
        reviews: 1850,
        description: "Modern and convenient accommodation in the vibrant Shinjuku area, perfect for business and leisure.",
        amenities: ["wifi", "parking"],
        bookingLink: "https://example.com/book-tokyu-stay"
      },
      {
        name: "The Strings by InterContinental",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
        rating: 4.7,
        price: 350,
        reviews: 750,
        description: "Sophisticated urban retreat offering personalized service and stunning views of Tokyo Bay.",
        amenities: ["wifi", "pool", "parking", "breakfast", "gym"],
        bookingLink: "https://example.com/book-strings-intercontinental"
      }
    ]
  },
  2: {
    title: "Paris Romance",
    description: "Experience the magic of Paris with this carefully curated romantic getaway.",
    fullDescription: "Fall in love with the City of Light through this romantic journey that takes you through charming neighborhoods, iconic landmarks, and hidden gems. From sunrise at the Eiffel Tower to sunset river cruises on the Seine, every moment is designed to create unforgettable memories.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1373&q=80",
    rating: 4.8,
    budget: 3000,
    tags: ["France", "Romance", "Culture", "Food", "Art"],
    location: "Paris, France",
    duration: "6 days",
    groupSize: "2 people",
    author: {
      name: "Jean-Luc Dubois",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 4.9,
      trips: 62
    },
    dailySchedule: [
      {
        day: 1,
        title: "Arrival & First Impressions",
        activities: [
          "Arrive at Charles de Gaulle Airport",
          "Evening stroll in Montmartre",
          "Dinner at a cozy bistro"
        ]
      },
      {
        day: 2,
        title: "Classic Paris",
        activities: [
          "Morning at the Louvre",
          "Lunch in the Tuileries Garden",
          "Sunset at the Eiffel Tower"
        ]
      },
      {
        day: 3,
        title: "Hidden Paris",
        activities: [
          "Visit to Le Marais district",
          "Wine tasting experience",
          "Seine River dinner cruise"
        ]
      }
    ],
    highlights: [
      "Skip-the-line access to major attractions",
      "Private wine tasting session",
      "Romantic Seine dinner cruise",
      "Guided tours of historic neighborhoods",
      "Exclusive restaurant reservations"
    ],
    recommendedStays: [
      {
        name: "Four Seasons Hotel George V",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
        rating: 4.9,
        price: 850,
        reviews: 1500,
        description: "Iconic luxury hotel steps from the Champs-Élysées with elegant rooms and Michelin-starred dining.",
        amenities: ["wifi", "pool", "parking", "breakfast", "gym"],
        bookingLink: "https://example.com/book-four-seasons-paris"
      },
      {
        name: "Le Marais Boutique Hotel",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
        rating: 4.6,
        price: 300,
        reviews: 890,
        description: "Charming boutique hotel in the heart of Le Marais, featuring unique rooms and local character.",
        amenities: ["wifi", "breakfast"],
        bookingLink: "https://example.com/book-marais-boutique"
      },
      {
        name: "Citadines Saint-Germain-des-Prés",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
        rating: 4.4,
        price: 250,
        reviews: 2200,
        description: "Modern aparthotel on the Left Bank, offering comfortable rooms and excellent value.",
        amenities: ["wifi", "parking", "gym"],
        bookingLink: "https://example.com/book-citadines"
      },
      {
        name: "Hôtel du Louvre",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
        rating: 4.7,
        price: 450,
        reviews: 1100,
        description: "Historic hotel in central Paris, combining classic architecture with modern comfort.",
        amenities: ["wifi", "parking", "breakfast", "gym"],
        bookingLink: "https://example.com/book-hotel-louvre"
      },
      {
        name: "Le Petit Montmartre",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
        rating: 4.3,
        price: 180,
        reviews: 750,
        description: "Cozy hotel in artistic Montmartre, offering authentic Parisian experience at great value.",
        amenities: ["wifi", "breakfast"],
        bookingLink: "https://example.com/book-petit-montmartre"
      }
    ]
  }
  // Add more itineraries as needed
};

export default function ItineraryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const itinerary = dummyItineraries[id];
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (!itinerary) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={4}>
          <Heading>Itinerary Not Found</Heading>
          <Button onClick={() => navigate('/')} leftIcon={<BiArrowBack />}>
            Return to Home
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Box minH="100vh" pt="80px">
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* Header Section */}
          <HStack justify="space-between" w="100%">
            <IconButton
              icon={<BiArrowBack />}
              onClick={() => navigate('/')}
              variant="ghost"
              aria-label="Back"
            />
            <HStack>
              <Tooltip label="Share Itinerary">
                <IconButton
                  icon={<FaShare />}
                  variant="ghost"
                  aria-label="Share"
                />
              </Tooltip>
              <Tooltip label="Save to Favorites">
                <IconButton
                  icon={<FaHeart />}
                  variant="ghost"
                  colorScheme="pink"
                  aria-label="Favorite"
                />
              </Tooltip>
            </HStack>
          </HStack>

          {/* Main Image */}
          <Box position="relative" h="400px" overflow="hidden" borderRadius="xl">
            <Image
              src={itinerary.image}
              alt={itinerary.title}
              objectFit="cover"
              w="100%"
              h="100%"
            />
          </Box>

          {/* Title and Rating Section */}
          <VStack align="stretch" spacing={4}>
            <HStack justify="space-between" wrap="wrap">
              <Heading size="xl">{itinerary.title}</Heading>
              <HStack spacing={2}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < Math.floor(itinerary.rating) ? 'yellow.400' : 'gray.300'}
                  />
                ))}
                <Text>({itinerary.rating})</Text>
              </HStack>
            </HStack>
            <HStack spacing={4} wrap="wrap">
              <HStack>
                <Icon as={FaMapMarkerAlt} color="teal.500" />
                <Text>{itinerary.location}</Text>
              </HStack>
              <HStack>
                <Icon as={FaCalendarAlt} color="teal.500" />
                <Text>{itinerary.duration}</Text>
              </HStack>
              <HStack>
                <Icon as={MdAttachMoney} color="teal.500" />
                <Text>${itinerary.budget}</Text>
              </HStack>
              <HStack>
                <Icon as={FaUserFriends} color="teal.500" />
                <Text>{itinerary.groupSize}</Text>
              </HStack>
            </HStack>
          </VStack>

          {/* Author Section */}
          <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
            <HStack spacing={4}>
              <Avatar src={itinerary.author.avatar} size="lg" />
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">{itinerary.author.name}</Text>
                <HStack spacing={2}>
                  <StarIcon color="yellow.400" />
                  <Text>{itinerary.author.rating} rating</Text>
                  <Text>•</Text>
                  <Text>{itinerary.author.trips} trips created</Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>

          {/* Tags */}
          <HStack spacing={2} wrap="wrap">
            {itinerary.tags.map((tag) => (
              <Tag key={tag} size="md" colorScheme="teal" variant="subtle">
                {tag}
              </Tag>
            ))}
          </HStack>

          {/* Description */}
          <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')}>
            {itinerary.fullDescription}
          </Text>

          <Divider />

          {/* Highlights */}
          <VStack align="stretch" spacing={4}>
            <Heading size="md">Highlights</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {itinerary.highlights.map((highlight, index) => (
                <HStack key={index} spacing={2}>
                  <Icon as={StarIcon} color="teal.500" />
                  <Text>{highlight}</Text>
                </HStack>
              ))}
            </SimpleGrid>
          </VStack>

          {/* Recommended Stays Section */}
          <VStack align="stretch" spacing={4}>
            <Heading size="md">Recommended Stays</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Top-rated accommodations in {itinerary.location}
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {itinerary.recommendedStays.map((hotel, index) => (
                <HotelCard key={index} hotel={hotel} />
              ))}
            </SimpleGrid>
          </VStack>

          {/* Daily Schedule */}
          <VStack align="stretch" spacing={4}>
            <Heading size="md">Daily Schedule</Heading>
            {itinerary.dailySchedule.map((day) => (
              <Box
                key={day.day}
                p={4}
                bg={bgColor}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <VStack align="stretch" spacing={3}>
                  <HStack justify="space-between">
                    <Heading size="sm">Day {day.day}</Heading>
                    <Text fontWeight="bold">{day.title}</Text>
                  </HStack>
                  <VStack align="stretch" pl={4}>
                    {day.activities.map((activity, index) => (
                      <HStack key={index} spacing={2}>
                        <Icon as={FaClock} color="teal.500" />
                        <Text>{activity}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </Box>
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
