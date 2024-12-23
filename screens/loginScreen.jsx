import React, { useState, useEffect } from 'react';
import { useFonts } from "expo-font";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AppLoading from 'expo-app-loading';
import { Kavoon_400Regular } from '@expo-google-fonts/kavoon';
import {
  KiwiMaru_300Light,
  KiwiMaru_400Regular,
  KiwiMaru_500Medium,
} from '@expo-google-fonts/kiwi-maru';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    if (!username || !pin) {
      Alert.alert('Error', 'Please enter both username and pin.');
      return;
    }

    // Parse PIN to integer
    const parsedPin = parseInt(pin, 10);

    // Simulate login logic (replace with actual API call)
    if (username === 'user' && parsedPin === 1234) {
      Alert.alert('Success', `Welcome, ${username}!`);
    } else {
      Alert.alert('Error', 'Invalid username or pin.');
    }
  };

  const handleRegisterRedirect = () => {
    Alert.alert('Redirect', 'Go to Register screen!');
  };

  const [fontsLoaded] = useFonts({
    Kavoon_400Regular,
    KiwiMaru_300Light,
    KiwiMaru_400Regular,
    KiwiMaru_500Medium,
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require('../assets/Login Screen (1).png')} // Replace with your image URL
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.title}>LOGIN</Text>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/Group 9.png')} // Replace with your image file path
              style={styles.logoImage} // Apply styles to the logo image
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="PIN"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={pin}
            onChangeText={setPin}
            keyboardType="numeric" // Optional: Makes the keyboard show numbers
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
            <View style={styles.buttonInnerShadow}>
              <Text style={styles.buttonText}>Sign in</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Don’t have an account?
            </Text>
            <TouchableOpacity onPress={handleRegisterRedirect}>
              <Text style={styles.registerText}>
                Register here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.41)', // Semi-transparent background
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 286,
    height: 485,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Kavoon_400Regular',
  },
  logoContainer: {
    marginBottom: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  input: {
    width: 265,
    height: 39,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 20,
    fontFamily: 'KiwiMaru_400Regular',
  },
  buttonContainer: {
    width: 180,
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 30,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    backgroundColor: '#046865',
  },
  buttonInnerShadow: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#046865',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -5 }, // Adjust shadow direction to create inner effect
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3, // For Android
    overflow: 'hidden', // Ensures the shadow stays inside the button
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'KiwiMaru_400Regular',
  },
  footerContainer: {
    marginTop: 20, // Add spacing between the button and footer text
    alignItems: 'center',
  },
  footerText: {
    color: '#000000',
    fontFamily: 'KiwiMaru_400Regular',
    fontSize: 15,
  },
  registerText: {
    color: '#FF4500',
    fontFamily: 'KiwiMaru_400Regular',
    fontSize: 15,
    marginTop: 5, // Add space between "Don’t have an account?" and "Register here"
  },
});

export default LoginScreen;
