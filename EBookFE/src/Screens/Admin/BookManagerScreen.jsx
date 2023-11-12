import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../../Components/BookCard";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BaseUrl from "../../Utils/BaseUrl";
import { useNavigation } from "@react-navigation/native";
import { bookManager } from "../../Services/BookService";
import { category } from "../../Utils/constants";
import { formatDateDDMMYYYY } from "../../Utils/constants";
import DropDownPicker from 'react-native-dropdown-picker';
const BookManagerScreen = () => {
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const [searchName, setSearchName] = useState();
  const [categoryId, setCategoryId] = useState();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(category);

  const bookManagers = async () => {
    const result = await bookManager(searchName, categoryId);
    setResult(result.data);
    console.log(result.data)
  };

  useEffect(() => {
    bookManagers();
  }, [searchName, categoryId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View style={styles.headerSearch}>
          <Icon name="magnify" size={18} color={"#666"}></Icon>
          <TextInput
            style={{ paddingHorizontal: 10 }}
            placeholder="Tìm kiếm sách của bạn ..."
            value={searchName}
            onChangeText={(value) => setSearchName(value)}
            onSubmitEditing={() => {
              //navigation.navigate("SearchScreen", { keyword });
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            marginVertical: 8,
            justifyContent: 'space-between',
            height: 50
          }}
        >
          <View style={{width: '50%'}}>
            <DropDownPicker
              style={{borderColor: "#ccc", width: '70%' }}
              placeholder="Chọn thể loại"
              open={open}
              value={categoryId}
              items={items}
              setOpen={setOpen}
              setValue={setCategoryId}
              setItems={setItems}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#7a92f8",
              padding: 8,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#ccc",
              borderWidth: 1,
            }}
            onPress={() => navigation.navigate("BookAddScreen")}
          >
            <Text style={{ marginLeft: 8, color: "#fff", fontWeight: '500' }}>Đăng tải sách</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            //flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 5
          }}
        >
          <FlatList
            data={result}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.cardContainer}
                onPress={() => {
                  navigation.navigate(
                    "BookUpdateScreen",
                    (params = { bookId: item.id })
                  ); 
                }}
              >
                <Image source={{ uri: `${BaseUrl}${item.imageUrl}` }} style={styles.image} />
                <View>
                  <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    {item.name} 
                  </Text>
                  <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">
                    - Tác giả: {item?.author}
                  </Text>
                  <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">
                    - Thể loại: {item?.categoryName}
                  </Text>
                  <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">
                    - Người đăng tải: {item?.createdByName}
                  </Text>
                  <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">
                    - Ngày đăng tải: {formatDateDDMMYYYY(item?.createdDate)}
                  </Text>
                </View>
              </TouchableOpacity>
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
  cardContainer: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    //backgroundColor: 'red'
  },
  author: {
    fontSize: 13,
    width: "100%",
  },
  image: {
    width: 90,
    height: 140,
    resizeMode: "cover",
    borderRadius: 8,
    marginRight: 10
  },
  title: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 16,
    width: "100%",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  statText: {
    fontSize: 14,
    color: "#555",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#0066cc",
    padding: 10,
    borderRadius: 5,
    width: "95%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default BookManagerScreen;
