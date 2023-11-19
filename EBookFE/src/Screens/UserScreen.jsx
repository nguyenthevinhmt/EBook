import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { logout } from "../Services/AuthService";

const UserScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const getUserName = async () => {
    const res = await GetCurrentUserInfo();
    console.log(res?.data);
    setUsername(res?.data?.fullName);
  };
  useEffect(() => {
    async () => {
      await getUserName();
    };
  }, []);
  const FormSetting = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.form} onPress={onPress}>
      <View style={{ flexDirection: "row" }}>
        <Icon name={icon} size={20} style={{ marginLeft: 10 }} />
        <Text
          style={{
            marginLeft: 10,
            fontWeight: "400",
            fontSize: 13,
            justifyContent: "center",
          }}
        >
          {title}
        </Text>
      </View>
      <View>
        <Icon name="chevron-right" size={20} />
      </View>
    </TouchableOpacity>
  );

  const logOut = async () => {
    const result = await logout();
    navigation.replace("LoginScreen");
    console.log("ok");
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ width: "100%" }}>
        <View
          style={{
            height: 90,
            width: "95%",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginLeft: "2.5%",
          }}
        >
          <Text style={{ fontSize: 28, fontWeight: "800", color: "#72D9FC" }}>
            Cá nhân
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity>
              <Icon name="bell-badge-outline" color={"#72D9FC"} size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: 80,
              width: "95%",
              flexDirection: "row",
              marginVertical: 20,
              marginLeft: "2.5%",
            }}
            onPress={() => {
              navigation.navigate("UserDetailScreen");
            }}
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR72uUTeQ3ZPlIb9EIOUipXVmzgePJqthXmdC6mKl9zDHhzfS0JjcdDNoBR4Yy62wjrmBY&usqp=CAU",
              }}
              style={{ height: 70, width: 70, borderRadius: 70 }}
              resizeMode="cover"
            ></Image>
            <View
              style={{
                height: "100%",
                justifyContent: "center",
                marginLeft: 15,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "700", color: "#72D9FC" }}
              >
                {username === "" ? "Vui lòng cập nhật thông tin" : username}
                {/* Nguyễn Văn A */}
              </Text>
              <Text style={{ color: "#ccc" }}>Đọc giả</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
            }}
          >
            <TouchableOpacity
              style={{
                height: 50,
                backgroundColor: "#fafafa",
                width: "100%",
                marginVertical: 5,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.navigate("UnDevelopedScreen");
              }}
            >
              <Icon
                name="electron-framework"
                size={20}
                style={{ marginLeft: 10 }}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: "400",
                  fontSize: 14,
                  color: "#111",
                }}
              >
                Trải nghiệm đăng ký thành viên VIP
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "90%", marginVertical: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              Thông tin tài khoản
            </Text>
          </View>
          <View
            style={{
              width: "90%",
              backgroundColor: "#fafafa",
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <View style={{ width: "95%", left: "2.5%" }}>
              <FormSetting
                icon={"badge-account"}
                title={"Thông tin cá nhân"}
                onPress={() => {
                  navigation.navigate("UserDetailScreen");
                }}
              ></FormSetting>
              <FormSetting
                icon={"shield-account"}
                title={"Đổi mật khẩu"}
                onPress={() => {
                  navigation.navigate("ChangePasswordScreen");
                }}
              ></FormSetting>
              <FormSetting
                icon={"credit-card-lock-outline"}
                title={"Thông tin và quyền của bạn"}
                onPress={() => {
                  navigation.navigate("UnDevelopedScreen");
                }}
              ></FormSetting>
              <FormSetting
                icon={"bullhorn"}
                title={"Đánh giá ứng dụng"}
                onPress={() => {
                  navigation.navigate("UnDevelopedScreen");
                }}
              ></FormSetting>
            </View>
          </View>

          <View style={{ width: "90%", marginVertical: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              Cài đặt tài khoản
            </Text>
          </View>
          <View
            style={{
              width: "90%",
              backgroundColor: "#fafafa",
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <View style={{ width: "95%", left: "2.5%" }}>
              <FormSetting
                icon={"location-exit"}
                title={"Đăng xuất"}
                onPress={() => {
                  logOut();
                }}
              ></FormSetting>
              <TouchableOpacity
                style={styles.form}
                onPress={() => {
                  navigation.navigate("UnDevelopedScreen");
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    name={"delete-empty"}
                    size={20}
                    style={{ marginLeft: 10 }}
                  />
                  <Text
                    style={{ marginLeft: 10, fontWeight: "500", fontSize: 13 }}
                  >
                    Xóa tài khoản
                  </Text>
                </View>
                <View>
                  <Icon name="chevron-right" size={20} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    height: 45,
    backgroundColor: "#fafafa",
    width: "100%",
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderBottomWidth: 0.1,
    justifyContent: "space-between",
  },
});
export default UserScreen;
