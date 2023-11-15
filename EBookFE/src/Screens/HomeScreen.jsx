import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { bookGetAll, getBookByLikeCount } from "../Services/BookService";
import BaseUrl from "../Utils/BaseUrl";
import { useState, useEffect } from "react";

const itemsPerRow = 3;
const HomeScreen = () => {
  const navigation = useNavigation();
  const [hotBooks, setHotBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const BookInformation = (bookId) => {
    navigation.navigate("BookInfomationScreen", { bookId: bookId });
  };
  const data = [
    {
      id: "1",
      name: "Năng Lượng Tĩnh Lặng ",
      author: "Eckhart Tolle",
      image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
      viewCount: "20",
    },
    {
      id: "2",
      name: "Bí Mật Tư Duy Triệu Phú T. ",
      author: "Harv Eker",
      image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
      viewCount: "20",
    },
    {
      id: "3",
      name: "7 Thói Quen Hiệu Quả Stephen",
      author: " R. Covey",
      image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
      viewCount: "20",
    },
    {
      id: "4",
      name: "Nhìn Xa, Nhìn Rõ - Dr. Wayne ",
      author: "W. Dyer",
      image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
      viewCount: "20",
    },
    {
      id: "5",
      name: "Tư Duy Tích Cực ",
      author: " Norman Vincent Peale",
      image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
      viewCount: "20",
    },
    {
      id: "6",
      name: "Tư Duy Nhanh Và Chậm ",
      author: " Daniel Kahneman",
      image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
      viewCount: "20",
    },
  ];

  const getBooks = async () => {
    const result = await bookGetAll();
    setBooks(result?.data);
    console.log("books", books);
  };

  const getBooksByViewCount = async () => {
    const result = await getBookByLikeCount();
    setHotBooks(result?.data);
    console.log("respone", books);
  };

  useEffect(() => {
    getBooks();
    getBooksByViewCount();
  }, []);

  const rows = [];
  for (let i = 0; i < books?.length; i += itemsPerRow) {
    const rowItems = books.slice(i, i + itemsPerRow);
    const row = (
      <View key={i} style={styles.row}>
        {rowItems.map((item) => (
          <TouchableOpacity
            style={{
              height: 180,
              width: 106,
              marginHorizontal: 5,
            }}
            onPress={() => BookInformation(item.id)}
            key={item.id}
          >
            <Image
              style={{ height: "75%", width: "95%", borderRadius: 5 }}
              source={{ uri: `${BaseUrl}${item.imageUrl}` }}
              // resizeMode="contain"
            ></Image>
            <View style={{ flexDirection: "column", height: 30 }}>
              <Text
                style={{ marginTop: 10, fontSize: 9, alignItems: "center" }}
                numberOfLines={1}
              >
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
            height: 80,
            width: "100%",
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
            {/* <TouchableOpacity>
              <Icon name="menu" size={30} color={"#555"}></Icon>
            </TouchableOpacity> */}
            <View
              style={{
                marginTop: 5,
                height: "90%",
                width: "95%",
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
                style={{ height: "100%", width: "95%" }}
                placeholder="Tìm kiếm sách"
                placeholderTextColor={"#555"}
                value={keyword}
                onChangeText={(value) => setKeyword(value)}
                onSubmitEditing={() => {
                  navigation.navigate("SearchScreen", { keyword });
                }}
              />
            </View>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{ alignItems: "center", marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: "100%", width: "95%" }}>
            <Text style={{ fontWeight: "600", color: "red" }}>
              * Sách nổi bật
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                height: 200,
                marginTop: 15,
                paddingBottom: 20,
              }}
              style={{
                backgroundColor: "#fafafa",
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              {hotBooks.map((item) => {
                return (
                  <View
                    style={{
                      height: "95%",
                      width: 106,
                      marginHorizontal: 10,
                      // justifyContent: "space-between",
                      // alignItems: "center",
                    }}
                    key={item.id}
                  >
                    <Image
                      style={{ height: "85%", width: "100%", borderRadius: 5 }}
                      source={{ uri: `${BaseUrl}${item.imageUrl}` }}
                    ></Image>
                    <Text
                      style={{ fontSize: 10 }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
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
              <Text style={{ fontWeight: "600", color: "#51d67b" }}>
                Hôm nay đọc gì
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SearchScreen", { keyword: null })
                }
              >
                <Text style={{ color: "#51d67b" }}>Xem thêm</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={{ marginTop: 10 }}
              style={{ backgroundColor: "#fafafa", borderRadius: 8 }}
            >
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
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    width: "100%",
  },
});

export default HomeScreen;
