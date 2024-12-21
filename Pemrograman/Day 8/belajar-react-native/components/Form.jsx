import { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, TextInput,SafeAreaView } from 'react-native';
export default function FormComponent({state, onSubmit}) {
  console.log('state nya adalah: ', state);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = () => {
    if (state === 'register') {
      onSubmit(name, email, password, phoneNumber, notes);
    } else {
      onSubmit(email, password);
    }
  };

  return (
    <SafeAreaView>
      {state === 'register' &&
       <TextInput
       style={styles.input}
       placeholder='Fullname'
       value={name}
       onChangeText={(text) => setName(text)}
       />
      }
     
      <TextInput
      style={styles.input}
      placeholder='Email'
      value={email}
      onChangeText={(text) => setEmail(text)}
      autoCorrect={false}
      autoCapitalize='none'
      ></TextInput>
        <TextInput
      style={styles.input}
      placeholder='Password'
      value={password}
      onChangeText={setPassword}
      autoCorrect={false}
      autoCapitalize='none'
      secureTextEntry
      ></TextInput>

      {state === 'register' &&
       <TextInput
      style={styles.input}
      placeholder='Avatar URL'
      value={phoneNumber}
      onChangeText={setPhoneNumber}
      autoCorrect={false}
      inputMode='numeric'
      autoCapitalize='none'
      keyboardType="phone-pad"
      ></TextInput>      
      }
      {/* <TextInput
      style={[styles.input]}
        placeholder='Notes'
        value={notes}
        multiline={true}
        numberOfLines={4}
        onChangeText={setNotes}
      ></TextInput> */}

      {state === 'login' ?
        <Button title='Login' onPress={() => onSubmit(email, password)}></Button>
        :
        // <Button title='Register' onPress={() => console.log('register')}></Button>
        <Button
        title={state === 'register' ? 'Register' : 'Login'}
        onPress={handleSubmit}
      />
      }
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10
  },
  notesInput: {
    height: 200
  }
});