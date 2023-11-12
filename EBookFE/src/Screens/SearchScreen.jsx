import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchBook } from "../Services/BookService";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BookCard from "../Components/BookCard";
import DropDownPicker from 'react-native-dropdown-picker';
import { category } from "../Utils/constants";
const SearchScreen = ({ navigation, route }) => {
  const { keyword } = route.params;
  const [result, setResult] = useState([]);
  const [searchName, setSearchName] = useState(keyword);
  const [categoryId, setCategoryId] = useState();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(category);

  const search = async () => {
    const result = await searchBook(searchName, categoryId);
    setResult(result.data);
  };

  useEffect(() => {
    search();
  }, [searchName, categoryId]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View style={styles.headerSearch}>
          <Icon name="magnify" size={18} color={"#666"}></Icon>
          <TextInput style={{ paddingHorizontal: 10 }} placeholder="Tìm kiếm"
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
            marginHorizontal: 15,
            marginVertical: 2,
            justifyContent: 'flex-end',
          }}
        >
          <View>
            <DropDownPicker
              style={{ marginTop: 10, borderColor: "#ccc", width: '50%' }}
              placeholder="Chọn vai trò"
              open={open}
              value={categoryId}
              items={items}
              setOpen={setOpen}
              setValue={setCategoryId}
              setItems={setItems}
            />
          </View>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            //flex: 1,
            width: "100%",
            justifyContent: "center",
            //alignItems: "center",
          }}
        >
          <FlatList
            data={result}
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
export default SearchScreen;
