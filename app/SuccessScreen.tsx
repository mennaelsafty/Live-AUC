import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function SuccessScreen() {
    const router = useRouter();
    const { message } = useLocalSearchParams(); // Get message passed from the previous screen

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.successText}>{message}</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/')} // Navigate back to the home screen or another page
            >
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    successText: {
        fontSize: 20,
        color: 'green',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#6B3B24',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});