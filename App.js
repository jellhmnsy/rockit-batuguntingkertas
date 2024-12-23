import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//Font
import { useFonts } from 'expo-font';
import { Kavoon_400Regular } from '@expo-google-fonts/kavoon';
import { KiwiMaru_300Light } from '@expo-google-fonts/kiwi-maru';
import { KiwiMaru_400Regular } from '@expo-google-fonts/kiwi-maru';
import { KiwiMaru_500Medium } from '@expo-google-fonts/kiwi-maru';

export default function App() {
  //Font
  const [fontsLoaded] = useFonts({
    Kavoon_400Regular,
    KiwiMaru_300Light,
    KiwiMaru_400Regular,
    KiwiMaru_500Medium
  })

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text style={styles.kavoon}>Tes commit masuk ga</Text>
      <Text>Tes commit lagi masuk ga</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kavoon: {
    fontFamily: 'Kavoon_400Regular'
  }
});
