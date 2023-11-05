import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../Components/BookCard";
// import Icon from "react-native-vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const FavoriteScreen = ({ navigation }) => {
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
    {
      id: "7",
      name: "Năng Lượng Tĩnh Lặng ",
      author: "Eckhart Tolle",
      image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
    },
    {
      id: "8",
      name: "Bí Mật Tư Duy Triệu Phú T. ",
      author: "Harv Eker",
      image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
    },
    {
      id: "9",
      name: "7 Thói Quen Hiệu Quả Stephen",
      author: " R. Covey",
      image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
    },
    {
      id: "10",
      name: "Nhìn Xa, Nhìn Rõ - Dr. Wayne ",
      author: "W. Dyer",
      image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
    },
    {
      id: "11",
      name: "Tư Duy Tích Cực ",
      author: " Norman Vincent Peale",
      image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
    },
    {
      id: "12",
      name: "Tư Duy Nhanh Và Chậm ",
      author: " Daniel Kahneman",
      image: "https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg",
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View style={styles.headerSearch}>
          <Icon name="magnify" size={18} color={"#666"}></Icon>
          <TextInput
            style={{ paddingHorizontal: 10 }}
            placeholder="Tìm kiếm sách yêu thích của bạn ..."
          />
        </View>
        <View
          style={{
            alignItems: "flex-end",
            marginHorizontal: 25,
            marginVertical: 8,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "#fafafa",
              padding: 8,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#ccc",
              borderWidth: 1,
            }}
          >
            <Text style={{ marginLeft: 8 }}>Thể loại</Text>
            <Icon
              name="chevron-down"
              size={18}
              color={"#111"}
              style={{ marginLeft: 8 }}
            ></Icon>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <BookCard
                imageUrl={item.image}
                title={item.name}
                author={item.author}
                onPress={() => {
                  navigation.navigate(
                    "BookInfomationScreen",
                    (params = { id: item.id })
                  );
                }}
              />
            )}
            numColumns={3}
            contentContainerStyle={styles.flatListContentContainer}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItem: "center",
    width: "100%",
    paddingVertical: 8,
  },
  headerSearch: {
    backgroundColor: "#fff",
    width: "95%",
    marginHorizontal: 10,
    flexDirection: "row",
    height: "90",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 8,
    borderRadius: 25,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  row: {
    flex: 1,
    justifyContent: "space-around", // Điều này sẽ đảm bảo có không gian đều xung quanh các items
  },
  flatListContentContainer: {},
});
export default FavoriteScreen;
