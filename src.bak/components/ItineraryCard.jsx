import { Box, Image, Heading, Text, HStack, Icon, Button, useColorModeValue } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { AiOutlineHeart } from 'react-icons/ai';

export default function ItineraryCard({ title, image, rating, budget, description }) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
    >
      <Image
        src={image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
        alt={title}
        height="200px"
        width="100%"
        objectFit="cover"
      />

      <Box p={6}>
        <Box d="flex" alignItems="baseline">
          <HStack spacing={2} mb={2}>
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                color={i < Math.floor(rating) ? 'yellow.400' : 'gray.300'}
              />
            ))}
          </HStack>
        </Box>

        <Heading size="md" mb={2}>{title}</Heading>
        <Text color={textColor} mb={4} noOfLines={2}>
          {description}
        </Text>

        <HStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold" fontSize="xl" color="teal.500">
            ${budget}
          </Text>
          <Button
            rightIcon={<Icon as={AiOutlineHeart} />}
            colorScheme="pink"
            variant="ghost"
            size="sm"
          >
            Favorite
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
