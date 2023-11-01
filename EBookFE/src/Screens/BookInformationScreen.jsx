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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState, useRef, useMemo, useEffect } from "react";

const data = {
    id: "2",
    name: "Bí Mật Tư Duy Triệu Phú Tư duy. ",
    author: "Harv Eker",
    publishingCompany: "NXB Kim đồng",
    description: "Tâm lý học tội phạm là bộ sách gồm 2 tập đề cập đến quyền lựa chọn, ý chí tự do, cái thiện và cái ác, phản ứng trước cám dỗ và sự thể hiện lòng dũng cảm hay hèn nhát khi đối mặt với nghịch cảnh của",
    imageUrl: 'https://m.media-amazon.com/images/I/51JJjOHi2sL.jpg',
}

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

const BookInfomationScreen = () => {

    const [isHeart, setIsHeart] = useState(false);
    const [bookInfo, setBookInfo] = useState(data);

    // Thả tim
  const LikeBook = () => {
    setIsHeart(!isHeart)
    // like_book(bookInfo?.id ?? 0, (res) => {
    //   setIsHeart(res)
    // })
  }
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
                <Icon name="bell" size={25} color={"black"}></Icon>
                <View style={{ width: "65%", height: "30%", justifyContent: "center" }}>
                    <Text style={{ fontWeight: "500" }}>{bookInfo.name}</Text>
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
                    <TouchableOpacity>
                        <Icon name="bell" size={25} color={"black"}></Icon>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                contentContainerStyle={{ flex: 1, alignItems: "center", marginTop: 10 }}
            >
                <View style={{ height: "80%", width: "95%" }}>
                    <View
                        style={{
                            height: "35%",
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={{ uri: bookInfo.imageUrl }}
                            style={{ height: "100%", width: 150 }}
                        ></Image>
                        <View style={{ height: "100%", width: "60%" }}>
                            <Text style={{ fontWeight: "500", fontSize: 17 }}>
                                {bookInfo.name}
                            </Text>
                            <Text style={{ marginTop: 10 }}>{bookInfo.author}</Text>
                            <Text style={{ marginTop: 10 }}>0 đánh giá</Text>
                            <View style={styles.position}>
                                <View>
                                <TouchableOpacity onPress={LikeBook}>
                                    <Icon name={isHeart ? 'heart' : 'heart-outline'} style={{ fontSize: 20 }} color={isHeart ? 'red' : 'black'}></Icon>
                                </TouchableOpacity>
                                    <Text>30</Text>
                                </View>
                                <View>
                                    <Icon name="eye-outline" style={{ fontSize: 20 }}></Icon>
                                    <Text>100</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={{
                                    marginTop: "6%",
                                    height: 40,
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 12,
                                    backgroundColor: "#87c1a1"
                                }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: "500", color: "#fff" }}>
                                    Mua Sách
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ marginTop: 10 }} >
                        {bookInfo.description}
                    </Text>
                    <View
                        style={{
                            height: "40%",
                            marginTop: 10,
                            width: "100%",
                        }}
                    >
                        <Text style={{ fontWeight: "700", fontSize: 16 }}>Thông tin chi tiết</Text>
                        <Form
                            lable={"Tâm Lý - Hành vi - Tội phạm"}
                            title={"Thể loại"}
                        ></Form>
                        <Form lable={bookInfo.author} title={"Tác giả"}></Form>
                        <Form lable={"VIP"} title={"Loại sách"}></Form>
                        <Form lable={"Tiếng việt"} title={"Ngôn ngữ"}></Form>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 15
                        }}
                    >
                        <Text style={{ fontWeight: "700", fontSize: 16 }}>Đánh giá sách</Text>
                        <Text>Xem tất cả</Text>
                    </View>
                    <Text style={{ color: "gray", fontSize: 13, marginVertical: 8 }}>
                        Không có đánh giá nào
                    </Text>
                    <TouchableOpacity
                        style={{
                            position: "relative",
                            height: 45,
                            width: 130,
                            alignItems: "center",
                            justifyContent: "center",
                            borderWidth: 1,
                            borderRadius: 5,
                            marginTop: 5,
                            left: "35%",
                        }}
                    >
                        <Text>Đánh giá sách</Text>
                    </TouchableOpacity>
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
                        backgroundColor: '#87c1a1'
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>Đọc sách</Text>
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
