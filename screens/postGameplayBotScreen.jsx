import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "@expo-google-fonts/kavoon";
import { Kavoon_400Regular } from "@expo-google-fonts/kavoon";
import { KiwiMaru_400Regular } from "@expo-google-fonts/kiwi-maru";
import { useGame } from "../contexts/GameContext";

const PostGameScreen = ({ route, navigation }) => {
  const { scoreA, scoreB } = route.params;
  const { resetGameToken} = useGame();
  const [fontsLoaded] = useFonts({
    Kavoon_400Regular,
    KiwiMaru_400Regular,
  });

  const handleMenuPress = () => {
    resetGameToken();
    navigation.navigate("Home"); // Navigate to Home screen
  };


  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <ImageBackground
      source={require("../assets/post-gameplay-bg.png")}
      style={styles.backgroundGameOver}
      resizeMode="stretch"
    >
      <View style={styles.gameOverContainer}>
        <Text style={styles.gameOverText}>
          {scoreA === 3 ? "You Win!" : "You Lose!"}
        </Text>
        {/* Score */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreTitle}>A vs B</Text>
          <View style={styles.scores}>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreText}>{scoreA}</Text>
            </View>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreText}>{scoreB}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonGameOverMenu} onPress={handleMenuPress}
        >
          <Text style={styles.buttonTextGameOver}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonGameOverLeaderboard}
        >
          <Text style={styles.buttonTextGameOver}>Leaderboard</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundGameOver: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "stretch",

  },
  gameOverContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gameOverText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    position: "absolute",
    top: 167,
    left: 81,
    fontFamily: "Kavoon_400Regular",
  },
  buttonGameOverMenu: {
    paddingHorizontal: 53,
    paddingVertical: 5,
    marginVertical: 10,
    backgroundColor: "#046865",
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  buttonGameOverLeaderboard: {
    paddingHorizontal: 53,
    paddingVertical: 5,
    marginVertical: 10,
    backgroundColor: "#046865",
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  buttonTextGameOver: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "KiwiMaru_400Regular",
  },
  scoreContainer: {
    alignItems: "center",
    marginTop: 150,
    marginBottom: 30,
  },
  scoreTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    fontFamily: "Kavoon_400Regular",
  },
  scores: {
    flexDirection: "row",
  },
  scoreBox: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
  scoreText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Kavoon_400Regular",
  },
});

export default PostGameScreen;
