import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GetCurrentUserInfo } from "../Services/UserService";
import { UpdateUserInfo } from "../Services/UserService";

const UserDetailScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const getData = async () => {
      const result = await GetCurrentUserInfo();
      setUserInfo(result?.data);
    };

    getData();
  }, []);

  const handleUpdateInfo = async () => {
    try {
      await UpdateUserInfo(userInfo?.fullName, userInfo?.phone);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Lỗi khi cập nhật thông tin");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.listDetail}>
          <Text style={styles.title}>Tên đầy đủ</Text>
          <TextInput
            style={styles.input}
            placeholder="Cập nhật tên "
            onChangeText={(value) => {
              setUserInfo((prevInfo) => ({ ...prevInfo, fullName: value }));
            }}
            value={userInfo?.fullName}
          />
        </View>

        <View style={styles.listDetail}>
          <Text style={styles.title}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            placeholder="Cập nhật số điện thoại"
            onChangeText={(value) => {
              setUserInfo((prevInfo) => ({ ...prevInfo, phone: value }));
            }}
            value={userInfo?.phone}
          />
        </View>

        <View style={styles.listDetail}>
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.input}
            value={userInfo?.email}
            editable={false}
          />
        </View>
      </View>

      <View style={styles.buttonArea}>
        <TouchableOpacity
          style={styles.returnButt}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "#51d67b" }}>Trở lại</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.confirmButt}
          onPress={() => {
            handleUpdateInfo();
          }}
        >
          <Text style={{ color: "#fff" }}>Lưu thay đổi</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F1EFEF",
    width: "100%",
  },

  listDetail: {
    backgroundColor: "#fff",
    width: "100%",
    height: 80,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    width: "30%",
  },

  input: {
    width: "80%",
    textAlign: "right",
  },

  buttonArea: {
    width: "100%",
  },

  returnButt: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  confirmButt: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#51d67b",
  },
});

export default UserDetailScreen;
