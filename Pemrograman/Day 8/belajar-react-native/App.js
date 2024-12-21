// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, SafeAreaView } from 'react-native';
// import Box from './components/Box';
// import LoginScreen from './screens/Login';
// import RegisterScreen from './screens/Register';
// import HomeScreen from './screens/Home';
// import TopupScreen from './screens/Topup';
// import TransferScreen from './screens/Transfer';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import TabNavigator from './screens/TabNavigator';
// import TestScreen from './screens/Test';
// import { Ionicons } from '@expo/vector-icons'; // Jika menggunakan Expo

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     // <SafeAreaView>
//     //   <LoginScreen></LoginScreen>
//     //   <Register></Register>
//     // </SafeAreaView>
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
//         <Stack.Screen name="Topup" component={TopupScreen} />
//         <Stack.Screen name="Transfer" component={TransferScreen} />
//         <Stack.Screen name="Test" component={TestScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
// });

import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider } from './context/AuthContext';


// Import Screens
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import TopupScreen from './screens/Topup';
import TransferScreen from './screens/Transfer';
import TestScreen from './screens/Test';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <AuthProvider>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Topup') {
            iconName = 'wallet-outline';
          } else if (route.name === 'Transfer') {
            iconName = 'swap-horizontal-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: 'gray',
        headerTitleStyle: { fontWeight: 'bold' },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Topup" component={TopupScreen} />
      <Tab.Screen name="Transfer" component={TransferScreen} />
    </Tab.Navigator>
    </AuthProvider>
  );
}

// Main App Component
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Test" component={TestScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
