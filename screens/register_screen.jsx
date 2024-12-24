import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { Kavoon_400Regular } from "@expo-google-fonts/kavoon";
import { KiwiMaru_400Regular } from "@expo-google-fonts/kiwi-maru";
import { useFonts } from "@expo-google-fonts/kavoon";


const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");

  const handleRegister = () => {
    // Logika untuk registrasi
    console.log("Register with:", { username, pin });
  };

  const [fontsLoaded] = useFonts({
    Kavoon_400Regular,
    KiwiMaru_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
      <ImageBackground
        source={require("../assets/registration-screen.png")} // Ganti dengan path gambar cloud Anda
        style={styles.background}
        resizeMode="stretch"
      >
        <View style={styles.container}>
          {/* Form Registrasi */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>REGISTRASI</Text>

            {/* Logo */}
            <Image
              source={require("../assets/logo.png")} // Ganti dengan path logo Anda
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

            {/* Input pin */}
            <TextInput
              style={styles.input}
              placeholder="Pin"
              placeholderTextColor="#8c8c8c"
              secureTextEntry
              value={pin}
              onChangeText={setPin}
            />

            {/* Tombol Register */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>

            {/* Link ke Login */}
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={styles.loginText}>Have account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}> Login here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center", // Pusatkan konten secara vertikal
    alignItems: "center", // Pusatkan konten secara horizontal
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
  marginTop: "30%",
  backgroundColor: "rgba(255, 255, 255, 0.41)", // Gunakan warna RGBA untuk opacity 50%
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 30,
  width: 286,
  height: 485,
  alignItems: "center",
},
formContainer: {
  marginTop: "30%",
  backgroundColor: "rgba(255, 255, 255, 0.5)", // Gunakan warna RGBA untuk opacity 50%
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 30,
  width: 286,
  height: 485,
  alignItems: "center",
},
formContainer: {
    marginTop: "30%",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Gunakan warna RGBA untuk opacity 50%
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
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20, // Gunakan font sesuai gambar
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
    height: 39,
    width : 250,
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
    borderColor: 'white',
    marginTop: 10,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
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
    fontWeight: "bold",
    fontFamily: "KiwiMaru_400Regular",
  },
});

export default RegisterScreen;
