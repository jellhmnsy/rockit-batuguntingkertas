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
import { Kavoon_400Regular } from '@expo-google-fonts/kavoon';
import { KiwiMaru_300Light } from '@expo-google-fonts/kiwi-maru';
import { KiwiMaru_400Regular } from '@expo-google-fonts/kiwi-maru';
import { KiwiMaru_500Medium } from '@expo-google-fonts/kiwi-maru';


import Toast from "react-native-toast-message";
import { login } from "../api/restApi";
import { useAuth } from "../contexts/AuthContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
  const {  loginAuth,user  } = useAuth(); // Extract login function from AuthContext
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [pinError, setPinError] = useState("");
  const navigationRef = useNavigation();
  useEffect(() => {
  
    if (user !== null) {
      navigationRef.navigate('Home');
    }
  }, [user]);
  const handleLogin = async () => {
    let valid = true;

    // Reset error messages
    setUsernameError("");
    setPinError("");

    // Validate username and PIN
    if (!username) {
      setUsernameError("Username is required.");
      valid = false;
    }
    if (!pin) {
      setPinError("PIN is required.");
      valid = false;
    }

    if (valid) {
      try {
        const success = await loginAuth(username, pin);

        if (success) {
          Alert.alert(
            "Login Successful",
            "Welcome back!",
            [{ text: "OK", onPress: () => navigation.reset({ index: 0, routes: [{ name: "Home" }] }) }]
          );
        }

      } catch (error) {
        console.log('Error occurred:', error.message);

        // Check for invalid username or PIN
        if (error.message.includes("invalid username or PIN")) {
          Alert.alert(
            "Login Failed",
            "Invalid username or PIN. Please try again.",
            [{ text: "OK" }]
          );
        } else {
          // General error fallback
          Alert.alert(
            "Login Failed",
            error.message || "Something went wrong.",
            [{ text: "OK" }]
          );
        }
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigation.navigate('Register');
  };

  const [fontsLoaded] = useFonts({
    Kavoon_400Regular,
    KiwiMaru_300Light,
    KiwiMaru_400Regular,
    KiwiMaru_500Medium,
  });

  return fontsLoaded ? (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require('../assets/Login Screen (1).png')}
        style={styles.background}
        resizeMode='stretch'
      >
        <View style={styles.container}>
          <Text style={styles.title}>LOGIN</Text>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/Group 9.png')}
              style={styles.logoImage}
            />
          </View>
          <>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
            />
            {usernameError ? (
              <Text style={styles.errorText}>{usernameError}</Text>
            ) : null}

            <TextInput
              style={styles.input}
              placeholder="PIN"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={pin}
              onChangeText={setPin}
              keyboardType="numeric"
            />
            {pinError ? (
              <Text style={styles.errorText}>{pinError}</Text>
            ) : null}
          </>
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
  ) : (
    <Text>Loading fonts...</Text>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.41)', // Semi-transparent background
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: 286,
    height: 485,
  },
  title: {
    fontSize: 40,
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
    width: "100%",
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
    fontSize: 15,
    marginTop: 5, // Add space between "Don’t have an account?" and "Register here"
    fontFamily: 'KiwiMaru_400Regular',
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 16,
  },
});
