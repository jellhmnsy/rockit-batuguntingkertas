import PostGameScreen from './screen/post_gameplay_bot_screen';
import GameplayScreenBot from './screen/gameplay_bot_screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Game">
        <Stack.Screen name="Game" component={GameplayScreenBot} options={{headerShown: false}} />
        <Stack.Screen name="PostGame" component={PostGameScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


