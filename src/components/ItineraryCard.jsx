import { Box, Image, Heading, Text, HStack, Icon, IconButton, useColorModeValue } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ItineraryCard({ id, title, image, rating, budget, description, initialFavorite = false }) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const navigate = useNavigate();

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg', cursor: 'pointer' }}
      onClick={() => navigate(`/itinerary/${id}`)}
    >
      <Box position="relative">
        <Image
          src={image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
          alt={title}
          height="200px"
          width="100%"
          objectFit="cover"
        />
        <IconButton
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          icon={<Icon as={isFavorite ? AiFillHeart : AiOutlineHeart} boxSize="1.5em" />}
          position="absolute"
          top="4"
          right="4"
          colorScheme="pink"
          variant={isFavorite ? 'solid' : 'ghost'}
          size="md"
          onClick={handleFavorite}
          _hover={{
            transform: 'scale(1.1)',
          }}
          transition="all 0.2s"
        />
      </Box>

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
        </HStack>
      </Box>
    </Box>
  );
}
