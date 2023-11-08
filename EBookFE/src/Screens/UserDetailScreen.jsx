import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

const UserDetailScreen = () => {
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    async () => {
      try {
        const info = await GetCurrentUserInfo();
        setUserInfo(info.data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontSize: 24, fontWeight: "500" }}>
          Thông tin cá nhân
        </Text>
      </View>
      <View style={{ ...styles.btnWrapper, width: width - 50 }}>
        <View style={{ flexDirection: "column", width: "100%" }}>
          <Text style={styles.orText}>Tên người dùng</Text>
          <TextInput
            editable={true}
            style={styles.viewInput}
            placeholderTextColor={"#686868"}
            placeholder="Tên người dùng"
            value={userInfo.username}
            onChangeText={(value) => setName(value)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "#232020",
  },
  btnWrapper: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 20,
  },
  orText: {
    color: "#111",
    fontWeight: "600",
  },
  viewInput: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#686868",
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    color: "#686868",
  },
  uploadAudio: {
    marginTop: 25,
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
});
export default UserDetailScreen;
