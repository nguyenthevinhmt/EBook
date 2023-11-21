// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react'
// import PdfRead from './srcc';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <PdfRead></PdfRead>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import LoginScreen from "./src/Screens/LoginScreen";
import SplashScreen from "./src/Screens/SplashScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import MainScreen from "./src/Screens/MainScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookInfomationScreen from "./src/Screens/BookInformationScreen";
import AddCategoryScreen from "./src/Screens/AddCategoryScreen";
import SearchScreen from "./src/Screens/SearchScreen";
import RatingScreen from "./src/Screens/RatingScreen";
import UserDetailScreen from "./src/Screens/UserDetailScreen";
import UserScreen from "./src/Screens/UserScreen";
import BookManagerScreen from "./src/Screens/Admin/BookManagerScreen";
import BookAddScreen from "./src/Screens/BookAddScreen";
import BookUpdateScreen from "./src/Screens/Admin/BookUpdateScreen";
import UnDevelopedScreen from "./src/Screens/UnDevelopedScreen";
import BookPDFScreen from "./src/Screens/BookPDFScreen";
import ChangePasswordScreen from "./src/Screens/ChangePasswordScreen";
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
        <Stack.Screen name={"SearchScreen"} component={SearchScreen} />
        <Stack.Screen name={"RatingScreen"} component={RatingScreen} />
        <Stack.Screen name={"UserScreen"} component={UserScreen} />
        <Stack.Screen
          name={"UnDevelopedScreen"}
          component={UnDevelopedScreen}
        />
        {/* Quản lý sách */}
        <Stack.Screen
          name={"BookManagerScreen"}
          component={BookManagerScreen}
        />
        {/* Thêm sách */}
        <Stack.Screen name={"BookAddScreen"} component={BookAddScreen} />
        {/* Cập nhật sách */}
        <Stack.Screen name={"BookUpdateScreen"} component={BookUpdateScreen} />
        <Stack.Screen
          name={"ChangePasswordScreen"}
          component={ChangePasswordScreen}
        />

        <Stack.Screen
          name={"BookInfomationScreen"}
          component={BookInfomationScreen}
        />
        <Stack.Screen name={"BookPDFScreen"} component={BookPDFScreen} />
        <Stack.Screen
          name={"AddCategoryScreen"}
          component={AddCategoryScreen}
        />
        <Stack.Screen name={"UserDetailScreen"} component={UserDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
