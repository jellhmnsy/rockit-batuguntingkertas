import React, { useState, useEffect, useRef, use } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Modal,
} from "react-native";
import { useFonts } from "@expo-google-fonts/kavoon";
import { Kavoon_400Regular } from "@expo-google-fonts/kavoon";
import { KiwiMaru_400Regular } from "@expo-google-fonts/kiwi-maru";
import { useGame } from "../contexts/GameContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const GameplayScreen = () => {
  const {
    gameOver,
    resultMessage,
    scoreA,
    scoreB,
    handleRestart,
    timer,
    playerChoice,
    handLeft,
    showHands,
    handleChoice,
    status,
    setUserId,
    roundResult,
    showModal,
    setShowModal,
  } = useGame();

  const navigation = useNavigation();
  useEffect(() => {
    if (status === "Finished") {
      setTimeout(() => {
        navigation.navigate("PostGame", { scoreA, scoreB });
      }, 3000);
    }
  }, [status]);

  const [fontsLoaded] = useFonts({
    Kavoon_400Regular,
    KiwiMaru_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <ImageBackground
      source={require("../assets/gameplay-bg.png")}
      style={styles.background}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <>
        {timer > 0 && (
          <View style={styles.overlay}>
            <Text style={styles.timerText}>{timer}</Text>
          </View>
        )}
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.lifeText}></Text>
        </View>

        {/* Score */}
        <View style={styles.scoreContainer}>
          <View style={styles.scoreTitle}>
            <View style={styles.playerContainer}>
              <Text style={styles.playerText}>You</Text>
            </View>
            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>vs</Text>
            </View>
            <View style={styles.botContainer}>
              <Text style={styles.botText}>Opponent</Text>
            </View>
          </View>
          <View style={styles.scores}>
            <View style={styles.scoreBoxPlayer}>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreText}>{scoreA}</Text>
              </View>
            </View>
            <View style={styles.scoreBoxBot}>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreText}>{scoreB}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* <View style={styles.scoreContainer}>
          <Text style={styles.scoreTitle}>A vs B</Text>
          <View style={styles.scores}>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreText}>{scoreA}</Text>
            </View>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreText}>{scoreB}</Text>
            </View>
          </View>
        </View> */}

        {/* Hands */}
        {/* Render hand left */}
        {showHands && handLeft === "Rock" && (
          <Image
            source={require("../assets/gamehand_rock.png")}
            style={styles.handLeftRock}
          />
        )}
        {showHands && handLeft === "Paper" && (
          <Image
            source={require("../assets/gamehand_paper.png")}
            style={styles.handLeftPaper}
          />
        )}
        {showHands && handLeft === "Scissors" && (
          <Image
            source={require("../assets/gamehand_scissors.png")}
            style={styles.handLeftScissors}
          />
        )}

        {/* render hand right */}
        <View style={styles.handsContainer}>
          {showHands && playerChoice === "Scissors" && (
            <Image
              source={require("../assets/gamehand_scissors.png")}
              style={styles.handRightScissors}
            />
          )}
          {showHands && playerChoice === "Rock" && (
            <Image
              source={require("../assets/gamehand_rock.png")}
              style={styles.handRightRock}
            />
          )}
          {showHands && playerChoice === "Paper" && (
            <Image
              source={require("../assets/gamehand_paper.png")}
              style={styles.handRightPaper}
            />
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              playerChoice === "Scissors" && styles.buttonActive,
            ]}
            onPress={() => handleChoice("Scissors")}
          >
            <Image
              source={require("../assets/scissors-hand.png")}
              style={styles.buttonIconHand}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              playerChoice === "Rock" && styles.buttonActive,
            ]}
            onPress={() => handleChoice("Rock")}
          >
            <Image
              source={require("../assets/rock-hand.png")}
              style={styles.buttonIconRock}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              playerChoice === "Paper" && styles.buttonActive,
            ]}
            onPress={() => handleChoice("Paper")}
          >
            <Image
              source={require("../assets/paper-hand.png")}
              style={styles.buttonIconPaper}
            />
          </TouchableOpacity>
        </View>
        </>
      </View>
      
      {/* Modal Hasil */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {roundResult === "lose"
                ? "YOU LOSE!"
                : roundResult === "win"
                ? "YOU WIN!"
                : "IT'S A DRAW!"}
            </Text>

            {/* Menampilkan subtext berdasarkan hasil */}
            <Text style={styles.modalSubText}>
              {roundResult === "win"
                ? "Good job"
                : roundResult === "draw"
                ? "Try again"
                : "Keep going"}
            </Text>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center", // Pusatkan konten secara vertikal
    alignItems: "center", // Pusatkan konten secara horizontal
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.65)", // Background semi-transparan
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5, // Pastikan di atas elemen lain
  },
  container: {
    // flex: 1,
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  lifeContainer: {
    flexDirection: "row",
  },
  lifeIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  lifeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "KiwiMaru_400Regular",
  },
  scoreContainer: {
    alignItems: "start",
    marginBottom: 30,
  },
  scoreTitle: {
    fontSize: 40,
    color: "#000",
    marginBottom: 10,
    fontFamily: "Kavoon_400Regular",
    flexDirection: "row",
    width: "auto",
  },
  playerContainer: {
    flex: 3,
  },
  vsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  botContainer: {
    flex: 3,
  },
  playerText: {
    fontSize: 30,
    color: "#000",
    fontFamily: "Kavoon_400Regular",
    textAlign: "right",
    marginRight: 5,
  },
  botText: {
    fontSize: 30,
    color: "#000",
    fontFamily: "Kavoon_400Regular",
    textAlign: "left",
    marginLeft: 5,
  },
  vsText: {
    fontSize: 28,
    color: "#000",
    fontFamily: "Kavoon_400Regular",
    textAlign: "center",
    textAlignVertical: "bottom",
  },
  scores: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    // flex: 1,
  },
  scoreBox: {
    backgroundColor: "#FFF",
    marginHorizontal: 40,
    paddingHorizontal: 20,
    paddingBottom: 10,
    // marginLeft: 40,
    width: "auto",
    alignContent: "center",
  },
  scoreBoxPlayer: {
    flexShrink: 1,
  },
  scoreBoxBot: {
    flexShrink: 1,
  },
  scoreText: {
    fontSize: 40,
    color: "#000",
    fontFamily: "Kavoon_400Regular",
  },
  handsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  handRightRock: {
    width: 275,
    height: 137,
    position: "absolute",
    bottom: 150,
    right: 100,
  },
  handLeftRock: {
    transform: "scaleX(-1)",
    width: 275,
    height: 137,
    position: "absolute",
    left: 140,
    bottom: 150,
  },
  handRightPaper: {
    width: 275,
    height: 137,
    position: "absolute",
    bottom: 150,
    right: 100,
  },
  handLeftPaper: {
    transform: "scaleX(-1)",
    width: 275,
    height: 137,
    position: "absolute",
    left: 140,
    bottom: 150,
  },
  handRightScissors: {
    transform: "scaleX(-1)",
    width: 275,
    height: 114,
    position: "absolute",
    bottom: 150,
    right: 100,
  },
  handLeftScissors: {
    width: 275,
    height: 114,
    position: "absolute",
    left: 140,
    bottom: 150,
  },
  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 348,
    left: 200,

    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  timerText: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#FFF",
    fontFamily: "Kavoon_400Regular",
  },
  buttonsContainer: {
    flexDirection: "row", // Atur elemen sejajar secara horizontal
    justifyContent: "space-between", // Berikan jarak di antara elemen
    alignItems: "center", // Pusatkan elemen secara vertikal
    width: "80%", // Sesuaikan lebar container
    alignSelf: "center", // Pusatkan container
    marginBottom: 40,
  },
  button: {
    width: 100,
    height: 100,
    backgroundColor: "#FFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    zIndex: 10, // Overlay di atas layar, tapi di bawah tombol
  },
  buttonActive: {
    backgroundColor: "#FF8552",
  },

  buttonIconHand: {
    width: 50.36,
    height: 70.07,
    resizeMode: "contain",
  },
  buttonIconRock: {
    width: 55.99,
    height: 69.92,
  },
  buttonIconPaper: {
    width: 64,
    height: 64,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 331,
    height: 259,
    backgroundColor: "#fff",
    borderRadius: 125,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalText: {
    fontSize: 32,
    color: "#046865",
    fontFamily: "Kavoon_400Regular",
    textAlign: "center",
    marginBottom: 10,
  },
  modalSubText: {
    fontSize: 18,
    color: "#046865",
    fontFamily: "KiwiMaru_400Regular",
    textAlign: "center",
  },
});

export default GameplayScreen;
