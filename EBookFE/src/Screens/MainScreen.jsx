import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteScreen from "./FavoriteScreen";
import UserScreen from "./UserScreen";
import HomeScreen from "./HomeScreen";

const BottomTabs = createBottomTabNavigator();
const MainScreen = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <BottomTabs.Screen name="HomeScreen" component={HomeScreen} />
      <BottomTabs.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <BottomTabs.Screen name="UserScreen" component={UserScreen} />
    </BottomTabs.Navigator>
  );
};

export default MainScreen;
