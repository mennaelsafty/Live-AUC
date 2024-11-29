import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    SafeAreaView, 
    TouchableOpacity, 
    Alert, 
    ActivityIndicator 
} from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RegistrationScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const router = useRouter();
    const navigation = useNavigation();
    const { event_id } = useLocalSearchParams();

    React.useEffect(() => {
        // Customize the header
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={styles.customBackButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={20} color="#FFF" />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            ),
            headerTitle: 'Register for Event',
            headerStyle: {
                backgroundColor: '#F5F1E3', // Light beige background for the header
            },
            headerTintColor: '#6B3B24', // Brown color for other header elements
        });
    }, [navigation]);

    const handleRegister = async () => {
        if (!event_id) {
            Alert.alert('Error', 'Event ID is missing. Please try again.');
            return;
        }

        setIsLoading(true); // Show loading spinner
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/user/register/${event_id}/${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (response.ok) {
                router.push({
                    pathname: '/SuccessScreen',
                    params: { message: result.message },
                });
            } else {
                Alert.alert('Error', result.message || 'An error occurred');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to connect to the server');
            console.error(error);
        } finally {
            setIsLoading(false); // Hide loading spinner
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#6B3B24" />
                    <Text style={styles.loadingText}>Registering...</Text>
                </View>
            ) : (
                <>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter First Name"
                            value={firstName}
                            onChangeText={setFirstName}
                        />

                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChangeText={setLastName}
                        />

                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F1E3',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    formContainer: {
        width: '100%',
        maxWidth: 350,
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#390000',
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#6B3B24',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        maxWidth: 350,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#6B3B24',
        marginTop: 10,
    },
    customBackButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6B3B24', // Brown background for the back button
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginLeft: 1, // Move closer to the left
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 16,
        marginLeft: 8,
    },
});
