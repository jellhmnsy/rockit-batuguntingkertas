import PostGameScreen from './screen/post_gameplay_bot_screen';
import GameplayScreenBot from './screen/gameplay_bot_screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

const Stack = createStackNavigator();

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Game">
        <Stack.Screen name="Game" component={GameplayScreenBot} options={{headerShown: false}} />
        <Stack.Screen name="PostGame" component={PostGameScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
