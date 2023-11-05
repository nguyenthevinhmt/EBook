import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const UserScreen = ({ navigation }) => {

  const FormSetting = ({ icon, title }) => (
    <TouchableOpacity style={styles.form}>
      <View style={{ flexDirection: 'row' }}>
        <Icon name={icon} size={20} style={{ marginLeft: 10 }} />
        <Text style={{ marginLeft: 10, fontWeight: '700', fontSize: 15 }}>{title}</Text>
      </View>
      <View>
        <Icon name="chevron-right" size={20} />
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ScrollView style={{ width: '100%' }}>
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
          <Text style={{ fontSize: 28, fontWeight: "800" }}>Cá nhân</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity>
              <Icon name='bell-badge-outline' color={"black"} size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              height: 80,
              width: "95%",
              flexDirection: "row",
              marginVertical: 20,
              marginLeft: "2.5%",
            }}
          >
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR72uUTeQ3ZPlIb9EIOUipXVmzgePJqthXmdC6mKl9zDHhzfS0JjcdDNoBR4Yy62wjrmBY&usqp=CAU' }}
              style={{ height: 70, width: 70, borderRadius: 70 }}
              resizeMode="cover"
            ></Image>
            <View style={{ height: "100%", justifyContent: "center", marginLeft: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>Nguyễn Văn A </Text>
              <Text>Đọc giả</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: '90%' }}>
            <TouchableOpacity
              style={{
                height: 50,
                backgroundColor: '#c0c0c0',
                width: "100%",
                marginVertical: 5,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 10
              }}
            >
              <Icon name="electron-framework" size={20} style={{ marginLeft: 10 }} />
              <Text style={{ marginLeft: 10, fontWeight: '700', fontSize: 15 }}>Trải nghiệm đăng ký thành viên VIP</Text>
            </TouchableOpacity>

          </View>
          <View style={{ width: "90%" }}>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>Thông tin tài khoản</Text>
          </View>
          <View style={{ width: "90%", backgroundColor: '#c0c0c0', borderRadius: 10, marginTop: 10 }}>
            <View style={{ width: "95%", left: "2.5%", }}>
              <FormSetting icon={'badge-account'} title={'Thông tin cá nhân'}></FormSetting>
              <FormSetting icon={'shield-account'} title={'Mật khẩu và bảo mật'}></FormSetting>
              <FormSetting icon={'credit-card-lock-outline'} title={'Thông tin và quyền của bạn'}></FormSetting>
              <FormSetting icon={'bullhorn'} title={'Đánh giá ứng dụng'}></FormSetting>
            </View>
          </View>

          <View style={{ width: "90%", marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>Cài đặt tài khoản</Text>
          </View>
          <View style={{ width: "90%", backgroundColor: '#c0c0c0', borderRadius: 10, marginTop: 10 }}>
            <View style={{ width: "95%", left: "2.5%", }}>
              <FormSetting icon={'location-exit'} title={'Đăng xuất'}></FormSetting>
              <TouchableOpacity
                style={styles.form}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Icon name={'delete-empty'} size={20} style={{ marginLeft: 10 }} />
                  <Text style={{ marginLeft: 10, fontWeight: '700', fontSize: 15 }}>Xóa tài khoản</Text>
                </View>
                <View>
                  <Icon name="chevron-right" size={20} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    height: 45,
    backgroundColor: '#c0c0c0',
    width: "100%",
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderBottomWidth: 0.1,
    justifyContent: 'space-between'
  },
});
export default UserScreen;
;
