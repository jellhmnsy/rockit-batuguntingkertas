import React, { createContext, useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AudioContext = createContext();

const AudioProvider = ({ children, isLoggedIn }) => {
  const [sound, setSound] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const soundRef = useRef(null); 

  useEffect(() => {
    const loadSound = async () => {
      if (isLoggedIn) {
        try {
          console.log('Loading audio...');
          const { sound: newSound } = await Audio.Sound.createAsync(
            require('../assets/sound/backsound.mp3'),
            { shouldPlay: true, isLooping: true, volume: isMuted ? 0 : 1 }
          );
          soundRef.current = newSound;
          setSound(newSound);
          console.log('Audio loaded and playing.');
        } catch (error) {
          console.error('Error loading audio:', error);
        }
      }
    };

    loadSound();

    return () => {
      if (soundRef.current) {
        console.log('Unloading audio...');
        soundRef.current.unloadAsync();
        soundRef.current = null;
        setSound(null);
      }
    };
  }, [isLoggedIn, isMuted]); 

  const handleLogoutAndStopAudio = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      if (soundRef.current) {
        console.log('Stopping and unloading audio during logout...');
        await soundRef.current.unloadAsync();
        soundRef.current = null;
        setSound(null);
      }
    } catch (error) {
      console.error('Error during logout and stopping audio:', error);
    }
  };

  useEffect(() => {
    const loadIsMuted = async () => {
      try {
        const savedIsMuted = await AsyncStorage.getItem('isMuted');
        if (savedIsMuted !== null) {
          setIsMuted(JSON.parse(savedIsMuted));
        }
      } catch (error) {
        console.error('Error loading isMuted state:', error);
      }
    };
    loadIsMuted();
  }, []);

  useEffect(() => {
    const saveIsMuted = async () => {
      try {
        await AsyncStorage.setItem('isMuted', JSON.stringify(isMuted));
      } catch (error) {
        console.error('Error saving isMuted state:', error);
      }
    };
    saveIsMuted();
  }, [isMuted]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.setVolumeAsync(isMuted ? 0 : 1);
    }
  }, [isMuted]);

  return (
    <AudioContext.Provider value={{ sound, isMuted, setIsMuted, handleLogoutAndStopAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export { AudioContext, AudioProvider };
