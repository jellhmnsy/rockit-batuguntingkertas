import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  useContext,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

//Font
import { useFonts } from "expo-font";
import { Kavoon_400Regular } from "@expo-google-fonts/kavoon";
import { KiwiMaru_300Light } from "@expo-google-fonts/kiwi-maru";
import { KiwiMaru_400Regular } from "@expo-google-fonts/kiwi-maru";
import { KiwiMaru_500Medium } from "@expo-google-fonts/kiwi-maru";

//Icon
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableWithoutFeedback } from "react-native-web";

//Api
import { getLeaderboard, getUserInfo } from "../api/restApi";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

//Audio
import { AudioContext } from "./audioContext";
import { useGame } from "../contexts/GameContext";
import { useAuth } from "../contexts/AuthContext";

const slideList = [
  {
    id: 1,
    type: "first",
    image: "https://placekitten.com/200/300",
  },
  {
    id: 2,
    type: "second",
    image: "https://placekitten.com/200/300",
  },
];

const Slide = memo(({ data }) => {
  if (data.type === "first") {
    return (
      <View style={styles.slide}>
        <View style={styles.firstSlideContent}>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.firstSlideTitle}>
              How to play and WIN the game:
            </Text>
          </View>
          <View style={styles.pointContainer}>
            <Image
              style={{ marginTop: -10 }}
              source={require("../assets/icon/home/star.png")}
            />
            <Text style={styles.firstSlideText}>
              You will start with 3 lives, represented by stone symbols.
            </Text>
          </View>
          <View style={styles.pointContainer}>
            <Image
              style={{ marginTop: -10 }}
              source={require("../assets/icon/home/star.png")}
            />
            <Text style={styles.firstSlideText}>
              You "win" the game if your score exceeds your opponent's score.
            </Text>
          </View>
        </View>
      </View>
    );
  } else if (data.type === "second") {
    return (
      <View style={styles.slide}>
        <View style={styles.firstSlideContent}>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.firstSlideTitle}>
              How to play and WIN the game:
            </Text>
          </View>
          <View style={styles.pointContainer}>
            <Image
              style={{ marginTop: -10 }}
              source={require("../assets/icon/home/rules.png")}
            />
          </View>
        </View>
      </View>
    );
  }
  return null;
});

const Pagination = ({ index }) => (
  <View style={styles.pagination} pointerEvents="none">
    {slideList.map((_, i) => (
      <View
        key={i}
        style={[
          styles.paginationDot,
          index === i
            ? styles.paginationDotActive
            : styles.paginationDotInactive,
        ]}
      />
    ))}
  </View>
);



