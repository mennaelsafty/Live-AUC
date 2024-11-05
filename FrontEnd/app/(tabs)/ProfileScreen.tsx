import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Mohamed El-Refai</Text>
            <View style={styles.userStats}>
              <View style={styles.statItem}>
                <Text style={styles.statCount}>300</Text>
                <Text style={styles.statLabel}>points</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statCount}>14</Text>
                <Text style={styles.statLabel}>friends</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statCount}>30</Text>
                <Text style={styles.statLabel}>following</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Events Section */}
        <Text style={styles.sectionTitle}>Events attended</Text>
        <View style={styles.eventsContainer}>
          <EventCard />
          <EventCard />
          <EventCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const EventCard = () => {
  return (
    <View style={styles.eventCard}>
      <Image 
        source={{ uri: 'https://huss.aucegypt.edu/sites/huss.aucegypt.edu/files/styles/banner/public/2023-10/220925_11303.jpg?itok=FKzPfbYh' }}
        style={styles.eventImage}
      />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>Event Title</Text>
        <Text style={styles.eventDate}>1 November 2024</Text>
        <Text style={styles.eventTime}>9:00 am - 11:00 am</Text>
        <Text style={styles.eventPrice}>165 EGP</Text>
      </View>
    </View>
  );
};

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
    justifyContent: 'center', // Center horizontally within the screen
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20, // Space between image and profile info
  },
  profileInfo: {
    alignItems: 'center', // Center the name and stats relative to the profile image
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
    marginHorizontal: 20, // Space between each stat
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
  eventTime: {
    color: '#390000',
  },
  eventPrice: {
    color: '#390000',
  },
});

export default ProfileScreen;
