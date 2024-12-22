import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useFonts } from "@expo-google-fonts/kavoon";
import { Kavoon_400Regular } from "@expo-google-fonts/kavoon";
import { KiwiMaru_400Regular } from "@expo-google-fonts/kiwi-maru";

const GameplayScreenBot = ({ navigation }) => {
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    const [timer, setTimer] = useState(5);
    const [playerChoice, setPlayerChoice] = useState(null);
    const [showHands, setShowHands] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const timerRef = useRef(null);
    const [handLeft, setHandLeft] = useState(null);
  
    useEffect(() => {
      if (!gameOver && timer > 0) {
        timerRef.current = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      } else if (timer === 0) {
        clearInterval(timerRef.current);
        setShowHands(true);
  
        // Bot membuat pilihan secara acak
        const choices = ["rock", "paper", "scissors"];
        const randomChoice =
          choices[Math.floor(Math.random() * choices.length)];
        setHandLeft(randomChoice);
      }
  
      return () => clearInterval(timerRef.current);
    }, [timer, gameOver]);
  
    const determineWinner = (player, opponent) => {
      if (player === opponent) return "draw";
      if (
        (player === "rock" && opponent === "scissors") ||
        (player === "scissors" && opponent === "paper") ||
        (player === "paper" && opponent === "rock")
      ) {
        return "win";
      }
      return "lose";
    };
  
    useEffect(() => {
      if (showHands && playerChoice && handLeft) {
        const result = determineWinner(playerChoice, handLeft);
        if (result === "win") {
          setScoreA((prevScore) => prevScore + 1);
        } else if (result === "lose") {
          setScoreB((prevScore) => prevScore + 1);
        }
  
        // Mulai ronde baru atau tampilkan layar Game Over
        setTimeout(() => {
          if (scoreA === 2 || scoreB === 2) {
            setGameOver(true); // Tampilkan layar Game Over
          } else {
            startNewRound(); // Reset untuk ronde berikutnya
          }
        }, 2000);
      }
    }, [showHands, playerChoice, handLeft]);
  
    const startNewRound = () => {
      setPlayerChoice(null);
      setHandLeft(null);
      setShowHands(false);
      setTimer(5);
    };
  
    const resetGame = () => {
      setScoreA(0);
      setScoreB(0);
      setPlayerChoice(null);
      setHandLeft(null);
      setShowHands(false);
      setTimer(5);
      setGameOver(false); // Sembunyikan layar Game Over
    };
  
    const handleChoice = (choice) => {
      if (!showHands && timer > 0) {
        setPlayerChoice(choice);
      }
    };
  
    const goToMenu = () => {
      navigation.navigate("Menu"); // Arahkan ke layar Menu utama
    };
  
    const goToLeaderboard = () => {
      navigation.navigate("Leaderboard"); // Arahkan ke layar Leaderboard
    };
  
    return (
      <ImageBackground
        source={require("../assets/gameplay-bg.png")}
        style={styles.background}
        resizeMode="stretch"
      >
        <View style={styles.container}>
          {gameOver ? (
            // Layar Game Over
            <View style={styles.gameOverContainer}>
              <Text style={styles.gameOverText}>
                {scoreA === 3 ? "Player A Wins!" : "Player B Wins!"}
              </Text>
              <TouchableOpacity style={styles.buttonGameOver} onPress={resetGame}>
                <Text style={styles.buttonTextGameOver}>Play Again</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonGameOver} onPress={goToMenu}>
                <Text style={styles.buttonTextGameOver}>Menu</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonGameOver} onPress={goToLeaderboard}>
                <Text style={styles.buttonTextGameOver}>Leaderboard</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Layar Gameplay
            <>
              {timer > 0 && (
                <View style={styles.overlay}>
                  <Text style={styles.timerText}>{timer}</Text>
                </View>
              )}
  
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.lifeText}>Life</Text>
              </View>
  
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
  
              {/* Render Hand */}
              {showHands && handLeft === "rock" && (
                <Image
                  source={require("../assets/gamehand_rock.png")}
                  style={styles.handLeftRock}
                />
              )}
              {showHands && handLeft === "paper" && (
                <Image
                  source={require("../assets/gamehand_paper.png")}
                  style={styles.handLeftPaper}
                />
              )}
              {showHands && handLeft === "scissors" && (
                <Image
                  source={require("../assets/gamehand_scissors.png")}
                  style={styles.handLeftScissors}
                />
              )}
  
              <View style={styles.handsContainer}>
                {showHands && playerChoice === "scissors" && (
                  <Image
                    source={require("../assets/gamehand_scissors.png")}
                    style={styles.handRightScissors}
                  />
                )}
                {showHands && playerChoice === "rock" && (
                  <Image
                    source={require("../assets/gamehand_rock.png")}
                    style={styles.handRightRock}
                  />
                )}
                {showHands && playerChoice === "paper" && (
                  <Image
                    source={require("../assets/gamehand_paper.png")}
                    style={styles.handRightPaper}
                  />
                )}
              </View>
  
              {/* Buttons */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleChoice("scissors")}
                >
                  <Image
                    source={require("../assets/scissors-hand.png")}
                    style={styles.buttonIconHand}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleChoice("rock")}
                >
                  <Image
                    source={require("../assets/rock-hand.png")}
                    style={styles.buttonIconRock}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleChoice("paper")}
                >
                  <Image
                    source={require("../assets/paper-hand.png")}
                    style={styles.buttonIconPaper}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ImageBackground>
    );
  };

const styles = StyleSheet.create({
    gameOverContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      gameOverText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
      },
      buttonGameOver: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#007BFF",
        borderRadius: 5,
        width: 200,
        alignItems: "center",
      },
      buttonTextGameOver: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
      },
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
    flex: 1,
    paddingHorizontal: 20,
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
    alignItems: "center",
    marginBottom: 30,
    right: 100,
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
    marginHorizontal: 10,
    marginLeft: 40,
  },
  scoreText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Kavoon_400Regular",
  },
  handsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  handLeftRock: {
    width: 275,
    height: 137,
    position: "absolute",
    bottom: 300,
    right: 150,
  },
  handLeftPaper: {
    width: 275,
    height: 137,
    position: "absolute",
    bottom: 300,
    right: 150,
  },
  handLeftScissors: {
    transform: "scaleX(-1)",
    width: 275,
    height: 114,
    position: "absolute",
    bottom: 300,
    right: 150,
  },
  handRightScissors: {
    width: 275,
    height: 114,
    position: "absolute",
    left: 100,
    bottom: 50,
  },
  handRightRock: {
    transform: "scaleX(-1)",
    width: 275,
    height: 137,
    position: "absolute",
    left: 100,
    bottom: 50,
  },
  handRightPaper: {
    transform: "scaleX(-1)",
    width: 275,
    height: 137,
    position: "absolute",
    left: 100,
    bottom: 50,
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
});

export default GameplayScreenBot;
