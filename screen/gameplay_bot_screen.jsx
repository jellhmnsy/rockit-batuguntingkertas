import React, { useState, useEffect, useRef } from "react";
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

const GameplayScreenBot = ({ navigation }) => {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [timer, setTimer] = useState(5);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [showHands, setShowHands] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef(null);
  const [handLeft, setHandLeft] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [roundResult, setRoundResult] = useState(""); // Untuk menentukan hasil ronde

  useEffect(() => {
    if (!gameOver && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(timerRef.current);

      if (!playerChoice) {
        // Reset timer jika player belum memilih
        setTimer(5);
      } else {
        setShowHands(true);
        const choices = ["rock", "paper", "scissors"];
        const randomChoice =
          choices[Math.floor(Math.random() * choices.length)];
        setHandLeft(randomChoice);
      }
    }

    return () => clearInterval(timerRef.current);
  }, [timer, gameOver, playerChoice]);

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
    if (showHands && playerChoice && handLeft && !gameOver) {
      const result = determineWinner(playerChoice, handLeft); // Tentukan hasil ronde
      setRoundResult(result); // Simpan hasil ronde di state

      // Perbarui skor berdasarkan hasil ronde
      if (result === "win") {
        setScoreA((prevScore) => prevScore + 1);
      } else if (result === "lose") {
        setScoreB((prevScore) => prevScore + 1);
      }

      // Tampilkan modal untuk hasil ronde
      setTimeout(() => {
        setShowModal(true);
      }, 1000);

      // Tutup modal setelah 2 detik dan cek apakah game selesai
      const timeout = setTimeout(() => {
        setShowModal(false);

        // Cek skor untuk menentukan apakah permainan selesai
        if (
          scoreA + (result === "win" ? 1 : 0) === 3 ||
          scoreB + (result === "lose" ? 1 : 0) === 3
        ) {
          setGameOver(true); // Permainan selesai
        } else {
          // Mulai ronde baru jika permainan belum selesai
          startNewRound();
        }
      }, 2000);

      return () => clearTimeout(timeout); // Bersihkan timeout saat komponen diperbarui
    }
  }, [showHands, playerChoice, handLeft, gameOver]); // Tambahkan gameOver ke dalam dependensi

  const startNewRound = () => {
    setPlayerChoice(null);
    setHandLeft(null);
    setShowHands(false);
    setTimer(5);
  };

//   const resetGame = () => {
//     setScoreA(0);
//     setScoreB(0);
//     setPlayerChoice(null);
//     setHandLeft(null);
//     setShowHands(false);
//     setTimer(5);
//     setGameOver(false); // Sembunyikan layar Game Over
//     setShowModal(false); // Sembunyikan modal
//   };

  const handleChoice = (choice) => {
    if (!showHands && timer > 0) {
      setPlayerChoice(choice);
    }
  };

useEffect(() => {
    if (gameOver) {
      navigation.navigate('PostGame', {
        scoreA,
        scoreB,
      });
    }
  }, [gameOver]); 

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
      </View>

      {/* Modal Hasil */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)} // Menutup modal saat ditekan
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
  backgroundGameOver: {},
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: 331, // Diameter of the circle
    height: 259,
    backgroundColor: "#fff",
    borderRadius: 125, // Half of the diameter
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

export default GameplayScreenBot;
