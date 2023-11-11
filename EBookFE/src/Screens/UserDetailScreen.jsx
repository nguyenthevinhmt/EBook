import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GetCurrentUserInfo } from "../Services/UserService";

const UserDetailScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const getData = async () => {
      const result = await GetCurrentUserInfo();
      // console.log(result.data);
      setPhone(result?.data.phone);
      setFullName(result?.data.fullName);
      setEmail(result?.data.email);
    };

    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.listDetail}>
          <Text style={styles.title}>Tên đầy đủ</Text>
          <TextInput
            style={styles.input}
            placeholder="Cập nhật tên "
            onChangeText={(value) => {
              setLastName(value);
            }}
          >
            <Text>{fullName}</Text>
          </TextInput>
        </View>

        <View style={styles.listDetail}>
          <Text style={styles.title}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            placeholder="Cập nhật số điện thoại"
            onChangeText={(value) => {
              setPhone(value);
            }}
          >
            <Text>{phone}</Text>
          </TextInput>
        </View>

        {/* <View style={styles.listDetail}>
          <Text style={styles.title}>Điện thoại</Text>
          <TextInput
            style={styles.input}
            placeholder="chưa có số điện thoại"
            onChangeText={(value) => {
              setPhoneNumber(value);
            }}
          >
            <Text>{phoneNumber}</Text>
          </TextInput>
        </View> */}

        <View style={styles.listDetail}>
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="chưa có email"
            editable={false}
          >
            <Text>{email}</Text>
          </TextInput>
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
          // onPress={() => {
          //   handleUpdate();
          // }}
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
