import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { useFonts } from "expo-font";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Navigate to the Login screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    //   navigation.replace('WaitingRoom');
    }, 3000); // 3 seconds delay

    // Cleanup timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/Splash Screen.png')}  // Your background image
      style={styles.background}  // Make sure the image covers the whole screen
    >
      <View style={styles.container}>
        {/* You can add any text or components over the background image */}
        {/* <Text style={styles.text}>Welcome to My App</Text> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,  // Ensure the background image covers the whole screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SplashScreen;
