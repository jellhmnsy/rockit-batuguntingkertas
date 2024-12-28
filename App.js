import React, { useState, useEffect} from 'react';
import { AudioProvider } from "./screens/audioContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./screens/splashScreen";
import LoginScreen from "./screens/loginScreen";
import WaitingRoom from "./screens/waitingRoomScreen";
import GameplayScreen from "./screens/gameplayScreen";
import GameplayScreenBot from "./screens/gameplayBotScreen";
import PostGameScreen from "./screens/postGameplayBotScreen";
import RegisterScreen from "./screens/registerScreen";
import HomeScreen from "./screens/homeScreen";
import { AuthProvider } from './contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';

import { GameProvider } from "./contexts/GameContext";
const Stack = createNativeStackNavigator();

const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    console.log('User logged out successfully.');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken'); 
        if (token) {
          setIsLoggedIn(true); 
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();

    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
      if (nextAppState === 'inactive') { 
        handleLogout(); // Log out when the app goes inactive
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AudioProvider>
    <AuthProvider>
      <NavigationContainer>
        <GameProvider>
          <AppNavigator />
        </GameProvider>
      </NavigationContainer>
    </AuthProvider>
    </AudioProvider>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Splash screen is the first screen */}
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false, gestureEnabled: false }} // Hide header for SplashScreen
      />

      {/* Home screen always available */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, gestureEnabled: false }} // Hide header for HomeScreen
      />

      {/* Login screen */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, gestureEnabled: false }} // Hide header for LoginScreen
      />

      {/* Register screen */}
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false, gestureEnabled: false }} // Hide header for RegisterScreen
      />

      {/* Authenticated screens */}
      <Stack.Screen
        name="WaitingRoom"
        component={WaitingRoom}
        options={{ headerShown: false}} // Hide header for WaitingRoom
      />
      <Stack.Screen
        name="GamePlayBot"
        component={GameplayScreenBot}
        options={{ headerShown: false, gestureEnabled: false }} // Hide header for GameplayScreenBot
      />
      <Stack.Screen
        name="GamePlay"
        component={GameplayScreen}
        options={{ headerShown: false, gestureEnabled: false }} // Hide header for GameplayScreen
      />
      <Stack.Screen
        name="PostGame"
        component={PostGameScreen}
        options={{ headerShown: false, gestureEnabled: false }} // Hide header for PostGameScreen
      />
    </Stack.Navigator>
  );
};

export default App;