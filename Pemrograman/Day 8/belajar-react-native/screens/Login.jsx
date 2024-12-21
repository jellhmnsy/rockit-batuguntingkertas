// import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
// import FormComponent from '../components/Form';
// import { useAuth } from '../context/AuthContext';
// import { useState } from 'react';

// export default function LoginScreen({ navigation}) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth();

//     // const handleLogin = (email, password) => {
//     //   if (email === 'test@example.com' && password === '123') {
//     //     navigation.navigate('MainTabs');
//     //   } else {
//     //     Alert.alert('Login Failed', 'Email or Password is incorrect.')
//     //   }
//     // }
//     const handleLogin = async () => {
//       if (email === 'test@example.com' && password === '1') {
//         const token = 'dummy-token'; // Anda bisa fetch API token sebenarnya di sini
//         await login(token);
//         console.log('Login berhasil!');
//       } else {
//         alert('email atau Password salah!');
//       }
//     };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Ini Login</Text>
//       <FormComponent state='login' onSubmit={(email, password) => handleLogin(email, password)}/>
//         <View>
//             <Text>Dont have account?</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//                 <Text>Login Here</Text></TouchableOpacity>
//         </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },

// });

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { loginUser } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Please fill in both email and password!');
    }
    try {
      const response = await loginUser(email, password);

      console.log('Login Response ASU:', response);

      // Simpan token autentikasi
      await AsyncStorage.setItem('userToken', response.token);
      const token = await AsyncStorage.getItem('userToken');
      console.log('Login successful, token:', token); // Debugging token
      login(token);

      Alert.alert('Login Successful!', 'Welcome back!');
      navigation.replace('MainTabs'); // Pindah ke halaman utama
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message); // Debugging
      Alert.alert('Login Failed', error.response?.data?.message || error.message || 'Something went wrong!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <View>
        <Text>Dont have account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text>Register Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});