import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../Components/BookCard";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { bookFavorite } from "../Services/BookService";
import DropDownPicker from "react-native-dropdown-picker";
import { category } from "../Utils/constants";
import { useFocusEffect } from "@react-navigation/native";

const FavoriteScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(category);
  const [searchName, setSearchName] = useState("");
  const [categoryId, setCategoryId] = useState();
  const getBookFavorite = async () => {
    //await AsyncStorage.removeItem("accessToken");
    const result = await bookFavorite(searchName, categoryId);
    setBooks(result?.data);
  };
  useFocusEffect(
    useCallback(() => {
      getBookFavorite();
    }, [searchName, categoryId])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View style={styles.headerSearch}>
          <Icon name="magnify" size={18} color={"#666"}></Icon>
          <TextInput
            style={{ paddingHorizontal: 10 }}
            placeholder="Tìm kiếm sách yêu thích của bạn ..."
            value={searchName}
            onChangeText={(value) => setSearchName(value)}
            onSubmitEditing={() => {
              //navigation.navigate("SearchScreen", { keyword });
            }}
          />
        </View>
        <View
          style={{
            alignItems: "flex-end",
            marginHorizontal: 25,
            marginVertical: 8,
          }}
        >
          <View>
            <DropDownPicker
              style={{ marginTop: 10, borderColor: "#ccc", width: "50%" }}
              placeholder="Chọn thể loại"
              open={open}
              value={categoryId}
              items={items}
              setOpen={setOpen}
              setValue={setCategoryId}
              setItems={setItems}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            //alignItems: "center",
          }}
        >
          <FlatList
            data={books}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <BookCard
                imageUrl={item.imageUrl}
                title={item.name}
                author={item.author}
                onPress={() => {
                  navigation.navigate(
                    "BookInfomationScreen",
                    (params = { bookId: item.id })
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
