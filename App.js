import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./screens/splashScreen"; // Import SplashScreen
import LoginScreen from "./screens/loginScreen";
import WaitingRoom from "./screens/waitingRoomScreen";
import GameplayScreen from "./screens/gameplay_screen";
import GameplayScreenBot from "./screens/gameplay_bot_screen";
import PostGameScreen from "./screens/post_gameplay_bot_screen";
import RegisterScreen from "./screens/register_screen"

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Splash screen is the first screen */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }} // Hide header for SplashScreen
        />
        {/* Login screen */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Hide header for LoginScreen
        />
         <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }} // Hide header for LoginScreen
        />
        {/* waiting room screen */}
        <Stack.Screen
          name="WaitingRoom"
          component={WaitingRoom}
          options={{ headerShown: false }} // Hide header for LoginScreen
        />
        {/* game play bot */}
        <Stack.Screen
          name="GamePlayBot"
          component={GameplayScreenBot}
          options={{ headerShown: false }} // Hide header for LoginScreen
        />
        {/* game play */}
        <Stack.Screen
          name="GamePlay"
          component={GameplayScreen}
          options={{ headerShown: false }} // Hide header for LoginScreen
        />
        <Stack.Screen
          name="PostGame"
          component={PostGameScreen}
          options={{ headerShown: false }} // Hide header for LoginScreen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
