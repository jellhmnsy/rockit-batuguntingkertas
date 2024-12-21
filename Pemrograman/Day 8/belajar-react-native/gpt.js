import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const transactionHistory = [
    { id: '1', name: 'Adityo Gizwanda', type: 'Transfer', amount: '-75.000,00', date: '08 December 2024' },
    { id: '2', name: 'Adityo Gizwanda', type: 'Topup', amount: '+75.000,00', date: '08 December 2024' },
    { id: '3', name: 'Adityo Gizwanda', type: 'Transfer', amount: '-75.000,00', date: '08 December 2024' },
    { id: '4', name: 'Adityo Gizwanda', type: 'Transfer', amount: '-75.000,00', date: '08 December 2024' },
  ];

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.profileCircle} />
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionName}>{item.name}</Text>
        <Text style={styles.transactionType}>{item.type}</Text>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          { color: item.type === 'Topup' ? '#2ecc71' : '#e74c3c' },
        ]}
      >
        {item.amount}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.profileImage}
        />
        <Text style={styles.headerText}>Chelsea Immanuela</Text>
        <Text style={styles.accountType}>Personal Account</Text>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.greeting}>Good Morning, Chelsea</Text>
        <Text style={styles.balancePrompt}>
          Check all your incoming and outgoing transactions here
        </Text>
        <View style={styles.accountSection}>
          <Text style={styles.accountNumber}>Account No. 100899</Text>
          <View style={styles.balanceSection}>
            <Text style={styles.balance}>Rp 10.000.000</Text>
            <TouchableOpacity>
              <Text style={styles.eyeIcon}>👁️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.transactionActions}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={transactionHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderTransactionItem}
        contentContainerStyle={styles.transactionList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  accountType: {
    marginLeft: 10,
    color: '#7f8c8d',
  },
  balanceContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  balancePrompt: {
    fontSize: 14,
    color: '#7f8c8d',
    marginVertical: 8,
  },
  accountSection: {
    marginTop: 16,
  },
  accountNumber: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  balanceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  eyeIcon: {
    fontSize: 18,
    color: '#7f8c8d',
  },
  transactionActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: '#3498db',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#ffffff',
  },
  sendButtonText: {
    fontSize: 24,
    color: '#ffffff',
  },
  transactionList: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#bdc3c7',
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionType: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
