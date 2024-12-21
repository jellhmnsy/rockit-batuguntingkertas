import { StyleSheet, Text, View,Button,TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Input } from 'react-native-elements';
import {useState} from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../firebase/firebaseconfig';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const loginUser = async () => {
    signInWithEmailAndPassword(authentication, email, Password)    
    .then(() => console.log('user logged in'))
  }
  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        navigation.navigate('Home')
      } else{
        console.log('no user')
      }
    })
  },[])
  return (
    <View style={styles.container}>
      <Input placeholder="Enter your email" label="Email" value={email} onChangeText={text => setEmail(text)} leftIcon={{ type: 'material', name: 'email' }}/>
      <Input placeholder="Enter your password" label="Password" value={Password} onChangeText={text => setPassword(text)} leftIcon={{ type: 'material', name: 'lock' }} secureTextEntry/>
      <View>
        <View>
          <Button
          //  onPress={loginUser}
          onPress={() => navigation.navigate('Home')}
            title='Login'></Button>
        </View>
        <View style={{marginTop: 10}}>
          <Button onPress={() => navigation.navigate('Register')} title='Register'></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    marginTop: 10,
    padding: 10,
    color: 'white',
  }
});
