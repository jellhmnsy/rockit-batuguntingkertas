import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apii = axios.create({
  baseURL: 'http://13.239.139.158',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const leaderboard = async () => {
  try {
    console.log('Fetching token from storage...');
    const token = await AsyncStorage.getItem('userToken');
    console.log('Token fetched:', token);
    if (!token) throw new Error('No token found');

    console.log('Fetching leaderboard data...');
    const response = await apii.get('/users/leaderboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Leaderboard data fetched:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Fetch Profile Error:', error.response?.data || error.message);
    if (error.response?.status === 403) {
      console.warn('Unauthorized access - Invalid Token');
    }
    throw error;
  }
};

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
        const result = await leaderboard();
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
      <Text style={styles.cell}>{item.rank}</Text>
      <Text style={styles.cell}>{item.username}</Text>
      <Text style={styles.cell}>{item.win_count}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Show Table</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header Modal */}
            <View style={styles.header}>
              <Text style={styles.headerText}>Leaderboard</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* Tabel */}
            <View style={styles.table}>
              {/* Header Tabel */}
              <View style={styles.rowHeader}>
                <Text style={styles.cellHeader}>Rank</Text>
                <Text style={styles.cellHeader}>Username</Text>
                <Text style={styles.cellHeader}>Wins</Text>
              </View>
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
                      <Text style={styles.cell}>{userRank.rank}</Text>
                      <Text style={styles.cell}>{userRank.username}</Text>
                      <Text style={styles.cell}>{userRank.win_count}</Text>
                    </View>
                  )}
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  highlightRow: {
    backgroundColor: '#6200EE',
  },
  userRankRow: {
    backgroundColor: '#e0f7fa',
  },
  cellHeader: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default App;
