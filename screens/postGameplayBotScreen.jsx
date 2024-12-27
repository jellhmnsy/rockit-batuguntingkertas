import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  Image,
} from "react-native";
import { TouchableWithoutFeedback } from 'react-native-web';
import { useFonts } from "@expo-google-fonts/kavoon";
import { Kavoon_400Regular } from "@expo-google-fonts/kavoon";
import { KiwiMaru_400Regular } from "@expo-google-fonts/kiwi-maru";
//Api
import { getLeaderboard} from "../api/restApi";
import { useGame } from "../contexts/GameContext";

const PostGameScreen = ({ route, navigation }) => {
  const { scoreA, scoreB } = route.params;

  const { resetGameToken} = useGame();
  //Modal Leaderboard
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
      const fetchData = async () => {
        try {
          console.log('Fetching data...');
          setLoading(true);
          setError(null);
          const result = await getLeaderboard();
          console.log('Data successfully loaded:', result);
          setData(result.leaderboard);
          setUserRank(result.user_rank);
        } catch (err) {
          console.error('Error loading data:', err);
          setError(err.message);
        } finally {
          setLoading(false);
          console.log('Loading completed');
        }
      };
  
      fetchData();
    }, []);
    
      // Render baris tabel
    const renderItem = ({ item }) => (
      <View style={[styles.row, item.id === userRank?.id ? styles.highlightRow : null]}>
        <View style={styles.cellRankContainer}>
          <Text style={styles.cellRank}>{item.rank}</Text>
        </View>
        <Text style={[styles.cellUsername, item.id === userRank?.id ? styles.cellUsernameMe : null]}>{item.username}</Text>
        <Text style={[styles.cellScore, item.id === userRank?.id ? styles.cellScoreMe : null]}>{item.win_count}</Text>
      </View>
    );
  

  const [fontsLoaded] = useFonts({
    Kavoon_400Regular,
    KiwiMaru_400Regular,
  });

  const handleMenuPress = () => {
    resetGameToken();
    navigation.navigate("Home"); // Navigate to Home screen
  };
  const handleLeaderboardPress = () => {
    setIsModalVisible('leaderboard', true);
  }
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  
  return fontsLoaded ?(
    <ImageBackground
      source={require("../assets/post-gameplay-bg.png")}
      style={styles.backgroundGameOver}
      resizeMode="stretch"
    >
      <View style={styles.gameOverContainer}>
        <View style={styles.firstCircle}>
          <View style={styles.secondCircle}>
          <Text style={styles.gameOverText}>
            {scoreA === 3 ? "You Win!" : "You Lose!"}
          </Text>
          </View>  
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
        <TouchableOpacity
          style={styles.buttonGameOverMenu} onPress={handleMenuPress}
        >
          <Text style={styles.buttonTextGameOver}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonGameOverLeaderboard}
        >
          <Text style={styles.buttonTextGameOver} onPress={handleLeaderboardPress}>Leaderboard</Text>
        </TouchableOpacity>

      {/* Modal Leaderboard */}
        <Modal animationType="fade" transparent={true} visible={isModalVisible === 'leaderboard'} onRequestClose={handleCloseModal}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPressOut={handleCloseModal}>
          <TouchableWithoutFeedback>
            <View style={styles.coba}>
              <View style={styles.leaderboardTitle}>
                <Image style={styles.leaderboardIconModals} source={require('../assets/icon/home/leaderboard.png')}/>
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
                    data={data.filter(item => item.rank <= 5)}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()} />
                  {userRank && userRank.rank > 5 && (
                    <View style={[styles.row, styles.userRankRow]}>
                      <View style={styles.cellRankContainer}>
                        <Text style={styles.cellRank}>{userRank.rank}</Text>
                      </View>
                      <Text style={styles.cellUsernameMe}>{userRank.username}</Text>
                      <Text style={styles.cellScoreMe}>{userRank.win_count}</Text>
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
    </ImageBackground>
  ) : (
      <Text>Loading fonts...</Text>
    );
};
const styles = StyleSheet.create({
  backgroundGameOver: {
    flex: 1,
    padding: 40,
  },
  gameOverContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  firstCircle: {
    width: 332,
    height: 277,
    borderRadius: "100%",
    backgroundColor: "#FFF",
    justifyContent: "center",
    marginBottom: 20,
  },
  secondCircle: {
    width: 289,
    height: 237,
    borderRadius: "100%",
    backgroundColor: "#046865",
    justifyContent: "center",
  },
  gameOverImage: {
    justifyContent: "center",
    alignItems: "center",
    width: 302,
    height: 244,
    marginTop: -100,
    marginBottom: -100,
  },
  gameOverText: {
    fontSize: 40,
    color: "white",
    marginBottom: 20,
    fontFamily: "Kavoon_400Regular",
    textAlign: "center",
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
    fontFamily: "KiwiMaru_400Regular",
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  scoreTitle: {
    fontSize: 40,
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
    color: "#000",
    fontFamily: "Kavoon_400Regular",
    marginTop: -20,
  },

  //Styling Modal
  modalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  coba: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 30,
    paddingBottom: 30,
    borderRadius: 30,
    height: 'auto',
  },
  leaderboardTitle: {
    opacity: 1,
    paddingBottom: 5,
    alignItems: 'center',
  },
  leaderboardIconModals: {
    width: 80,
    height: 80,
  },
  leaderboardTitleText: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'KiwiMaru_500Medium',
  },
  leaderboardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  modalContent: {
    backgroundColor: '#FF8552',
    width: '100%',
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: '#FF8552',
    borderBottomWidth: 2,
    borderColor: 'white',
  },
  cellHeaderUsername: {
    flex: 3,
    paddingVertical: 5,
    paddingHorizontal:0,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'KiwiMaru_500Medium',
  },
  cellHeaderScore: {
    flex: 2,
    paddingVertical: 5,
    paddingHorizontal:0,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'KiwiMaru_500Medium',
  },
  row: {
    flexDirection: 'row',
  },
  highlightRow: {
    backgroundColor: '#e0f7fa',
  },
  cellRankContainer : {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cellRank: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
    verticalAlign: 'middle',
    fontFamily: 'KiwiMaru_500Medium',
  },
  cellHeaderRank: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal:0,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'KiwiMaru_500Medium',
  },
  cellHeaderUsername: {
    flex: 3,
    paddingVertical: 5,
    paddingHorizontal:0,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'KiwiMaru_500Medium',
  },
  cellHeaderScore: {
    flex: 2,
    paddingVertical: 5,
    paddingHorizontal:0,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'KiwiMaru_500Medium',
  },
  cellRankContainer : {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cellRank: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
    verticalAlign: 'middle',
    fontFamily: 'KiwiMaru_500Medium',
  },
  cellRankMe: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
    verticalAlign: 'middle',
    fontFamily: 'KiwiMaru_500Medium',
  },
  cellUsername: {
    flex: 3,
    paddingVertical: 10,
    paddingHorizontal:0,
    textAlign: 'center',
    fontFamily: 'KiwiMaru_500Medium',
  },
  cellUsernameMe: {
    flex: 3,
    paddingVertical: 10,
    paddingHorizontal:0,
    textAlign: 'center',
    fontFamily: 'KiwiMaru_500Medium',
    color: 'white'
  },
  cellScore: {
    flex: 2,
    paddingVertical: 10,
    paddingHorizontal:0,
    textAlign: 'center',
    fontFamily: 'KiwiMaru_500Medium',
  },
  cellScoreMe: {
    flex: 2,
    paddingVertical: 10,
    paddingHorizontal:0,
    textAlign: 'center',
    fontFamily: 'KiwiMaru_500Medium',
    color: 'white'
  },
  userRankRow: {
    backgroundColor: '#046865',
  },
  highlightRow: {
    backgroundColor: '#046865',
  },
});

export default PostGameScreen;
