import React from "react";
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
import { GameProvider } from "./contexts/GameContext";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <GameProvider>
          <AppNavigator />
        </GameProvider>
      </NavigationContainer>
    </AuthProvider>
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