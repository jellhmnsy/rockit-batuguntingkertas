// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Button, Alert, Modal, ScrollView, TouchableOpacity } from 'react-native';
// import FormComponent from '../components/Form';
// import { useAuth } from '../context/AuthContext';


// export default function Register({ navigation }) {
//     const [modalVisible, setModalVisible] = useState(false);
//   const handleRegister = (name, email, password, phoneNumber, notes) => {
//     if (!name || !email || !password || !phoneNumber) {
//       Alert.alert('Error', 'All fields are required.');
//       return;
//     }

//     // Simulasi pendaftaran berhasil
//     Alert.alert('Success', 'Registration completed successfully!');
//     navigation.navigate('Login'); // Kembali ke login setelah berhasil
//   };

// //   return (
// //     <View style={styles.container}>
// //       <Text>Ini Register</Text>
// //       <FormComponent state="register" onSubmit={(name, email, password, phoneNumber, notes) => handleRegister(name, email, password, phoneNumber, notes)}></FormComponent>
// //       <Button title="Back to login" onPress={() => navigation.navigate('Login')}></Button>
// //     </View>
// //   );
// return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Register</Text>
//       <FormComponent
//         state="register"
//         onSubmit={(name, email, password, phoneNumber, notes) =>
//           handleRegister(name, email, password, phoneNumber, notes)
//         }
//       />

//       {/* Tombol Terms & Condition */}
//       <TouchableOpacity
//         onPress={() => setModalVisible(true)}
//         style={styles.termsButton}
//       >
//         <Text style={styles.termsText}>Terms & Conditions</Text>
//       </TouchableOpacity>

//       <Button
//         title="Back to Login"
//         onPress={() => navigation.navigate('Login')}
//       />

//       {/* Modal Terms & Condition */}
//       <Modal
//         animationType="slide"
//         transparent={false}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Terms & Conditions</Text>
//           <ScrollView style={styles.scrollView}>
//             <Text style={styles.modalContent}>
//               Welcome to our application. These terms and conditions outline the
//               rules and regulations for the use of our service. {'\n\n'}
//               1. By using this service, you agree to comply with these terms.
//               {'\n\n'}
//               2. You may not use the service for any unlawful or unauthorized
//               purpose. {'\n\n'}
//               3. Personal information is handled in accordance with our Privacy
//               Policy. {'\n\n'}
//               4. We reserve the right to modify or discontinue the service at
//               any time. {'\n\n'}
//               For detailed terms, please contact our support team.
//             </Text>
//           </ScrollView>
//           <Button title="Close" onPress={() => setModalVisible(false)} />
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: 20,
//     },
//     title: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginBottom: 20,
//     },
//     termsButton: {
//       marginTop: 10,
//     },
//     termsText: {
//       color: 'blue',
//       textDecorationLine: 'underline',
//     },
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: 20,
//     },
//     modalTitle: {
//       fontSize: 22,
//       fontWeight: 'bold',
//       marginBottom: 20,
//     },
//     scrollView: {
//       marginVertical: 20,
//     },
//     modalContent: {
//       fontSize: 16,
//       textAlign: 'justify',
//     },
//   });

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../services/auth';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegister = async () => {
    try {
      if (!fullName || !email || !password || !phoneNumber) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }

      const result = await registerUser(fullName, email, password, phoneNumber);
      Alert.alert('Success', 'Registration successful');
      console.log('Register Response:', result);

      // Navigate to Login or Home after success
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default RegisterScreen;
