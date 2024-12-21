import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Input, Button } from 'react-native-elements';
import {useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {authentication} from '../firebase/firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';
import {db} from '../firebase/firebaseconfig';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');

  const registerUser = async () => {
    createUserWithEmailAndPassword(authentication, email, password)
    .then((userCredentials) => {
      const userUID = userCredentials.user.uid;
      const docRef = doc(db, "users", userUID);
      const docSnap = setDoc (docRef, {
        avatarUrl: avatar ? avatar : '../assets/blank-profile.png',
        username,
        password,
        userUID,
      })

    })
    .then(() => console.log('succcess'))
  }
  return (
    <View style={styles.container}>
      <Input placeholder="Username" label="Username" value={username} onChangeText={text => setUsername(text)} leftIcon={{ type: 'material', name: 'account-circle' }}/>
      <Input placeholder="Enter your email" label="Email" value={email} onChangeText={text => setEmail(text)} leftIcon={{ type: 'material', name: 'email' }}/>
      <Input placeholder="Enter your password" label="Password" value={password} onChangeText={text => setPassword(text)} leftIcon={{ type: 'material', name: 'lock' }} secureTextEntry/>
      <Input placeholder="Avatar url" label="Avatar" value={avatar} onChangeText={text => setAvatar(text)} leftIcon={{ type: 'material', name: 'link' }}/>
      {/* <Button title='Login'></Button> */}
      <Button onPress={registerUser} style={styles.btn} title='Register'></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    marginTop: 10
  }
});
