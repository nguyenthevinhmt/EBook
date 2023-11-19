import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
import { logout } from "../Services/AuthService";

if (!global.atob) {
  global.atob = decode;
}
const SplashScreen = () => {
  const navigation = useNavigation();
  const logoImage = require("../images/book_logo.png");
  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      console.log("accessToken: ", accessToken);

      if (accessToken !== null) {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          await logout();
          navigation.replace("LoginScreen");
        } else if (decodedToken.exp > currentTime) {
          console.log(decodedToken);
          navigation.replace("MainScreen");
        }
      } else {
        await logout();
        navigation.replace("LoginScreen");
      }
    };

    const timer = setTimeout(() => {
      checkTokenValidity();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logoImage} />
      <Text style={styles.textLogo}>EBook</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  logo: {
    width: 250,
    height: 250,
  },

  textLogo: {
    color: "#72D9FC",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  },
});
export default SplashScreen;
