import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ImageBackground } from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Logika untuk registrasi
    console.log("Register with:", { username, password });
  };

  return (
<View> 

<ImageBackground source={require("../assets/registration-screen.png")} // Ganti dengan path gambar cloud Anda
    style={styles.background}
    resizeMode="stretch"> 
    <View style={styles.container}>
      {/* Cloud Decoration */}
      
      <Image
        source={require("../assets/clouds.png")} // Ganti dengan path gambar cloud Anda
        style={styles.clouds}
        resizeMode="contain"
      />

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
        
        {/* Input Password */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#8c8c8c"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        {/* Tombol Register */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        
        {/* Link ke Login */}
        <View style= {{flexDirection: "row", alignItems: 'flex-end'}}>
        <Text style={styles.loginText}>
            Have account? 
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginLink}> Login here</Text>
        </TouchableOpacity>
        
        </View>
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
    flex: 1,
    backgroundColor: "linear-gradient(to bottom, #50C2D6, #FF6F59)", // Background gradasi
    alignItems: "center",
  },
  clouds: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "25%",
  },
  formContainer: {
    marginTop: "30%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: "85%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    fontFamily: "Caveat-Bold", // Gunakan font sesuai gambar
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    opacity: 1,
  },
  input: {
    width: "100%",
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    color: "#000",
  },
  registerButton: {
    backgroundColor: "#FF6F59",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 10,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginText: {
    marginTop: 20,
    color: "#000",
  },
  loginLink: {
    color: "#50C2D6",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