const HomeScreen = ({ navigation }) => {
  //Audio
  const { sound, isMuted, setIsMuted } = useContext(AudioContext);
  const [icon, setIcon] = useState("volume-high-outline"); // Ikon awal

  useEffect(() => {
    setIcon(isMuted ? "volume-mute-outline" : "volume-high-outline");
  }, [isMuted]);

  const toggleMute = async () => {
    setIsMuted(!isMuted);
  };

  //Font
  const [fontsLoaded] = useFonts({
    Kavoon_400Regular,
    KiwiMaru_300Light,
    KiwiMaru_400Regular,
    KiwiMaru_500Medium,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [token, setToken] = useState("");
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const flatListRef = useRef(null);

  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setIndex(index);
  }, []);

  const handleMultiplayerPress = () => {
    setIsModalVisible("multiplayer", true);
  };

  const handleInformationPress = () => {
    setIsModalVisible("information", true);
  };

  const handleLeaderboardPress = () => {
    setIsModalVisible("leaderboard", true);
  };

  const handleSolo = () => {
    navigation.navigate("GamePlayBot");
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setToken("");
  };
  const { joinGame, token:gameToken, resetGameToken } = useGame();
  const { logout,setUserId } = useAuth();
  const handleLogout = (navigation) => {
    logout();
    console.log("User logged out");
    navigation.navigate("Login");
  };
  const handleSubmit = async () => {
    // Validate token (example)
    if (token.trim() === '') {
      alert('Please enter a token');
      return;
    }
    
    try {
      console.log(token);
      const response = await joinGame(token);
      console.log(response,'join')
      if (response ) {
        navigation.navigate('WaitingRoom');
      }
    
    } catch (error) {
      alert(error.message);
    }
    
    // Handle token submission logic here (e.g., sen    d to server)
    console.log('Submitted Token:', token, 'Response:', response, 'Response:', response);
    handleCloseModal();
  };


  const handleCreate = () => {
    resetGameToken();
    navigation.navigate("WaitingRoom");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        setLoading(true);
        setError(null);
        const result = await getLeaderboard();
        console.log("Data successfully loaded:", result);
        setData(result.leaderboard);
        setUserRank(result.user_rank);
        const userInfo = await getUserInfo();
        if (userInfo && userInfo.username) {
          setUsername(userInfo.username);
          setUserId(userInfo.id);
        } else {
          console.warn("Username not found in userInfo:", userInfo);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log("Loading completed");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    resetGameToken();
  },[]);



  // Render baris tabel
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.row,
        item.id === userRank?.id ? styles.highlightRow : null,
      ]}
    >
      <View style={styles.cellRankContainer}>
        <Text style={styles.cellRank}>{item.rank}</Text>
      </View>
      <Text
        style={[
          styles.cellUsername,
          item.id === userRank?.id ? styles.cellUsernameMe : null,
        ]}
      >
        {item.username}
      </Text>
      <Text
        style={[
          styles.cellScore,
          item.id === userRank?.id ? styles.cellScoreMe : null,
        ]}
      >
        {item.win_count}
      </Text>
    </View>
  );

  return fontsLoaded ? (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#FF8552", "transparent"]}
        style={styles.background}
      />
      <TouchableOpacity
        style={styles.headerExit}
        onPress={() => handleLogout(navigation)}
      >
        <MaterialCommunityIcons name="exit-to-app" size={50} color="white" />
      </TouchableOpacity>

      <View style={styles.headerWrapper}>
        <Text style={styles.title}>Hello, {username || "Guest"}</Text>
        <Text style={styles.subtitle}>Welcome to RockiT Game</Text>
      </View>

      <View>
        <Text style={styles.heading}>Choose a game mode</Text>
      </View>

      <View style={styles.imageContainer2}>
        <Image
          source={require("../assets/icon/home/image.png")}
          style={styles.imageGame}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonWrapper} onPress={handleSolo}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/icon/home/boy.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Solo Player</Text>
          </View>
          <View style={styles.imageContainer1}>
            <Image
              source={require("../assets/icon/home/bot.png")}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>

        <Text style={styles.orText}>or</Text>

        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={handleMultiplayerPress}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/icon/home/boy.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Multiplayer</Text>
          </View>
          <View style={styles.imageContainer1}>
            <Image
              source={require("../assets/icon/home/girl.png")}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerWrapper}>
          <TouchableOpacity style={styles.soundButton} onPress={toggleMute}>
            <Ionicons name={icon} size={38} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.soundButton}
            onPress={handleInformationPress}
          >
            <Image
              style={styles.documentIcon}
              source={require("../assets/icon/home/file-1.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.leaderboardButton}
            onPress={handleLeaderboardPress}
          >
            <MaterialIcons name="leaderboard" size={36} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal Informasi */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible === "information"}
        onRequestClose={handleCloseModal}
      >
        <TouchableOpacity
          accessible={false}
          activeOpacity={1}
          style={styles.modalOverlay}
          onPress={() => setIsModalVisible(false)}
        ></TouchableOpacity>
        <View style={styles.modalContainer0}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalHeader}>
              <Image
                style={styles.documentIconModals}
                source={require("../assets/icon/home/file-1.png")}
              />
            </View>
            <FlatList
              ref={flatListRef}
              data={slideList}
              renderItem={({ item }) => <Slide data={item} />}
              horizontal
              pagingEnabled
              onScroll={onScroll}
              keyExtractor={(item) => item.id.toString()}
            />
            <Pagination index={index} />
          </View>
        </View>
      </Modal>

      {/* Modal Multiplayer */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible === "multiplayer"}
        onRequestClose={handleCloseModal}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={handleCloseModal}
        >
          <TouchableWithoutFeedback>
            <View style={styles.coba}>
              <View style={styles.coba1}>
                <TouchableOpacity onPress={handleCreate}>
                  <Text style={styles.modalTitle1}>Create Room</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.coba2}>
                <Text style={styles.modalTitle}>Join Room</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Masukkan Token"
                  value={token}
                  onChangeText={(text) => setToken(text)}
                />
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={()=>handleSubmit()}
                  >
                    <Text style={styles.modalButtonText}>SUBMIT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      {/* Modal Leaderboard */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible === "leaderboard"}
        onRequestClose={handleCloseModal}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={handleCloseModal}
        >
          <TouchableWithoutFeedback>
            <View style={styles.coba}>
              <View style={styles.leaderboardTitle}>
                <Image
                  style={styles.leaderboardIconModals}
                  source={require("../assets/icon/home/leaderboard.png")}
                />
                <Text style={styles.leaderboardTitleText}>Leaderboard</Text>
              </View>
              <View style={styles.leaderboardContainer}>
                <View style={styles.modalContent}>
                  {/* Header Modal */}
                  {/* Tabel */}
                  <View style={styles.table}>
                    {/* Header Tabel */}
                    <View style={styles.rowHeader}>
                      <Text style={styles.cellHeaderRank}>Rank</Text>
                      <Text style={styles.cellHeaderUsername}>Username</Text>
                      <Text style={styles.cellHeaderScore}>Score</Text>
                    </View>
                    {/* Data Tabel */}
                    {loading ? (
                      <ActivityIndicator size="large" color="#6200EE" />
                    ) : error ? (
                      <Text style={styles.errorText}>{error}</Text>
                    ) : (
                      <>
                        <FlatList
                          data={data.filter((item) => item.rank <= 5)}
                          renderItem={renderItem}
                          keyExtractor={(item) => item.id.toString()}
                        />
                        {userRank && userRank.rank > 5 && (
                          <View style={[styles.row, styles.userRankRow]}>
                            <View style={styles.cellRankContainer}>
                              <Text style={styles.cellRank}>
                                {userRank.rank}
                              </Text>
                            </View>
                            <Text style={styles.cellUsernameMe}>
                              {userRank.username}
                            </Text>
                            <Text style={styles.cellScoreMe}>
                              {userRank.win_count}
                            </Text>
                          </View>
                        )}
                      </>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  ) : (
    <Text>Loading fonts...</Text>
  );
};
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "80%",
  },
  coba: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 30,
    paddingBottom: 30,
    borderRadius: 30,
    height: "auto",
  },
  coba2: {
    backgroundColor: "#ff9d75",
    opacity: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#FF8552",
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 20,
  },
  leaderboardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  coba1: {
    backgroundColor: "#ff9d75",
    opacity: 1,
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#FF8552",
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 20,
  },
  leaderboardTitle: {
    opacity: 1,
    paddingBottom: 5,
    alignItems: "center",
  },
  leaderboardIconModals: {
    width: 80,
    height: 80,
  },
  container: {
    width: "100%",
    flex: 1,
    padding: 20,
    backgroundColor: "#046865",
  },
  headerWrapper: {
    marginTop: -20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 36,
    color: "#000",
    fontFamily: "Kavoon_400Regular",
  },
  headerExit: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
    fontFamily: "KiwiMaru_300Light",
  },
  heading: {
    fontSize: 28,
    color: "#fff",
    marginVertical: 10,
    fontFamily: "KiwiMaru_400Regular",
    textAlign: "center",
  },
  imageContainer: {
    position: "absolute",
    zIndex: 1,
    top: 2,
    left: -4,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 16,
  },
  imageContainer1: {
    position: "absolute",
    zIndex: 1,
    top: 2,
    right: -4,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 16,
  },
  imageContainer2: {
    alignItems: "center",
    marginTop: -40,
  },
  image: {
    width: 50,
    height: 50,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  buttonWrapper: {
    position: "relative",
    zIndex: 0,
    flexDirection: "row",
  },
  button: {
    width: "100%",
    zIndex: 0,
    position: "relative",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    paddingVertical: 15,
    borderRadius: 30,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 24,
    color: "#000",
    fontFamily: "Kavoon_400Regular",
  },
  orText: {
    marginVertical: 10,
    fontSize: 24,
    color: "white",
    fontFamily: "KiwiMaru_300Light",
  },
  soundButton: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  documentIcon: {
    height: 38,
    width: 38,
  },
  documentIconModals: {
    height: 54,
    width: 54,
  },
  leaderboardButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 50,
  },
  soundIcon: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 50,
  },
  footer: {
    display: "flex",
    width: "100%",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  footerWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
  },
  modalContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 32,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Kavoon_400Regular",
  },
  modalTitle1: {
    fontSize: 32,
    textAlign: "center",
    fontFamily: "Kavoon_400Regular",
  },
  leaderboardTitleText: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "KiwiMaru_500Medium",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    marginBottom: 15,
    fontFamily: "KiwiMaru_500Medium",
    textAlign: "center",
    backgroundColor: "white",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
  },
  modalButton: {
    backgroundColor: "#046865",
    padding: 10,
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 28,
  },
  modalButtonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "KiwiMaru_300Light",
    fontSize: 20,
  },
  container0: { flex: 1 },
  modalContainer0: {
    overflow: "hidden",
    marginVertical: "auto",
    padding: 0,
    marginHorizontal: 10,
    paddingHorizontal: 5,
    zIndex: 2,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "screen",
    height: "screen",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  modalWrapper: {
    width: "auto",
    height: "350",
    margin: 20,
    marginVertical: "auto",
    backgroundColor: "white",
    borderRadius: 28,
  },
  modalHeader: {
    paddingTop: 12,
    alignItems: "center",
    paddingBottom: 20,
  },
  slide: {
    width: windowWidth * 0.8,
    alignItems: "center",
  },
  slideImage: {
    width: windowWidth * 1,
    height: windowHeight * 0.7,
  },
  pagination: {
    position: "absolute",
    bottom: 22,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  paginationDot: {
    width: 16,
    height: 16,
    borderRadius: 50,
    marginHorizontal: 2,
  },
  paginationDotActive: {
    backgroundColor: "#FF8552",
    borderWidth: 1,
    borderColor: "black",
  },
  paginationDotInactive: {
    backgroundColor: "gray",
  },
  firstSlideContent: {},
  pointContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 40,
    marginVertical: 5,
    alignItems: "start",
  },
  firstSlideTitle: {
    fontSize: 16,
    fontFamily: "KiwiMaru_500Medium",
    textAlign: "center",
    width: "100%",
  },
  firstSlideText: {
    fontSize: 16,
    fontFamily: "KiwiMaru_400Regular",
    width: "100%",
  },
  secondSlideContent: { flex: 1, backgroundColor: "lightblue", padding: 20 },
  secondSlideText: { fontSize: 20, color: "white" },
  modalContent: {
    backgroundColor: "#FF8552",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  table: {},
  rowHeader: {
    flexDirection: "row",
    backgroundColor: "#FF8552",
    borderBottomWidth: 2,
    borderColor: "white",
  },
  row: {
    flexDirection: "row",
  },
  cellHeaderRank: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 0,
    textAlign: "center",
    color: "white",
    fontFamily: "KiwiMaru_500Medium",
  },
  cellHeaderUsername: {
    flex: 3,
    paddingVertical: 5,
    paddingHorizontal: 0,
    textAlign: "center",
    color: "white",
    fontFamily: "KiwiMaru_500Medium",
  },
  cellHeaderScore: {
    flex: 2,
    paddingVertical: 5,
    paddingHorizontal: 0,
    textAlign: "center",
    color: "white",
    fontFamily: "KiwiMaru_500Medium",
  },
  cellRankContainer: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  cellRank: {
    flex: 1,
    textAlign: "center",
    fontWeight: "500",
    verticalAlign: "middle",
    fontFamily: "KiwiMaru_500Medium",
  },
  cellRankMe: {
    flex: 1,
    textAlign: "center",
    fontWeight: "500",
    verticalAlign: "middle",
    fontFamily: "KiwiMaru_500Medium",
  },
  cellUsername: {
    flex: 3,
    paddingVertical: 10,
    paddingHorizontal: 0,
    textAlign: "center",
    fontFamily: "KiwiMaru_500Medium",
  },
  cellUsernameMe: {
    flex: 3,
    paddingVertical: 10,
    paddingHorizontal: 0,
    textAlign: "center",
    fontFamily: "KiwiMaru_500Medium",
    color: "white",
  },
  cellScore: {
    flex: 2,
    paddingVertical: 10,
    paddingHorizontal: 0,
    textAlign: "center",
    fontFamily: "KiwiMaru_500Medium",
  },
  cellScoreMe: {
    flex: 2,
    paddingVertical: 10,
    paddingHorizontal: 0,
    textAlign: "center",
    fontFamily: "KiwiMaru_500Medium",
    color: "white",
  },
  userRankRow: {
    backgroundColor: "#046865",
  },
  highlightRow: {
    backgroundColor: "#046865",
  },
});

export default HomeScreen;
