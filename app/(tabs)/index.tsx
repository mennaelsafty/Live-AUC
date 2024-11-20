import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router'; // For navigation

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('For you');
  const [events, setEvents] = useState([]); // State to hold API data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const router = useRouter(); // Use router for navigation

  useEffect(() => {
    // Fetch data from API
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/events/homepage'); // Replace with your API endpoint
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
    <SafeAreaView style={styles.container}>
      {/* Header Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('For you')}>
          <Text style={[styles.tabText, activeTab === 'For you' && styles.activeTabText]}>For you</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Following')}>
          <Text style={[styles.tabText, activeTab === 'Following' && styles.activeTabText]}>Following</Text>
        </TouchableOpacity>
      </View>

      {/* Event Cards List */}
      {loading ? (
        <ActivityIndicator size="large" color="#6B3B24" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {events.map((event: any) => (
            <TouchableOpacity
              key={event.event_id}
              style={styles.eventCard}
              onPress={() =>
                router.push({
                  pathname: '../EventScreen', 
                  params: {
                    event_id: event.event_id,
                    event_name: event.event_name,
                    event_date: event.event_date,
                    event_price: event.event_price,
                  },
                })
              }
            >
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual image URLs if available
                style={styles.eventImage}
              />
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{event.event_name}</Text>
                <Text style={styles.eventDate}>{formatDateTime(event.event_date)}</Text>
                <Text style={styles.eventPrice}>
                  {parseFloat(event.event_price) > 0
                    ? `${event.event_price} EGP`
                    : 'Free'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E3',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#F5F1E3',
  },
  tabText: {
    fontSize: 18,
    color: '#6B3B24',
  },
  activeTabText: {
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: '#6B3B24',
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
