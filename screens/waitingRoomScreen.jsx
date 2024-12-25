import React, { useState, useEffect } from 'react';
import { useFonts } from "expo-font";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import { Kavoon_400Regular } from '@expo-google-fonts/kavoon';
import {
  KiwiMaru_300Light,
  KiwiMaru_400Regular,
  KiwiMaru_500Medium,
} from '@expo-google-fonts/kiwi-maru';

const WaitingRoom = () => {
  const [token, setToken] = useState(''); // Dynamic token
  const [playersJoined, setPlayersJoined] = useState(1); // Dynamic player count
  const totalPlayers = 2;

  useEffect(() => {
    // Simulate fetching token from API or backend
    const generatedToken = Math.floor(10000 + Math.random() * 90000).toString();
    setToken(generatedToken);
  }, []);

  const handleStartGame = () => {
    if (playersJoined < totalPlayers) {
      Alert.alert('Waiting', 'Not enough players to start the game.');
    } else {
      Alert.alert('Game Started', 'Good luck!');
    }
  };

   const [fontsLoaded] = useFonts({
      Kavoon_400Regular,
      KiwiMaru_300Light,
      KiwiMaru_400Regular,
      KiwiMaru_500Medium,
    });

  return (
    <ImageBackground
      source={require('../assets/Waiting Room (4).png')} // Replace with your image URL
      style={styles.background}
      resizeMode='stretch'
    >
      <View style={styles.container}>
        <Text style={styles.title}>Waiting Room</Text>
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenText}>Token:</Text>
          <Text style={styles.tokenValue}>{token}</Text>
        </View>
        <Text style={styles.playersText}>
          {playersJoined} out of {totalPlayers} player{playersJoined > 1 ? 's' : ''} has joined
        </Text>

        {/* Add empty space to push the start button to the bottom */}
        <View style={styles.spacer}></View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartGame}
        >
          <Text style={styles.startButtonText}>START</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',  // Align items at the top
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',  // Space out the content, pushing start button to the bottom
    alignItems: 'center',
    width: '100%',
    paddingTop: 50,  // Add some padding to give space from the top
    paddingBottom: 20,  // Add padding at the bottom to prevent the button from being too close to the screen edge
  },
  title: {
    fontSize: 40,
    marginTop:50,
    marginBottom: 30,
    fontFamily: 'Kavoon_400Regular',
  },
  tokenContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    borderColor:'#21A0A0',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    // width: 197,
    height: 67,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tokenText: {
    fontSize: 24,
    fontFamily: 'KiwiMaru_400Regular'
  },
  tokenValue: {
    fontSize: 32,
    color: '#006400',
    marginBottom: 5,
    marginLeft: 5,
    fontFamily: 'Kavoon_400Regular'
  },
  playersText: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'KiwiMaru_400Regular'
  },
  spacer: {
    flex: 1,  // This will push the button to the bottom
  },
  startButton: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    marginBottom: 100,
    backgroundColor: 'white'
  },
  startButtonText: {
    color: 'black',
    fontSize: 32,
    fontFamily: 'Kavoon_400Regular',
  },
});

export default WaitingRoom;
