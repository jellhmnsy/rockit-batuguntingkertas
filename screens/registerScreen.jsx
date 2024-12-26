import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Kavoon_400Regular } from "@expo-google-fonts/kavoon";
import { KiwiMaru_400Regular } from "@expo-google-fonts/kiwi-maru";
import { useFonts } from "@expo-google-fonts/kavoon";
import { useNavigation } from "@react-navigation/native";
import { register } from "../api/restApi";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [pinError, setPinError] = useState("");

  const handleRegister = async () => {
    let valid = true;

    // Reset errors
    setUsernameError("");
    setPinError("");

    // Validate username
    if (username.length <= 3) {
      setUsernameError("Username must be more than 3 characters.");
      valid = false;
    } else if (!username) {
      setUsernameError("Username is required.");
      valid = false;
    }

    // Validate pin
    if (pin.length < 6) {
      setPinError("PIN must be at least 6 characters.");
      valid = false;
    } else if (!pin) {
      setPinError("PIN is required.");
      valid = false;
    }

    // If form is valid, proceed to register
    if (valid) {
      try {
        const response = await register(username, pin);
        Alert.alert("Success", "Registration successful!", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } catch (error) {
        Alert.alert("Error", error.response?.data?.message || "Registration failed.");
      }
    }
  };

  const [fontsLoaded] = useFonts({
    Kavoon_400Regular,
    KiwiMaru_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../assets/registration-screen.png")}
        style={styles.background}
        resizeMode="stretch"
      >
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>REGISTRASI</Text>

            {/* Logo */}
            <Image
              source={require("../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Input Username */}
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#8c8c8c"
              value={username}
              onChangeText={setUsername}
            />
            {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

            {/* Input Pin */}
            <TextInput
              style={styles.input}
              placeholder="Pin"
              placeholderTextColor="#8c8c8c"
              secureTextEntry
              value={pin}
              onChangeText={setPin}
              keyboardType="numeric"
            />
            {pinError ? <Text style={styles.errorText}>{pinError}</Text> : null}

            {/* Register Button */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>

            {/* Link to Login */}
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={styles.loginText}>Have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}> Login here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    marginTop: "30%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: 286,
    height: 485,
    alignItems: "center",
  },
  title: {
    fontFamily: "Kavoon_400Regular",
    fontSize: 40,
    color: "#000",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60.29,
    marginBottom: 20,
    opacity: 1,
  },
  input: {
    width: "100%",
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 15,
    width: 250,
    marginBottom: 15,
    color: "#000",
    fontFamily: "KiwiMaru_400Regular",
    fontSize: 20,
  },
  registerButton: {
    backgroundColor: "#FF8552",
    paddingVertical: 5,
    paddingHorizontal: 35,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "white",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "KiwiMaru_400Regular",
  },
  loginText: {
    marginTop: 20,
    fontSize: 15,
    color: "#000",
    fontFamily: "KiwiMaru_400Regular",
  },
  loginLink: {
    color: "#046865",
    fontSize: 15,
    fontFamily: "KiwiMaru_500Medium",
    // fontFamily: "KiwiMaru_400Regular",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
});

export default RegisterScreen;
