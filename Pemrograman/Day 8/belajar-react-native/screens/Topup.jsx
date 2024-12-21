import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

export default function TopupScreen() {
  const handleTopup = () => {
    console.log('Topup berhasil!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Topup Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
      />
      <Button title="Submit Topup" onPress={handleTopup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FAFBFD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
});