import LoginScreen from "./src/Screens/LoginScreen";
import SplashScreen from "./src/Screens/SplashScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import MainScreen from "./src/Screens/MainScreen";
// import CategoryScreen from "./src/Screens/CategoryScreen";
// import BookScreen from "./src/Screens/BookScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookInfomationScreen from "./src/Screens/BookInformationScreen";
import AddCategoryScreen from "./src/Screens/AddCategoryScreen";
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
        <Stack.Screen name={"MainScreen"} component={MainScreen} />
        {/* <Stack.Screen name={"CategoryScreen"} component={CategoryScreen} /> */}
        <Stack.Screen
          name={"BookInfomationScreen"}
          component={BookInfomationScreen}
        />
        <Stack.Screen
          name={"AddCategoryScreen"}
          component={AddCategoryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
