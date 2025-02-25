import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  HStack,
  Input,
  IconButton,
  Text,
  Avatar,
  AvatarBadge,
  useColorModeValue,
  Card,
  CardBody,
  Divider,
  InputGroup,
  InputRightElement,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import { SearchIcon, ArrowForwardIcon } from '@chakra-ui/icons';

// Dummy data for initial testing
const initialContacts = [
  {
    id: 1,
    name: 'Sarah Wilson',
    status: 'online',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    lastMessage: 'Hey, how about that trip to Paris?',
    unread: 2,
  },
  {
    id: 2,
    name: 'Travel Group: Europe 2024',
    status: 'group',
    avatar: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    lastMessage: 'John: I found a great hotel deal!',
    unread: 0,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    status: 'offline',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    lastMessage: 'The flight is booked!',
    unread: 0,
  },
];

const initialMessages = [
  {
    id: 1,
    sender: 'Sarah Wilson',
    content: 'Hey! I was thinking about our upcoming trip to Paris',
    time: '10:30 AM',
    type: 'received',
  },
  {
    id: 2,
    sender: 'You',
    content: "Hi Sarah! Yes, I'm excited about it. Have you found any good hotels?",
    time: '10:31 AM',
    type: 'sent',
  },
  {
    id: 3,
    sender: 'Sarah Wilson',
    content: 'I found this amazing boutique hotel near the Eiffel Tower. Let me share the details.',
    time: '10:32 AM',
    type: 'received',
  },
];

export default function Chat() {
  const [contacts, setContacts] = useState(initialContacts);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const activeBg = useColorModeValue('gray.100', 'gray.600');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage.trim(),
        time: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }),
        type: 'sent',
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');

      // Simulate received message after a delay
      setTimeout(() => {
        const replyMsg = {
          id: messages.length + 2,
          sender: selectedContact.name,
          content: "Thanks for your message! I'll get back to you soon.",
          time: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
          type: 'received',
        };
        setMessages(prev => [...prev, replyMsg]);
      }, 1000);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxW="container.xl" py={8}>
      <Grid
        templateColumns={{ base: '1fr', md: '300px 1fr' }}
        gap={6}
        h={{ base: 'auto', md: '80vh' }}
      >
        {/* Contacts List */}
        <GridItem>
          <Card height="full" borderWidth="1px" borderColor={borderColor}>
            <CardBody p={0}>
              <VStack spacing={0} height="full">
                <Box p={4} w="full">
                  <InputGroup>
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <InputRightElement>
                      <SearchIcon color="gray.500" />
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Divider />
                <VStack spacing={0} w="full" overflowY="auto">
                  {filteredContacts.map((contact) => (
                    <Box
                      key={contact.id}
                      p={4}
                      w="full"
                      cursor="pointer"
                      bg={selectedContact.id === contact.id ? activeBg : undefined}
                      _hover={{ bg: selectedContact.id === contact.id ? activeBg : hoverBg }}
                      onClick={() => setSelectedContact(contact)}
                      borderBottomWidth="1px"
                      borderColor={borderColor}
                    >
                      <HStack spacing={3}>
                        <Avatar size="md" src={contact.avatar}>
                          {contact.status !== 'group' && (
                            <AvatarBadge
                              boxSize="1.25em"
                              bg={contact.status === 'online' ? 'green.500' : 'gray.500'}
                            />
                          )}
                        </Avatar>
                        <Box flex="1">
                          <HStack justify="space-between" mb={1}>
                            <Text fontWeight="medium">{contact.name}</Text>
                            {contact.unread > 0 && (
                              <Badge colorScheme="teal" borderRadius="full" px={2}>
                                {contact.unread}
                              </Badge>
                            )}
                          </HStack>
                          <Text fontSize="sm" color="gray.500" noOfLines={1}>
                            {contact.lastMessage}
                          </Text>
                        </Box>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* Chat Window */}
        <GridItem>
          <Card height="full" borderWidth="1px" borderColor={borderColor}>
            <CardBody p={0}>
              <VStack height="full" spacing={0}>
                {/* Chat Header */}
                <Box p={4} w="full" borderBottomWidth="1px" borderColor={borderColor}>
                  <HStack>
                    <Avatar size="sm" src={selectedContact.avatar}>
                      {selectedContact.status !== 'group' && (
                        <AvatarBadge
                          boxSize="1.25em"
                          bg={selectedContact.status === 'online' ? 'green.500' : 'gray.500'}
                        />
                      )}
                    </Avatar>
                    <Text fontWeight="medium">{selectedContact.name}</Text>
                  </HStack>
                </Box>

                {/* Messages */}
                <VStack
                  flex={1}
                  w="full"
                  p={4}
                  spacing={4}
                  overflowY="auto"
                  alignItems="stretch"
                  bg={useColorModeValue('gray.50', 'gray.900')}
                >
                  {messages.map((msg) => (
                    <Box
                      key={msg.id}
                      alignSelf={msg.type === 'sent' ? 'flex-end' : 'flex-start'}
                      maxW="70%"
                    >
                      <Box
                        bg={msg.type === 'sent' ? 'teal.500' : bgColor}
                        color={msg.type === 'sent' ? 'white' : 'inherit'}
                        px={4}
                        py={2}
                        borderRadius="lg"
                        shadow="sm"
                      >
                        <Text>{msg.content}</Text>
                      </Box>
                      <Text fontSize="xs" color="gray.500" mt={1} textAlign={msg.type === 'sent' ? 'right' : 'left'}>
                        {msg.time}
                      </Text>
                    </Box>
                  ))}
                </VStack>

                {/* Message Input */}
                <Box p={4} w="full" borderTopWidth="1px" borderColor={borderColor}>
                  <form onSubmit={handleSendMessage}>
                    <HStack>
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        variant="filled"
                      />
                      <Tooltip label="Send message" hasArrow>
                        <IconButton
                          colorScheme="teal"
                          aria-label="Send message"
                          icon={<ArrowForwardIcon />}
                          type="submit"
                          isDisabled={!newMessage.trim()}
                        />
                      </Tooltip>
                    </HStack>
                  </form>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Container>
  );
}
