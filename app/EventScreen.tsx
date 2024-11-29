import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Calendar from 'expo-calendar';

const EventScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Helper function to safely get the first string from string | string[]
  const getStringValue = (value: string | string[] | undefined): string | undefined => {
    if (Array.isArray(value)) {
      return value[0];
    }
    return value;
  };

  // Extract values from params safely
  const event_name = getStringValue(params.event_name);
  const event_date = getStringValue(params.event_date);
  const event_price = getStringValue(params.event_price);
  const displayPic = getStringValue(params.displayPic);
  const description = getStringValue(params.description);

  const formattedEventDate = event_date || 'Unknown Date';
  const formattedEventPrice = event_price || '0';
  const eventImage = displayPic || 'https://via.placeholder.com/150';
  const eventDescription = description || 'No description available';

  useEffect(() => {
    const getPermissions = async () => {
      const { status: calendarStatus } = await Calendar.requestCalendarPermissionsAsync();
      const { status: remindersStatus } = await Calendar.requestRemindersPermissionsAsync();

      if (calendarStatus !== 'granted' || remindersStatus !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow calendar and reminders access to add events.'
        );
      }
    };
    getPermissions();
  }, []);

  const addToCalendar = async () => {
    try {
      const { status: calendarStatus } = await Calendar.getCalendarPermissionsAsync();
      const { status: remindersStatus } = await Calendar.getRemindersPermissionsAsync();

      if (calendarStatus !== 'granted' || remindersStatus !== 'granted') {
        Alert.alert('Permission Denied', 'Calendar and reminders access are required to add events.');
        return;
      }

      const calendars = await Calendar.getCalendarsAsync();
      const defaultCalendar = calendars.find(cal => cal.allowsModifications) || calendars[0];

      if (!defaultCalendar) {
        Alert.alert('Error', 'No suitable calendar found.');
        return;
      }

      const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
        title: event_name,
        startDate: new Date(formattedEventDate),
        endDate: new Date(new Date(formattedEventDate).getTime() + 60 * 60 * 1000), // +1 hour
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        notes: eventDescription,
        location: 'Event location if available', // Replace with event location if applicable
      });

      if (eventId) {
        Alert.alert('Success', 'Event added to your calendar.');
      }
    } catch (error) {
      console.error('Error adding to calendar:', error);
      Alert.alert('Error', 'Could not add event to the calendar.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Right Star Icon */}
      <TouchableOpacity style={styles.topRightIcon}>
        <Ionicons name="star-outline" size={30} color="black" />
      </TouchableOpacity>

      {/* Event Banner */}
      <Image source={{ uri: eventImage }} style={styles.banner} />

      {/* Event Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{event_name}</Text>
        <Text style={styles.date}>{new Date(formattedEventDate).toLocaleString()}</Text>
        <Text style={styles.price}>
          {parseFloat(formattedEventPrice) > 0 ? `${formattedEventPrice} EGP` : 'Free'}
        </Text>
        <Text style={styles.description}>{eventDescription}</Text>
      </View>

      {/* See Who's Attending Section */}
      <View style={styles.attendanceContainer}>
        <Text style={styles.attendanceTitle}>See who's attending</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.avatars}
        >
          {[...Array(5)].map((_, index) => (
            <Image
              key={index}
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={styles.avatar}
            />
          ))}
        </ScrollView>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.button} onPress={addToCalendar}>
          <Text style={styles.buttonText}>Add to Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: '/RegistrationScreen',
              params: {
                event_id: params.event_id,
              },
            })
          }
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E3',
  },
  topRightIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 16,
  },
  detailsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#390000',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  attendanceContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    marginBottom: 32, // Adds space between the "Who's Attending" section and the buttons
  },
  attendanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A73E26',
    marginBottom: 8,
    textAlign: 'center',
  },
  avatars: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    backgroundColor: '#6B3B24', // Unified button color
    flex: 1, // Equal size for buttons
    marginHorizontal: 8, // Space between buttons
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventScreen;
