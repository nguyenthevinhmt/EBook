import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ValidationEmail,
  ValidationPassword,
  ValidationRePassword,
} from "../Utils/validation";
import { register } from "../Services/AuthService";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(2);
  const [rePassword, setRePassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidRePassword, setIsValidRePassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Đọc giả', value: 2 },
    { label: 'Quản trị viên', value: 1 }
  ]);

  const handleRegister = async () => {
    const checkEmail = ValidationEmail(email);
    const checkPassword = ValidationPassword(password);
    const checkRePassword = ValidationPassword(rePassword);
    const checkRePasswordNotMatch = ValidationRePassword(password, rePassword);

    let hasError = false; // Biến này để kiểm tra xem có lỗi không

    if (checkEmail !== null) {
      setEmailError(checkEmail);
      setIsValidEmail(true);
      hasError = true;
    }
    if (checkPassword !== null) {
      setPasswordError(checkPassword);
      setIsValidPassword(true);
      hasError = true;
    }
    if (checkRePassword !== null) {
      setRePasswordError(checkRePassword);
      setIsValidRePassword(true);
      hasError = true;
    }
    if (checkRePasswordNotMatch !== null) {
      setRePasswordError(checkRePasswordNotMatch);
      setIsValidRePassword(true);
      hasError = true;
    }

    const result = await register(email, password, userType);
    if (result != null) {
      hasError = true;
      console.log(result);
    } else {
      hasError = false;
    }

    if (hasError == true) {
      // Nếu không có lỗi, thực hiện đăng kí thành công
      setEmailError("");
      setIsValidEmail(false);
      setPasswordError("");
      setIsValidPassword(false);
      setRePasswordError("");
      setIsValidRePassword(false);
      alert("Đăng kí thành công");
      navigation.navigate("LoginScreen");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.logoApp}>
          <Image
            source={require("../images/logo.png")}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.formLogin}>
          <View style={[styles.inputField, isValidEmail && styles.fieldError]}>
            <Image
              source={require("../images/UsernameIcon.png")}
              width={16}
              height={16}
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={styles.emailField}
              placeholder="Tài khoản email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                if (email !== "") {
                  setEmailError("");
                  setIsValidEmail(false);
                }
              }}
            ></TextInput>
          </View>

          {isValidEmail ? (
            <Text style={styles.textError}>{emailError}</Text>
          ) : null}

          <View
            style={[styles.inputField, isValidPassword && styles.fieldError]}
          >
            <Image
              source={require("../images/PasswordIcon.png")}
              width={16}
              height={16}
              style={{ marginRight: 10 }}
            />

            <TextInput
              style={styles.emailField}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                if (password !== "") {
                  setPasswordError("");
                  setIsValidPassword(false);
                }
              }}
            ></TextInput>
          </View>

          {isValidPassword ? (
            <Text style={styles.textError}>{passwordError}</Text>
          ) : null}

          <View
            style={[styles.inputField, isValidPassword && styles.fieldError]}
          >
            <Image
              source={require("../images/Frame.png")}
              width={16}
              height={16}
              style={{ marginRight: 10 }}
            />

            <TextInput
              style={styles.emailField}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              value={rePassword}
              onChangeText={(value) => {
                setRePassword(value);
                if (rePassword !== "") {
                  setRePasswordError("");
                  setIsValidRePassword(false);
                }
              }}
            ></TextInput>
          </View>

          {isValidRePassword ? (
            <Text style={styles.textError}>{rePasswordError}</Text>
          ) : null}

          <DropDownPicker
          style={{marginTop: 10, borderColor: "#ccc"}}
            placeholder="Chọn vai trò"
            open={open}
            value={userType}
            items={items}
            setOpen={setOpen}
            setValue={setUserType}
            setItems={setItems}
          />

          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            activeOpacity={0.7}
            onPress={() => {
              handleRegister();
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                color: "#fff",
                fontWeight: "600",
              }}
            >
              Đăng kí
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                color: "#51d67b",
                fontWeight: "600",
              }}
            >
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
  },

  logoApp: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    flex: 1,
  },

  logoImage: {
    width: 250,
    height: 150,
    marginVertical: 90,
  },

  formLogin: {
    flex: 3,
    marginTop: 100,
  },

  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fafafa",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 9,
    marginTop: 15,
  },

  emailField: {
    backgroundColor: "#fafafa",
    padding: 8,
    borderRadius: 9,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },

  password: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fafafa",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 9,
    marginTop: 30,
  },

  textError: {
    color: "red",
    fontSize: 12,
    textAlign: "left",
    marginLeft: 6,
  },

  fieldError: {
    borderColor: "red",
  },

  button: {
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },

  loginButton: {
    backgroundColor: "#51d67b",
  },

  registerButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#51d67b",
  },
});
export default RegisterScreen;
