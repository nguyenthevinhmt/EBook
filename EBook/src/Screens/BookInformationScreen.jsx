import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useMemo, useEffect } from "react";
import { favoriteBook } from "../Services/BookService";
import { useRoute } from "@react-navigation/native";
import { getBookById, rateBook } from "../Services/BookService";
import BaseUrl from "../Utils/BaseUrl";
import { Rating, RatingInput } from "react-native-stock-star-rating";

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
  const [comments, setComments] = useState([]);
  const [ratingContent, setRatingContent] = useState(null);
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const getById = async () => {
    const result = await getBookById(bookId);
    setBookInfo(result?.data);
    setIsHeart(result?.data?.isLike);
    console.log(result?.data);
    setComments(result?.data?.ratingBooks);
  };
  // Thả tim
  const LikeBook = async (bookId) => {
    const result = await favoriteBook(bookId);
    setIsHeart(result.data);
  };

  const CreateRating = async () => {
    const data = { bookId: bookId, rate: rating, content: ratingContent };
    const result = await rateBook(data);
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    getById();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 10,
          height: 50,
          width: "100%",
          //marginLeft: "2.5%",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          //backgroundColor:'red'
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: 10, width: "10%" }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={35} color="black"></Icon>
        </TouchableOpacity>
        <View style={{ width: "65%", justifyContent: "center" }}>
          <Text style={{ fontWeight: "500", fontSize: 17 }}>
            {bookInfo?.name}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: "95%" }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                //backgroundColor: 'red'
              }}
            >
              <View style={{ width: "45%" }}>
                <Image
                  source={{ uri: `${BaseUrl}${bookInfo?.imageUrl}` }}
                  style={{ height: 190, width: "90%", borderRadius: 10 }}
                ></Image>
              </View>
              <View style={{ width: "55%", height: "100%" }}>
                <Text style={{ fontWeight: "700", fontSize: 17 }}>
                  {bookInfo?.name}
                </Text>
                <Text style={{ marginTop: 10 }}>{bookInfo?.author}</Text>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View>
                    <Rating
                      stars={bookInfo?.rate ?? 0}
                      maxStars={5}
                      size={20}
                    />
                    <Text style={{ marginTop: 5 }}>
                      {bookInfo?.rateCount} đánh giá
                    </Text>
                  </View>
                  <View style={styles.position}>
                    <View style={{ alignItems: "center" }}>
                      <TouchableOpacity onPress={() => LikeBook(bookId)}>
                        <Icon
                          name={isHeart ? "heart" : "heart-outline"}
                          style={{ fontSize: 20 }}
                          color={isHeart ? "red" : "black"}
                        ></Icon>
                      </TouchableOpacity>
                      <Text>{bookInfo?.countLike}</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Icon name="eye-outline" style={{ fontSize: 20 }}></Icon>
                      <Text>{bookInfo?.viewBook}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* Mô tả nội dung sách */}
            <Text style={{ marginTop: 10 }}>{bookInfo?.description}</Text>
            <View style={{ marginTop: 10, width: "100%" }}>
              <Text style={{ fontWeight: "700", fontSize: 16 }}>
                Thông tin chi tiết
              </Text>
              <Form lable={bookInfo?.categoryName} title={"Thể loại"}></Form>
              <Form lable={bookInfo?.author} title={"Tác giả"}></Form>
              <Form lable={"VIP"} title={"Loại sách"}></Form>
              <Form lable={"Tiếng việt"} title={"Ngôn ngữ"}></Form>
            </View>
          </View>
          {/* Bình luận đánh giá */}
          <View style={{ width: "95%", marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontWeight: "700", fontSize: 16 }}>
                Đánh giá sách
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("RatingScreen", { bookId })}
              >
                <Text style={{ textDecorationLine: "underline" }}>
                  Xem tất cả
                </Text>
              </TouchableOpacity>
            </View>
            {comments?.length > 0 ? (
              <View>
                {comments?.map((item) => (
                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      flexDirection: "row",
                      marginTop: 5,
                    }}
                  >
                    <View style={{ marginRight: 5 }}>
                      <Image
                        source={{ uri: `${BaseUrl}${bookInfo?.imageUrl}` }}
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
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{ ...styles.button }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#51d67b" }}
                >
                  Đánh giá sách
                </Text>
              </TouchableOpacity>
            </View>
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
            backgroundColor: "#51d67a",
          }}
          onPress={() => navigation.navigate("BookPDFScreen", {bookUrl: bookInfo?.fileUrl, bookName: bookInfo?.name})}
        >
          <Text style={{ fontSize: 16, fontWeight: "500", color: "#fff" }}>
            Đọc sách
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView }}>
            <Text style={{ fontWeight: "600", fontSize: 15 }}>
              Đánh giá về cuốn sách
            </Text>
            <View style={{ alignItems: "center" }}>
              <RatingInput
                rating={rating}
                setRating={setRating}
                size={50}
                maxStars={5}
                bordered={false}
              />
            </View>
            <TextInput
              style={styles.viewInput}
              placeholder="Nhập vào nội dung đánh giá ..."
              placeholderTextColor={"#686868"}
              value={ratingContent}
              onChangeText={(value) => setRatingContent(value)}
            />
            <View
              style={{
                marginTop: 10,
                width: "95%",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                style={{ ...styles.button, borderColor: "red" }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{ fontSize: 14, fontWeight: "500", color: "red" }}>
                  Hủy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, marginLeft: 10 }}
                onPress={() => CreateRating()}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#87c1a1" }}
                >
                  Hoàn tất
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
    marginRight: 10,
  },
  viewInput: {
    height: 40,
    width: "95%",
    borderBottomWidth: 1,
    borderBottomColor: "#686868",
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    color: "#686868",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9f9f9fb8",
  },
  modalView: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    height: 35,
    width: "35%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#87c1a1",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default BookInfomationScreen;
