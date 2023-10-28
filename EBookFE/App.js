import LoginScreen from "./src/Screens/LoginScreen";
import SplashScreen from "./src/Screens/SplashScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="SplashScreen"
      >
        <Stack.Screen name={"SplashScreen"} component={SplashScreen} />
        <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
        <Stack.Screen name={"RegisterScreen"} component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
