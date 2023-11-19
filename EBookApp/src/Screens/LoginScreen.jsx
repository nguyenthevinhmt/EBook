import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ValidationEmail, ValidationPassword } from "../Utils/validation";
import { login } from "../Services/AuthService";
import { useNavigation } from "@react-navigation/native";
import Alert from "../Components/CustomAlert";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleLogin = async () => {
    const checkEmail = ValidationEmail(email);
    const checkPassword = ValidationPassword(password);

    if (checkEmail !== null) {
      setEmailError(checkEmail);
      setIsValidEmail(true);
    }
    if (checkPassword !== null) {
      setPasswordError(checkPassword);
      setIsValidPassword(true);
    } else {
      setEmailError("");
      setIsValidEmail(false);
      setPasswordError("");
      setIsValidPassword(false);
    }
    try {
      const result = await login(email, password);
      console.log(result.data);
      if (result) {
        console.log("accessToken", result.data);
        navigation.replace("MainScreen");
      }
    } catch (error) {
      alert("Tài khoản hoặc mật khẩu không đúng");
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

          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            activeOpacity={0.7}
            onPress={() => {
              handleLogin();
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
              Đăng nhập
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("RegisterScreen");
              setEmailError("");
              setIsValidEmail(false);
              setPasswordError("");
              setIsValidPassword(false);
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
              Đăng kí
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Alert
        visible={showAlert}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
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
    marginTop: 90,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    flex: 1,
  },

  logoImage: {
    width: 250,
    height: 150,
    marginBottom: 50,
  },

  formLogin: {
    flex: 3,
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

export default LoginScreen;
