import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getGameToken, login, postJoinGame } from '../api/restApi';

import Pusher from 'pusher-js';

const GameContext = createContext(); //untuk membuat konteks yang memungkinkan data tertentu tersedia untuk seluruh komponen yang ada dalam hierarki



export const GameProvider = ({ children }) => {
  const [token,setToken] = useState(null);
  const [playersJoined, setPlayersJoined] = useState(1); // Dynamic player count

  useEffect(() => {
    if (!token) return;
    const pusher = new Pusher('5ffd502396a114a03464', { cluster: 'ap1' });
    const channel = pusher.subscribe(`game-${token}`);

    channel.bind('room-join', handleRoomJoin)

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [token]);

  const handleRoomJoin = (data) => {
    console.log(data,"pusher");
    let player1 = data.data.player_1_id;
    let player2 = data.data.player_2_id;

    let playerCount = player1 ? player2 ? 2 : 1 : 0;
    setPlayersJoined(playerCount);
  };

  const getToken = async () => {
    try {
      const response = await getGameToken();
      console.log(response);
      setToken(response.data.token);
    } catch (error) {
      console.log(error);
    }
  }

  const joinGame = async (gameToken) => {
    try {
      const response = await postJoinGame(gameToken);
      console.log(response);
      setToken(gameToken);
      setPlayersJoined(2);
    } catch (error) {
      console.log(error);
    }
  }

  const resetGameToken = async () => {
    setToken(null);
  }

 
  return (
    <GameContext.Provider value={{ token, getToken, joinGame, resetGameToken, playersJoined  }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);