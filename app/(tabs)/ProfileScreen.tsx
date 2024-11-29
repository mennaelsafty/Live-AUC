import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Define navigation type
type RootStackParamList = {
  ProfileScreen: undefined;
  SettingsScreen: undefined;
};

type EventAPIResponse = {
  Name: string;
  DateTime: string;
  Price: string;
  Audience: string;
  Description: string;
  Organizer: string;
  Status: string;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfileScreen'
>;

type UserProfile = {
  username: string;
  pfp: string;
  points: string;
  friends: string;
  following: string;
};

type Event = {
  event_id: number; // Not present in the API response
  event_name: string;
  event_date: string;
  event_price: number;
  displayPic: string; // Not present in the API response
};

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [attendedEvents, setAttendedEvents] = useState<Event[]>([]); // State to store attended events

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <Ionicons name="settings-outline" size={24} color="#390000" style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    // Fetch user profile data
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/user/profile/john.doe@aucegypt.edu');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setProfileData({
          username: data.username.trim(),
          pfp: data.pfp.trim(),
          points: data.points.toString(),
          friends: data.friends.toString(),
          following: data.following.toString(),
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Fetch attended events data
    const fetchAttendedEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/user/events/john.doe@aucegypt.edu');
        if (!response.ok) {
          throw new Error('Failed to fetch attended events');
        }
        const data: EventAPIResponse[] = await response.json();
    
        const mappedEvents: Event[] = data.map((event, index) => ({
          event_id: index, // Temporary unique identifier
          event_name: event.Name, // Map Name to event_name
          event_date: event.DateTime, // Map DateTime to event_date
          event_price: parseFloat(event.Price), // Convert Price to number
          displayPic: 'https://via.placeholder.com/150', // Placeholder for displayPic
        }));
    
        console.log('Mapped Events:', mappedEvents); // Debugging
        setAttendedEvents(mappedEvents);
      } catch (error) {
        console.error('Error fetching attended events:', error);
      }
    };       

    fetchProfileData();
    fetchAttendedEvents();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: profileData?.pfp || 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{profileData?.username || 'User'}</Text>
            <View style={styles.userStats}>
              <View style={styles.statItem}>
                <Text style={styles.statCount}>{profileData?.points || '---'}</Text>
                <Text style={styles.statLabel}>points</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statCount}>{profileData?.friends || '---'}</Text>
                <Text style={styles.statLabel}>friends</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statCount}>{profileData?.following || '---'}</Text>
                <Text style={styles.statLabel}>following</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Events Section */}
        <Text style={styles.sectionTitle}>Events attended</Text>
        <View style={styles.eventsContainer}>
          {attendedEvents.length > 0 ? (
            attendedEvents.map((event, index) => (
              <EventCard key={event.event_id || `event-${index}`} event={event} />
            ))
          ) : (
            <Text style={styles.noEventsText}>No events attended yet.</Text>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <View style={styles.eventCard}>
      <Image 
        source={{ uri: event.displayPic }}
        style={styles.eventImage}
      />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{event.event_name}</Text>
        <Text style={styles.eventDate}>{new Date(event.event_date).toLocaleDateString()}</Text>
        <Text style={styles.eventPrice}>
          {event.event_price > 0 ? `${event.event_price} EGP` : 'Free'}
        </Text>
      </View>
    </View>
  );
};

// Style definitions remain the same as provided earlier
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E3',
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#390000',
  },
  userStats: {
    flexDirection: 'row',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  statCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#390000',
  },
  statLabel: {
    fontSize: 12,
    color: '#390000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
    color: '#390000',
  },
  eventsContainer: {
    paddingHorizontal: 20,
  },
  eventCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
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
    color: '#390000',
  },
  eventDate: {
    color: '#390000',
  },
  eventPrice: {
    color: '#390000',
  },
  noEventsText: {
    textAlign: 'center',
    color: '#390000',
    marginTop: 20,
    fontSize: 16,
  },
});

export default ProfileScreen;
