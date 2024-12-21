import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

const App = () => {
  const [balanceVisible, setBalanceVisible] = useState(false);

  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  // const []

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: 'https://picsum.photos/800' }} style={styles.profilePicture}></Image>
          <View>
            <Text style={styles.name}>Chelsea Immanuela</Text>
            <Text style={styles.accountType}>Personal Account</Text>
          </View>
        </View>
        {/* <Image source={require('./user.jpg')} style={styles.profilePicture} /> */}
        {/* <Image source={require('./sun.png')} style={styles.sunIcon} /> */}
        <Feather name="sun" size={24} color="#F8AB39" />
      </View>
      <View style={styles.greetingContainer}>
        <View style={styles.greetingInfo}>
          <Text style={styles.greeting}>Good Morning, Chelsea</Text>
          <Text style={styles.description}>Check all your incoming and outgoing transactions here</Text>
        </View>
        <View>
          <Image source={require('./assets/sun.png')} style={styles.sunImage}></Image>
        </View>
      </View>
      <View style={styles.accountInfo}>
        <View style={styles.accountNumberContainer}>
          <Text style={styles.accountLabel}>Account No.</Text>
          <Text style={styles.accountNumber}>100899</Text>
        </View>
        <View style={styles.balanceContainer}>
          <View>
            <Text style={styles.balanceLabel}>Balance</Text>
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              <View style={styles.balanceInfo}>
                {balanceVisible ? <Text style={styles.balanceAmount}>Rp 10.000.000</Text> : <Text style={styles.balancePlaceholder}>******</Text>}
                {/* <Image source={require('./eye.png')} style={styles.eyeIcon} /> */}
                {balanceVisible ? <Ionicons name="eye-outline" size={24} color="white" /> : <Ionicons name="eye-off-outline" size={24} color="white" />}
                
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttonAdd}>
            <Ionicons name="add-outline" size={24} color="white" />            
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSend}>
              {/* <Image source={require('./send.png')} style={styles.sendIcon} /> */}
              <Feather name="send" size={24} color="white" />{' '}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.transactionHistory}>
        <View style={styles.transactionHeaderContainer}>
          <Text style={styles.transactionHeader}>Transaction History</Text>
        </View>
        {/* Add components to display transaction data here */}
        <View style={styles.transactionItemContainer}>
          <View style={styles.transactionItem}>
            <View>
            <Image source={{ uri: 'https://picsum.photos/800' }} style={styles.profilePictureHistory}></Image>
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>Aditya Gizwanda</Text>
              <Text>Transfer</Text>
              <Text style={styles.transactionDate}>08 December 2024</Text>
            </View>
            <Text style={styles.transactionAmountIn}>+75.000,00</Text>
          </View>
          <View style={styles.transactionItem}>
            <View>
            <Image source={{ uri: 'https://picsum.photos/800' }} style={styles.profilePictureHistory}></Image>
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>Aditya Gizwanda</Text>
              <Text>Transfer</Text>
              <Text style={styles.transactionDate}>08 December 2024</Text>
            </View>
            <Text style={styles.transactionAmountOut}>-75.000,00</Text>
          </View>
        </View>
        {/* Add more transaction items as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 42,
    // paddingRight: 20,
    flex: 1,
    width: '100%',
    backgroundColor: '#FAFBFD',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 24,
      height: 24,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 6,
    borderColor: '#19918F',
  },
  profilePictureHistory: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  accountType: {
    fontSize: 14,
    color: '#888',
  },
  sunIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  greetingContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 20,
    justifyContent: 'space-between',
    gap: 20,
    width: '100%',
  },
  greetingInfo: {
    flex: 2,
    width: '100%',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#888',
  },
  accountInfo: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  accountNumberContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#19918F',
    marginBottom: 10,
  },
  accountLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  accountNumber: {
    fontSize: 16,
    color: 'white',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  balanceLabel: {
    fontSize: 14,
    // fontWeight: 'bold',
    marginBottom: 5,
  },
  balanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 5,
  },
  balancePlaceholder: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 5,
    color: 'black',
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  sunImage: {
    width: 64,
    height: 64,
    borderRadius: 25,
  },
  buttonsContainer: {
    // flexDirection: 'row',
  },

  buttonAdd: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#19918F',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginBottom: 16,
  },
  buttonSend: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#19918F',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sendIcon: {
    width: 20,
    height: 20,
  },
  transactionHistory: {
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  transactionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionHeaderContainer: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionItemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionType: {
    fontSize: 12,
  },
  transactionDate: {
    fontSize: 10,
    color: '#888',
  },
  transactionAmountIn: {
    fontSize: 14,
    color: '#2dc071',
  },
  transactionAmountOut: {
    fontSize: 14,
    color: '#dc3545',
  }
});

export default App;
