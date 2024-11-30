import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router'; // For navigation

// Define Event type
type Event = {
  event_id: number;
  event_name: string;
  event_date: string;
  event_price: number;
  displayPic: string;
  description: string; 
};

type EventAPIResponse = {
  event_id: number;
  Name: string;
  DateTime: string;
  Price: string;
  displayPic?: string; // Optional field
  eventDesc: string;   // Add this field for the description
};


// EventCard Component
const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const formatDateTime = (dateTime: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateTime).toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.eventCard}>
      <Image 
        source={{ uri: event.displayPic }}
        style={styles.eventImage}
      />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{event.event_name || 'Unnamed Event'}</Text>
        <Text style={styles.eventDate}>
          {event.event_date ? formatDateTime(event.event_date) : 'No Date'}
        </Text>
        <Text style={styles.eventPrice}>
          {event.event_price > 0 ? `${event.event_price} EGP` : 'Free'}
        </Text>
        <Text style={styles.eventDesc}>
          {event.description}
        </Text>
      </View>
    </View>
  );
};


const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState(''); // State for the search query
  const [searchResults, setSearchResults] = useState<Event[]>([]); // State for search results
  const [loading, setLoading] = useState(false); // State for loading indicator
  const router = useRouter(); // Router for navigation

  // Fetch search results from the backend
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/search/${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to fetch search results');
      const data: any[] = await response.json();
      console.log('Raw API Data:', data); // Debugging
  
      const mappedResults: Event[] = data.map((event: any) => ({
        event_id: event.event_id,
        event_name: event.eventName, // Map 'eventName' correctly
        event_date: event.DatenTime, // Map 'DatenTime' correctly
        event_price: parseFloat(event.Price || '0'), // Handle the price conversion
        displayPic: event.displayPic || 'https://via.placeholder.com/150', // Use 'displayPic'
        description: event.eventDesc || 'No description available', // Map 'eventDesc' with a fallback
      }));
  
      console.log('Mapped Results:', mappedResults); // Debugging
      setSearchResults(mappedResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search for events"
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch} // Trigger search on Enter/Done
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      {loading ? (
        <ActivityIndicator size="large" color="#6B3B24" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {searchResults.length > 0 ? (
            searchResults.map((event) => (
              <TouchableOpacity
                key={event.event_id}
                onPress={() =>
                  router.push({
                    pathname: '/EventScreen',
                    params: event, // Pass event object directly
                  })
                }
              >
                <EventCard event={event} />
              </TouchableOpacity>
            ))
          ) : (
            query && (
              <Text style={styles.noResultsText}>
                No results found for "{query}".
              </Text>
            )
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E3',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },eventDesc: {
    color: '#666', // Light gray text color
    fontSize: 14, // Adjust font size as needed
    marginTop: 5, // Add some spacing from other elements
    lineHeight: 20, // Adjust for readability
  }, searchButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#6B3B24',
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventDetails: {
    padding: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  eventDate: {
    color: '#333',
  },
  eventPrice: {
    color: '#333',
  },
  noResultsText: {
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;
