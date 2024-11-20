import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const EventScreen: React.FC = () => {
    const router = useRouter();
    const params = useLocalSearchParams(); // Retrieve parameters passed from HomeScreen
    const { event_name, event_date, event_price } = params;

    // Ensure `event_date` and `event_price` are strings (not string[])
    const formattedEventDate = Array.isArray(event_date) ? event_date[0] : event_date;
    const formattedEventPrice = Array.isArray(event_price) ? event_price[0] : event_price;

    return (
        <SafeAreaView style={styles.container}>
            {/* Top Right Star Icon */}
            <TouchableOpacity style={styles.topRightIcon}>
                <Ionicons name="star-outline" size={30} color="black" />
            </TouchableOpacity>

            {/* Event Banner */}
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.banner} />

            {/* Event Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{event_name}</Text>
                <Text style={styles.date}>
                    {new Date(formattedEventDate).toLocaleString()} {/* Parse and format the date */}
                </Text>
                <Text style={styles.price}>
                    {parseFloat(formattedEventPrice) > 0 ? `${formattedEventPrice} EGP` : 'Free'}
                </Text>
                <Text style={styles.description}>Join us for an amazing event experience!</Text>
            </View>

            {/* Register Button */}
            <TouchableOpacity
                style={styles.registerButton}
                onPress={() =>
                    router.push({
                        pathname: '/RegistrationScreen',
                        params: {
                            event_id: params.event_id, // Pass event ID to registration screen
                        },
                    })
                }
            >
                <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>

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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F1E3',
        padding: 16,
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
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#390000',
        marginBottom: 8,
        marginHorizontal: 16,
    },
    date: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
        marginHorizontal: 16,
    },
    price: {
        fontSize: 16,
        color: '#333',
        marginBottom: 16,
        marginHorizontal: 16,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginHorizontal: 16,
    },
    registerButton: {
        backgroundColor: '#A73E26',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 16,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    attendanceContainer: {
        marginTop: 16,
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
        marginHorizontal: 16,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 4,
    },
});

export default EventScreen;
