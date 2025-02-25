import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NewItinerary from './pages/NewItinerary';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import ItineraryDetails from './pages/ItineraryDetails';

function App() {
  return (
    <Router>
      <Box minH="100vh">
        <Navbar />
        <Box as="main" pt="16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewItinerary />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/itinerary/:id" element={<ItineraryDetails />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
