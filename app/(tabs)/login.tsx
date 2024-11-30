import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';

const GoogleAuthScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Step 1: Get the Google Auth URL from the backend
      const response = await fetch('http://localhost:5000/login');
      const data = await response.json();

      if (response.ok && data.auth_url) {
        // Open the Google Auth URL in a web browser
        Linking.openURL(data.auth_url);

        // Poll or handle app callback for user data
        setTimeout(async () => {
          try {
            const userResponse = await fetch('http://localhost:5000/user-info');
            const userData = await userResponse.json();
            if (userResponse.ok) {
              Alert.alert(
                'Login Successful',
                `Welcome, ${userData.name}\nEmail: ${userData.email}`
              );
              // Navigate to the HomeScreen with userData if needed
              // navigation.navigate('Home', userData);
            } else {
              Alert.alert('Error', 'Failed to retrieve user information.');
            }
          } catch (error) {
            console.error('Error fetching user info:', error);
          }
        }, 3000); // Wait for the user to finish login
      } else {
        throw new Error('Failed to fetch Google Auth URL');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Failed to initiate Google Login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Google</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleGoogleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Sign in with Google</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F1E3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#390000',
  },
  button: {
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GoogleAuthScreen;