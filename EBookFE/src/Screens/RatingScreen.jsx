import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchBook, listRateBooks } from "../Services/BookService";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRoute } from "@react-navigation/native";
import BaseUrl from "../Utils/BaseUrl";
import { Rating, RatingInput } from "react-native-stock-star-rating";
const RatingScreen = ({ navigation }) => {
  const route = useRoute();
  const { bookId } = route.params;
  const [result, setResult] = useState([]);
  const [comments, setComments] = useState([]);

  const rateBooks = async () => {
    const result = await listRateBooks(bookId);
    console.log(result);
    setComments(result.data);
  };

  useEffect(() => {
    rateBooks();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18, marginLeft: 10 }}>Đánh giá sách</Text>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close-thick" size={20} color={"#666"}></Icon>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View style={{ width: "95%" }}>
          {comments?.length > 0 ? (
            <View>
              {comments?.map((item) => (
                <View
                  style={{
                    borderBottomWidth: 0.2,
                    flexDirection: "row",
                    marginTop: 5,
                  }}
                  key={item.id}
                >
                  <View style={{ marginRight: 5 }}>
                    <Image
                      source={{ uri: `${BaseUrl}${item?.imageUrl}` }}
                      style={{ height: 25, width: 25, borderRadius: 10 }}
                    ></Image>
                  </View>
                  <View>
                    <Text style={{ fontWeight: "900" }}>{item?.email}</Text>
                    <Rating stars={item?.rate ?? 0} maxStars={5} size={13} />
                    <Text style={{ marginTop: 5 }}>{item?.content}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View>
              <Text style={{ color: "#cecece" }}>Không có đánh giá nào</Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItem: "center",
    justifyContent: "center",
    width: "100%",
  },
});
export default RatingScreen;
