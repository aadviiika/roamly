import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  useColorModeValue,
  Card,
  CardBody,
  Image,
  Text,
  HStack,
  IconButton,
  useToast,
  Link,
  Tooltip,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon, ExternalLinkIcon } from '@chakra-ui/icons';

export default function NewItinerary() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [destinations, setDestinations] = useState(['']);
  const [activities, setActivities] = useState(['']);
  const [coverImage, setCoverImage] = useState('');
  const toast = useToast();

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleAddDestination = () => {
    setDestinations([...destinations, '']);
  };

  const handleRemoveDestination = (index) => {
    const newDestinations = destinations.filter((_, i) => i !== index);
    setDestinations(newDestinations);
  };

  const handleDestinationChange = (index, value) => {
    const newDestinations = [...destinations];
    newDestinations[index] = value;
    setDestinations(newDestinations);
  };

  const handleAddActivity = () => {
    setActivities([...activities, '']);
  };

  const handleRemoveActivity = (index) => {
    const newActivities = activities.filter((_, i) => i !== index);
    setActivities(newActivities);
  };

  const handleActivityChange = (index, value) => {
    const newActivities = [...activities];
    newActivities[index] = value;
    setActivities(newActivities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    toast({
      title: 'Itinerary Created',
      description: "We've created your itinerary for you.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const getGoogleMapsUrl = (destination) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="lg" mb={6}>Create New Itinerary</Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {/* Form Section */}
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter itinerary title"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your itinerary"
                      rows={4}
                    />
                  </FormControl>

                  <SimpleGrid columns={2} spacing={4} w="full">
                    <FormControl isRequired>
                      <FormLabel>Budget ($)</FormLabel>
                      <NumberInput
                        value={budget}
                        onChange={(value) => setBudget(value)}
                        min={0}
                      >
                        <NumberInputField placeholder="Enter budget" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Duration (Days)</FormLabel>
                      <NumberInput
                        value={duration}
                        onChange={(value) => setDuration(value)}
                        min={1}
                      >
                        <NumberInputField placeholder="Number of days" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </SimpleGrid>

                  <FormControl>
                    <FormLabel>Cover Image URL</FormLabel>
                    <Input
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="Enter image URL"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Destinations</FormLabel>
                    <VStack spacing={2}>
                      {destinations.map((destination, index) => (
                        <HStack key={index} w="full">
                          <Input
                            value={destination}
                            onChange={(e) => handleDestinationChange(index, e.target.value)}
                            placeholder="Enter destination"
                          />
                          {destination && (
                            <Tooltip label="View on Google Maps" hasArrow>
                              <Link
                                href={getGoogleMapsUrl(destination)}
                                isExternal
                                color="teal.500"
                              >
                                <ExternalLinkIcon mx="2px" />
                              </Link>
                            </Tooltip>
                          )}
                          {destinations.length > 1 && (
                            <IconButton
                              icon={<CloseIcon />}
                              onClick={() => handleRemoveDestination(index)}
                              colorScheme="red"
                              variant="ghost"
                              size="sm"
                            />
                          )}
                        </HStack>
                      ))}
                      <Button
                        leftIcon={<AddIcon />}
                        onClick={handleAddDestination}
                        size="sm"
                        alignSelf="start"
                      >
                        Add Destination
                      </Button>
                    </VStack>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Activities</FormLabel>
                    <VStack spacing={2}>
                      {activities.map((activity, index) => (
                        <HStack key={index} w="full">
                          <Input
                            value={activity}
                            onChange={(e) => handleActivityChange(index, e.target.value)}
                            placeholder="Enter activity"
                          />
                          {activities.length > 1 && (
                            <IconButton
                              icon={<CloseIcon />}
                              onClick={() => handleRemoveActivity(index)}
                              colorScheme="red"
                              variant="ghost"
                              size="sm"
                            />
                          )}
                        </HStack>
                      ))}
                      <Button
                        leftIcon={<AddIcon />}
                        onClick={handleAddActivity}
                        size="sm"
                        alignSelf="start"
                      >
                        Add Activity
                      </Button>
                    </VStack>
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="teal"
                    size="lg"
                    w="full"
                    mt={4}
                  >
                    Create Itinerary
                  </Button>
                </VStack>
              </form>
            </CardBody>
          </Card>

          {/* Preview Section */}
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Heading size="md" mb={2}>Preview</Heading>
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  bg={cardBg}
                >
                  <Image
                    src={coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                    alt="Cover"
                    height="200px"
                    width="100%"
                    objectFit="cover"
                  />
                  <Box p={6}>
                    <Heading size="md" mb={2}>{title || 'Itinerary Title'}</Heading>
                    <Text color="gray.600" mb={4}>
                      {description || 'Your itinerary description will appear here'}
                    </Text>
                    {destinations.length > 0 && destinations[0] && (
                      <VStack align="stretch" mb={4} spacing={2}>
                        <Text fontWeight="semibold">Destinations:</Text>
                        {destinations.map((dest, index) => (
                          dest && (
                            <Link
                              key={index}
                              href={getGoogleMapsUrl(dest)}
                              isExternal
                              color="teal.500"
                              fontSize="sm"
                            >
                              {dest} <ExternalLinkIcon mx="2px" />
                            </Link>
                          )
                        ))}
                      </VStack>
                    )}
                    {budget && (
                      <Text fontWeight="bold" fontSize="xl" color="teal.500">
                        ${budget}
                      </Text>
                    )}
                    {duration && (
                      <Text color="gray.600">
                        Duration: {duration} days
                      </Text>
                    )}
                  </Box>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
