import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { bookGetAll } from "../Services/BookService";
import BaseUrl from "../Utils/BaseUrl";
import { useState, useEffect } from "react";

const data = [
  {
    id: "1",
    name: "Năng Lượng Tĩnh Lặng ",
    author: "Eckhart Tolle",
    image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
  },
  {
    id: "2",
    name: "Bí Mật Tư Duy Triệu Phú T. ",
    author: "Harv Eker",
    image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
  },
  {
    id: "3",
    name: "7 Thói Quen Hiệu Quả Stephen",
    author: " R. Covey",
    image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
  },
  {
    id: "4",
    name: "Nhìn Xa, Nhìn Rõ - Dr. Wayne ",
    author: "W. Dyer",
    image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
  },
  {
    id: "5",
    name: "Tư Duy Tích Cực ",
    author: " Norman Vincent Peale",
    image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
  },
  {
    id: "6",
    name: "Tư Duy Nhanh Và Chậm ",
    author: " Daniel Kahneman",
    image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
  },
];

const itemsPerRow = 3;
const HomeScreen = () => {
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);

  const BookInformation = (bookId) => {
    navigation.navigate("BookInfomationScreen", { bookId });
  };

  const getBooks = async () => {
    const result = await bookGetAll();
    setBooks(result?.data);
  };
  useEffect(() => {
    getBooks();
  }, []);

  const rows = [];
  for (let i = 0; i < books.length; i += itemsPerRow) {
    const rowItems = books.slice(i, i + itemsPerRow);
    const row = (
      <View key={i} style={styles.row}>
        {rowItems.map((item) => (
          <TouchableOpacity
            style={{
              height: 200,
              width: 125,
              marginHorizontal: 5,
              //alignItems: "center",
              //justifyContent: "space-between",
            }}
            onPress={() => BookInformation(item.id)}
            key={item.id}
          >
            <Image
              style={{ height: "85%", width: "100%", borderRadius: 5 }}
              source={{ uri: `${BaseUrl}${item.imageUrl}` }}
            ></Image>
            <View style={{ flexDirection: "column", height: 30 }}>
              <Text style={{ marginTop: 10 }} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={{ marginTop: 10 }} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
    rows.push(row);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View
          style={{
            height: "10%",
            width: "95%",
            marginLeft: "2.5%",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              height: "60%",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity>
              <Icon name="menu" size={30} color={"#555"}></Icon>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 5,
                height: "90%",
                width: "85%",
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                borderColor: "#ccc",
                borderRadius: 15,
                padding: 5,
              }}
            >
              <Icon
                name="magnify"
                size={25}
                color={"#666"}
                style={{ marginHorizontal: 5 }}
              ></Icon>
              <TextInput
                style={{ height: "100%", width: "85%" }}
                placeholder="Tìm kiếm danh sách"
                placeholderTextColor={"#555"}
              />
            </View>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{ alignItems: "center", marginTop: 10 }}
        >
          <View style={{ height: "100%", width: "95%" }}>
            <Text style={{ fontWeight: "600" }}>Hôm nay đọc gì</Text>
            <ScrollView
              horizontal
              contentContainerStyle={{
                height: 200,
                width: "100%",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              {data.map((item) => {
                return (
                  <View
                    style={{
                      height: "85%",
                      width: 115,
                      marginHorizontal: 10,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    key={item.id}
                  >
                    <Image
                      style={{ height: "85%", width: "100%" }}
                      source={{ uri: item.image }}
                    ></Image>
                    <Text>{item.name}</Text>
                  </View>
                );
              })}
            </ScrollView>
            <View
              style={{
                height: 50,
                width: "100%",
                marginLeft: "2.5",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "600" }}>Sách mới nhất</Text>
              <TouchableOpacity>
                <Text>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 30,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>THỂ LOẠI</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Icon name="chevron-down" size={25} color={"black"}></Icon>
                <Text style={{ marginHorizontal: 8 }}>LOẠI SÁCH</Text>
                <Icon name="chevron-down" size={25} color={"black"}></Icon>
              </View>
            </View>
            <ScrollView contentContainerStyle={{marginTop: 10 }} >
              {rows}
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 22,
    width: 22,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
});

export default HomeScreen;
