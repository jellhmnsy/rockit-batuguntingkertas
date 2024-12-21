import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import TopupScreen from '../screens/Topup';
import TransferScreen from '../screens/Transfer';
import { Ionicons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Topup') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Transfer') {
            iconName = focused ? 'send' : 'send-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="MinTabs" component={HomeScreen} />
      <Tab.Screen name="Topup" component={TopupScreen} />
      <Tab.Screen name="Transfer" component={TransferScreen} />
      <Tab.Screen name="Logout" component={Logout} />
    </Tab.Navigator>
  );
}
