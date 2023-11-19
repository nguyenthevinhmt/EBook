import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChangePassword } from "../Services/UserService";

const ChangePasswordScreen = ({ navigation }) => {
  const [formPassword, setFormPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChangePassword = async () => {
    try {
      const res = await ChangePassword(
        formPassword.oldPassword,
        formPassword.newPassword
      );
      console.log(res);
      if (res.status === 200) navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Thay đổi mật khẩu không thành công");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 16, fontWeight: "700", marginTop: 20 }}>
        Thay đổi mật khẩu
      </Text>
      <View style={{ flex: 9, backgroundColor: "#fafafa", marginTop: 20 }}>
        <View style={styles.listDetail}>
          <Text style={styles.title}>Nhập vào mật khẩu hiện tại</Text>
          <TextInput
            style={styles.input}
            placeholder="mật khẩu hiện tại"
            secureTextEntry={true}
            onChangeText={(value) => {
              setFormPassword((prev) => ({ ...prev, oldPassword: value }));
            }}
            value={formPassword.oldPassword}
          />
        </View>

        <View style={styles.listDetail}>
          <Text style={styles.title}>Nhập vào mật khẩu mới</Text>
          <TextInput
            style={styles.input}
            placeholder="mật khẩu mới"
            secureTextEntry={true}
            onChangeText={(value) => {
              setFormPassword((prev) => ({ ...prev, newPassword: value }));
            }}
            value={formPassword.newPassword}
          />
        </View>
      </View>

      <View style={styles.buttonArea}>
        <TouchableOpacity
          style={styles.returnButt}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "#72D9FC" }}>Trở lại</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.confirmButt}
          onPress={() => {
            handleChangePassword();
          }}
        >
          <Text style={{ color: "#fff" }}>Cập nhật</Text>
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
    backgroundColor: "#fafafa",
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
    height: "100%",
    textAlign: "right",
  },

  buttonArea: {
    flex: 1,
    width: "45%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  returnButt: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 9,
  },

  confirmButt: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#72D9FC",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 9,
  },
});

export default ChangePasswordScreen;
