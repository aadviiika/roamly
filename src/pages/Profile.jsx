import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Avatar,
  Button,
  useColorModeValue,
  Card,
  CardBody,
  SimpleGrid,
  Progress,
  Badge,
  Divider,
  IconButton,
  Tooltip,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
} from '@chakra-ui/react';
import { EditIcon, SettingsIcon } from '@chakra-ui/icons';
import { FaMapMarkedAlt, FaPassport, FaLanguage, FaHotel } from 'react-icons/fa';
import ItineraryCard from '../components/ItineraryCard';

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const statBg = useColorModeValue('teal.50', 'gray.700');

  // Dummy data
  const userData = {
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    location: 'San Francisco, CA',
    bio: 'Adventure seeker | Photography enthusiast | World explorer',
    languages: ['English', 'Spanish', 'French'],
    travelStyle: ['Adventure', 'Cultural', 'Luxury'],
    stats: {
      countries: 25,
      trips: 48,
      reviews: 156,
    },
  };

  const recentTrips = [
    {
      id: 1,
      title: 'Paris Adventure',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: 'Dec 2024',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Tokyo Explorer',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: 'Nov 2024',
      rating: 4.9,
    },
    {
      id: 3,
      title: 'New York City',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: 'Oct 2024',
      rating: 4.7,
    },
  ];

  const achievements = [
    { title: 'Globetrotter', progress: 80, total: 50, current: 40 },
    { title: 'Culture Explorer', progress: 65, total: 30, current: 20 },
    { title: 'Photo Master', progress: 90, total: 100, current: 90 },
  ];

  const upcomingTrips = [
    {
      destination: 'Bali, Indonesia',
      date: 'Mar 15 - Mar 25, 2025',
      status: 'Confirmed',
    },
    {
      destination: 'Swiss Alps',
      date: 'Jun 1 - Jun 10, 2025',
      status: 'Planning',
    },
  ];

  // Dummy data for favorites
  const favoriteItineraries = [
    {
      id: 1,
      title: 'Cultural Tour of Kyoto',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.8,
      budget: 2500,
      description: 'Experience the ancient traditions of Japan in this comprehensive tour of Kyoto\'s temples and gardens.',
      initialFavorite: true
    },
    {
      id: 2,
      title: 'Greek Islands Escape',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.9,
      budget: 3000,
      description: 'Island hopping adventure through the stunning Cyclades islands.',
      initialFavorite: true
    },
    {
      id: 3,
      title: 'Safari Adventure',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.7,
      budget: 4500,
      description: 'Experience the wildlife of Africa in this unforgettable safari adventure.',
      initialFavorite: true
    }
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
        {/* Left Column - Profile Info */}
        <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={6}>
              <Box position="relative" w="full">
                <Avatar
                  size="2xl"
                  src={userData.avatar}
                  name={userData.name}
                  mb={4}
                />
                <Tooltip label="Edit Profile">
                  <IconButton
                    icon={<EditIcon />}
                    position="absolute"
                    top={0}
                    right={0}
                    colorScheme="teal"
                    variant="ghost"
                    size="sm"
                  />
                </Tooltip>
              </Box>
              
              <VStack spacing={2} textAlign="center">
                <Heading size="lg">{userData.name}</Heading>
                <Text color="gray.500">{userData.location}</Text>
                <Text>{userData.bio}</Text>
              </VStack>

              <Divider />

              <VStack align="stretch" w="full" spacing={4}>
                <HStack>
                  <FaLanguage size="1.5em" />
                  <Text fontWeight="bold">Languages</Text>
                </HStack>
                <HStack spacing={2}>
                  {userData.languages.map((lang) => (
                    <Badge key={lang} colorScheme="teal" variant="subtle">
                      {lang}
                    </Badge>
                  ))}
                </HStack>

                <HStack>
                  <FaPassport size="1.5em" />
                  <Text fontWeight="bold">Travel Style</Text>
                </HStack>
                <HStack spacing={2} flexWrap="wrap">
                  {userData.travelStyle.map((style) => (
                    <Badge key={style} colorScheme="purple" variant="subtle">
                      {style}
                    </Badge>
                  ))}
                </HStack>
              </VStack>

              <StatGroup bg={statBg} p={4} borderRadius="lg" w="full">
                <Stat textAlign="center">
                  <StatLabel>Countries</StatLabel>
                  <StatNumber>{userData.stats.countries}</StatNumber>
                </Stat>
                <Stat textAlign="center">
                  <StatLabel>Trips</StatLabel>
                  <StatNumber>{userData.stats.trips}</StatNumber>
                </Stat>
                <Stat textAlign="center">
                  <StatLabel>Reviews</StatLabel>
                  <StatNumber>{userData.stats.reviews}</StatNumber>
                </Stat>
              </StatGroup>
            </VStack>
          </CardBody>
        </Card>

        {/* Middle and Right Columns */}
        <Box gridColumn={{ lg: '2 / span 2' }}>
          <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
            <CardBody>
              <Tabs colorScheme="teal" onChange={setActiveTab}>
                <TabList>
                  <Tab>Recent Trips</Tab>
                  <Tab>Upcoming</Tab>
                  <Tab>Favorites</Tab>
                  <Tab>Achievements</Tab>
                </TabList>

                <TabPanels>
                  {/* Recent Trips Panel */}
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                      {recentTrips.map((trip) => (
                        <Card key={trip.id} overflow="hidden">
                          <Image
                            src={trip.image}
                            alt={trip.title}
                            height="200px"
                            objectFit="cover"
                          />
                          <CardBody>
                            <VStack align="stretch" spacing={2}>
                              <Heading size="md">{trip.title}</Heading>
                              <HStack justify="space-between">
                                <Text color="gray.500">{trip.date}</Text>
                                <Badge colorScheme="yellow">
                                  ★ {trip.rating}
                                </Badge>
                              </HStack>
                            </VStack>
                          </CardBody>
                        </Card>
                      ))}
                    </SimpleGrid>
                  </TabPanel>

                  {/* Upcoming Trips Panel */}
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      {upcomingTrips.map((trip, index) => (
                        <Card key={index} variant="outline">
                          <CardBody>
                            <HStack justify="space-between">
                              <VStack align="start" spacing={1}>
                                <Heading size="md">{trip.destination}</Heading>
                                <Text color="gray.500">{trip.date}</Text>
                              </VStack>
                              <Badge
                                colorScheme={
                                  trip.status === 'Confirmed' ? 'green' : 'yellow'
                                }
                              >
                                {trip.status}
                              </Badge>
                            </HStack>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  </TabPanel>

                  {/* Favorites Panel */}
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
                      {favoriteItineraries.map((itinerary) => (
                        <ItineraryCard
                          key={itinerary.id}
                          title={itinerary.title}
                          image={itinerary.image}
                          rating={itinerary.rating}
                          budget={itinerary.budget}
                          description={itinerary.description}
                          initialFavorite={itinerary.initialFavorite}
                        />
                      ))}
                    </SimpleGrid>
                  </TabPanel>

                  {/* Achievements Panel */}
                  <TabPanel>
                    <VStack spacing={6} align="stretch">
                      {achievements.map((achievement) => (
                        <Box key={achievement.title}>
                          <HStack justify="space-between" mb={2}>
                            <Text fontWeight="bold">{achievement.title}</Text>
                            <Text color="gray.500">
                              {achievement.current}/{achievement.total}
                            </Text>
                          </HStack>
                          <Progress
                            value={achievement.progress}
                            colorScheme="teal"
                            borderRadius="full"
                            size="sm"
                          />
                        </Box>
                      ))}
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
