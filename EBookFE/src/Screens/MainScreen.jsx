import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteScreen from "./FavoriteScreen";
import UserScreen from "./UserScreen";
import HomeScreen from "./HomeScreen";
import { Image, View, Text } from "react-native";
import BookInfomationScreen from "./BookInformationScreen";
import BookAddScreen from "./BookAddScreen";

const BottomTabs = createBottomTabNavigator();
const MainScreen = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#51d67b",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          display: "flex",
        },
      })}
    >
      {/* <BottomTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../images/navigationIcon/home-svgrepo-com.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#51d67b" : "gray",
              }}
            />
          ),
        }}
      /> */}
      <BottomTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../images/navigationIcon/home-svgrepo-com.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#51d67b" : "gray",
              }}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="BookInfomation"
        component={BookInfomationScreen}
        options={{
          tabBarLabel: "Chi tiết",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../images/navigationIcon/home-svgrepo-com.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#51d67b" : "gray",
              }}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Tủ Sách"
        component={FavoriteScreen}
        options={{
          tabBarLabel: "Yêu thích",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../images/navigationIcon/favorite-svgrepo-com.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#51d67b" : "gray",
              }}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="BookAddScreen"
        component={BookAddScreen}
        options={{
          tabBarLabel: "Thêm sách",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../images/navigationIcon/user-svgrepo-com.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#51d67b" : "gray",
              }}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Tôi"
        component={UserScreen}
        options={{
          tabBarLabel: "Tôi",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../images/navigationIcon/user-svgrepo-com.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#51d67b" : "gray",
              }}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default MainScreen;
