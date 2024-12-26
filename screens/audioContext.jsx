import React, { createContext, useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AudioContext = createContext();

const AudioProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [isMuted, setIsMuted] = useState(false); 

  useEffect(() => {
    const loadSound = async () => {
      try {
        console.log('Memulai pemuatan audio');
        const { sound: newSound } = await Audio.Sound.createAsync(
          require('../assets/sound/backsound.mp3'),
          { shouldPlay: true, isLooping: true }
        );
        setSound(newSound);
        console.log('Audio berhasil dimuat dan diputar');
      } catch (error) {
        console.error('Gagal memuat audio:', error);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        console.log('Membongkar audio');
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    const loadIsMuted = async () => {
      try {
        const savedIsMuted = await AsyncStorage.getItem('isMuted');
        if (savedIsMuted !== null) {
          setIsMuted(JSON.parse(savedIsMuted));
        }
      } catch (e) {
        console.error('Failed to load isMuted', e);
      }
    };
    loadIsMuted();
  }, []);

  useEffect(() => {
    const saveIsMuted = async () => {
      try {
        await AsyncStorage.setItem('isMuted', JSON.stringify(isMuted));
      } catch (e) {
        console.error('Failed to save isMuted', e);
      }
    };
    saveIsMuted();
  }, [isMuted]);

  // Apply mute/unmute effect
  useEffect(() => {
    if (sound) {
      if (isMuted) {
        sound.setVolumeAsync(0); 
      } else {
        sound.setVolumeAsync(1); 
      }
    }
  }, [sound, isMuted]);

  return (
    <AudioContext.Provider value={{ sound, isMuted, setIsMuted }}>
      {children}
    </AudioContext.Provider>
  );
};

export { AudioContext, AudioProvider };