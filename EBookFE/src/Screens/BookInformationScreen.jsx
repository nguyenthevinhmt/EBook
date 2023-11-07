import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useState, useRef, useMemo, useEffect } from "react";
import { favoriteBook } from "../Services/BookService";
import { useRoute } from '@react-navigation/native';
import { getBookById } from "../Services/BookService";
import BaseUrl from "../Utils/BaseUrl";

const Form = ({ title, lable }) => (
  <View
    style={{
      height: 50,
      width: "100%",
      borderBottomWidth: 0.2,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderColor: "gray",
    }}
  >
    <Text style={{ color: "gray" }}>{title}</Text>
    <View style={{ width: "75%" }}>
      <Text>{lable}</Text>
    </View>
  </View>
);

const BookInfomationScreen = ({ navigation }) => {
  const route = useRoute();
  const { bookId } = route.params;
  const [isHeart, setIsHeart] = useState(false);
  const [bookInfo, setBookInfo] = useState(null);

  const getById = async () => {
    const result = await getBookById(bookId);
    setBookInfo(result?.data);
    setIsHeart(result?.data?.isLike)
  };
  // Thả tim
  const LikeBook = async (bookId) => {
    const result = await favoriteBook(bookId);
    setIsHeart(result.data);
  };

  useEffect(() => {
    getById();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: "8%",
          width: "95%",
          marginLeft: "2.5%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{ height: "36%" }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={25} color="black"></Icon>
        </TouchableOpacity>
        <View style={{ width: "65%", height: "30%", justifyContent: "center" }}>
          <Text style={{ fontWeight: "500" }}>{bookInfo?.name}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: "30%",
            width: "15%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity>
            <Image style={styles.icon}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", marginTop: 10 }} >
        <View style={{ height: "80%", width: "95%" }}>
          <View
            style={{
              height: "45%",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={{ width: "45%" }}>
              <Image
                source={{ uri: `${BaseUrl}${bookInfo?.imageUrl}` }}
                style={{ height: "70%", width: "80%", borderRadius: 10 }}
              ></Image>
            </View>
            <View style={{ height: "70%", width: "60%" }}>
              <Text style={{ fontWeight: "700", fontSize: 17 }}>
                {bookInfo?.name}
              </Text>
              <Text style={{ marginTop: 10 }}>{bookInfo?.author}</Text>
              <Text style={{ marginTop: 10 }}>0 đánh giá</Text>
              <View style={styles.position}>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity onPress={ () => LikeBook(bookId)}>
                    <Icon
                      name={isHeart ? "heart" : "heart-outline"}
                      style={{ fontSize: 20 }}
                      color={isHeart ? "red" : "black"}
                    ></Icon>
                  </TouchableOpacity>
                  <Text>{bookInfo?.countLike}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Icon name="eye-outline" style={{ fontSize: 20 }}></Icon>
                  <Text>{bookInfo?.viewBook}</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={{ marginTop: 10 }}>{bookInfo?.description}</Text>
          <View
            style={{
              height: "40%",
              marginTop: 10,
              width: "100%",
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 16 }}>
              Thông tin chi tiết
            </Text>
            <Form
              lable={"Tâm Lý - Hành vi - Tội phạm"}
              title={"Thể loại"}
            ></Form>
            <Form lable={bookInfo?.author} title={"Tác giả"}></Form>
            <Form lable={"VIP"} title={"Loại sách"}></Form>
            <Form lable={"Tiếng việt"} title={"Ngôn ngữ"}></Form>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          height: 60,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            height: "70%",
            width: "95%",
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#87c1a1",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500", color: "#fff" }}>
            Đọc sách
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 22,
    width: 22,
  },
  position: {
    height: 50,
    width: 60,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    position: "relative",
    left: "90%",
    bottom: 20,
  },
});
export default BookInfomationScreen;
