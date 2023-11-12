import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteScreen from "./FavoriteScreen";
import UserScreen from "./UserScreen";
import HomeScreen from "./HomeScreen";
import { Image, View, Text } from "react-native";
import BookAddScreen from "./BookAddScreen";
import BookManagerScreen from "./Admin/BookManagerScreen";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomTabs = createBottomTabNavigator();
const MainScreen = () => {
  const [userType, setUserType] = useState();
  const deCodeJwt = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken !== null) {
      const decodedToken = jwtDecode(accessToken);
      setUserType(decodedToken.user_type)
      console.log("decodedToken", decodedToken)
    }
  };
  useEffect(() => {
    deCodeJwt()
  }, []);
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
      <BottomTabs.Screen
        name="HomeScreen"
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
      {userType == 1 &&
        <BottomTabs.Screen
          name="BookManagerScreen"
          component={BookManagerScreen}
          options={{
            tabBarLabel: "Quản lý sách",
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../images/navigationIcon/book-management.png")}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#51d67b" : "gray",
                }}
              />
            ),
          }}
        />
      }
      {userType == 1 &&
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
      }
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
