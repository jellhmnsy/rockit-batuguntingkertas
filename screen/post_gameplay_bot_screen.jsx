import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const PostGameScreen = ({ route, navigation }) => {
    const { winner, scoreA, scoreB } = route.params;
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>You Win!</Text>
        <Text style={styles.subtitle}>{winner}</Text>
        <Text style={styles.scores}>A vs B</Text>
        <Text style={styles.scores}>{scoreA} - {scoreB}</Text>
        <Button title="Back to Main Menu" onPress={() => navigation.navigate('Game')} />
      </View>
    );
  };