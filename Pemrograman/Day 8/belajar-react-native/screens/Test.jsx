import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import { fetchPosts } from '../api/restApi'; // Import fungsi fetchPosts dari restApi.js

export default function HomeScreen() {
  const [users, setUsers] = useState([]); // State untuk menyimpan data
  const [loading, setLoading] = useState(true); // State untuk indikator loading
  const [error, setError] = useState(null); // State untuk menangani error

  useEffect(() => {
    fetchData(); // Fetch data saat komponen dimuat pertama kali
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchPosts(); // Panggil fungsi fetchPosts
      setUsers(data); // Set hasil fetch ke state users
    } catch (err) {
      setError('Failed to fetch data: ' + err.message); // Set error message
    } finally {
      setLoading(false); // Matikan loading indicator
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>
      <FlatList
        data={users} // Data pengguna
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={{ width: 50, height: 50 }}></Image>
            <Text style={styles.userName}>{item.first_name} {item.last_name}</Text>
            <Text>Email: {item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFD',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
});
