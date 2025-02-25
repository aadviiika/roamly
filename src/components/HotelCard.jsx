import React from 'react';
import {
  Box,
  Image,
  Text,
  HStack,
  VStack,
  Icon,
  Badge,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { FaWifi, FaSwimmingPool, FaParking, FaCoffee, FaDumbbell } from 'react-icons/fa';

const amenityIcons = {
  wifi: FaWifi,
  pool: FaSwimmingPool,
  parking: FaParking,
  breakfast: FaCoffee,
  gym: FaDumbbell,
};

export default function HotelCard({ hotel }) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      borderColor={borderColor}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
    >
      <Image
        src={hotel.image}
        alt={hotel.name}
        height="200px"
        width="100%"
        objectFit="cover"
      />
      
      <Box p={4}>
        <VStack align="stretch" spacing={2}>
          <HStack justify="space-between">
            <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
              {hotel.name}
            </Text>
            <Badge colorScheme={hotel.price <= 200 ? 'green' : hotel.price <= 500 ? 'orange' : 'red'}>
              ${hotel.price}/night
            </Badge>
          </HStack>

          <HStack spacing={1}>
            {Array(5).fill('').map((_, i) => (
              <StarIcon
                key={i}
                color={i < hotel.rating ? 'yellow.400' : 'gray.300'}
                size="sm"
              />
            ))}
            <Text color="gray.600" fontSize="sm">
              ({hotel.reviews} reviews)
            </Text>
          </HStack>

          <Text fontSize="sm" color="gray.600" noOfLines={2}>
            {hotel.description}
          </Text>

          <HStack spacing={3}>
            {hotel.amenities.map((amenity) => (
              <Icon
                key={amenity}
                as={amenityIcons[amenity]}
                color="teal.500"
                title={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
              />
            ))}
          </HStack>

          <Link
            href={hotel.bookingLink}
            isExternal
            color="teal.500"
            fontWeight="semibold"
            fontSize="sm"
          >
            View Details →
          </Link>
        </VStack>
      </Box>
    </Box>
  );
}
