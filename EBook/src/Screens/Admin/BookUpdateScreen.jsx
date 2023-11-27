import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    useWindowDimensions,
    TouchableOpacity,
    Alert,
    ScrollView
} from "react-native";
import { useEffect, useState } from "react";
import Icons from "react-native-vector-icons/Feather";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { uploadBook, getBookById, deleteBook } from "../../Services/BookService";
import { useRoute } from "@react-navigation/native";
import BaseUrl from "../../Utils/BaseUrl";
import { category } from "../../Utils/constants";
import DropDownPicker from 'react-native-dropdown-picker';

const BookUpdateScreen = ({ navigation }) => {
    const route = useRoute();
    const { bookId } = route.params;
    const { width } = useWindowDimensions();
    const [imageUrl, setImageUrl] = useState();
    const [imageUrlApi, setImageUrlApi] = useState();
    const [filePdf, setFilePdf] = useState(null);
    const [categoryId, setCategoryId] = useState();
    const [name, setName] = useState("");
    const [publishingCompany, setPublishingCompany] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(category);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            includeBase64: true,
        });
        if (!result.cancelled) {
            setImageUrl(result.assets[0].uri);
        }
    };

    const pickPdf = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
            });
            if (result.assets[0]) {
                setFilePdf(result.assets[0]);
            }
        } catch (err) {
            console.error("Error picking document: ", err);
        }
    };

    const updateBook = async () => {
        try {
            const formData = new FormData();
            if (filePdf) {
                formData.append("FileUrl", {
                    uri: filePdf.uri,
                    type: filePdf.mimeType, // Replace with the appropriate MIME type
                    name: filePdf.name, // Replace with the desired file name
                });
            }
            // Nếu có upload ảnh
            if (imageUrl) {
                // Cắt ra từng phần trong /
                let parts = imageUrl.split("/");
                // Lấy giá trị tên hình ảnh sau giá trị ImagePicker
                let imageName = parts[parts.indexOf("ImagePicker") + 1];
                // Tìm kiếm đuôi của ảnh
                let match = /\.(\w+)$/.exec(parts);
                // Loại file ảnh
                let typeImage = match ? `image/${match[1]}` : `image`;

                formData.append("ImageUrl", {
                    uri: imageUrl,
                    type: typeImage, // Replace with the appropriate MIME type
                    name: imageName, // Replace with the desired file name
                });
            }

            formData.append("id", bookId);
            formData.append("name", name);
            formData.append("author", author);
            formData.append("publishingCompany", publishingCompany);
            formData.append("categoryId", categoryId);
            formData.append("description", description);
            const result = await uploadBook(formData);
            navigation.goBack();
        } catch (error) {
            console.error("Lỗi tải sách:", error);
        }
    };


    const deleteFunc = async () => {
        try {
            const result = await deleteBook(bookId);
            console.log(result);
            navigation.goBack();
        } catch (error) {
            console.error("Xóa sách không thành công: ", error);
        }
    };

    const deleteBookId = async () => {
        Alert.alert('Xóa cuốn sách', 'Bạn có chắc chắn muốn xóa cuốn sách không???', [
            {
                text: 'Để sau',
                style: 'cancel',
            },
            { text: 'Đồng ý', onPress: () => deleteFunc() },
        ]);
    };

    const bookInfo = async () => {
        const result = await getBookById(bookId);
        if (result) {
            setName(result.data.name);
            setAuthor(result.data.author);
            setPublishingCompany(result.data.publishingCompany);
            setDescription(result.data.description);
            setImageUrlApi(result.data.imageUrl);
            setCategoryId(result.data.categoryId);
            console.log(result.data)
        }
    };

    useEffect(() => {
        bookInfo();
    }, []);
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 50 }}>
                <Text style={{ fontSize: 24, fontWeight: "500" }}>Cập nhật sách</Text>
            </View>
            <ScrollView>
                <View style={{ ...styles.btnWrapper, width: width - 50 }}>
                    <View style={{ flexDirection: "column", width: "100%" }}>
                        <Text style={styles.orText}>Tên sách</Text>
                        <TextInput
                            style={styles.viewInput}
                            placeholderTextColor={"#686868"}
                            placeholder="Nhập vào tên sách..."
                            value={name}
                            onChangeText={(value) => setName(value)}
                        />
                    </View>
                    <View style={{ flexDirection: "column", width: "100%", marginTop: 20 }}>
                        <Text style={styles.orText}>Tác giả</Text>
                        <TextInput
                            style={styles.viewInput}
                            placeholder="Nhập vào tên tác giả ..."
                            placeholderTextColor={"#686868"}
                            value={author}
                            onChangeText={(value) => setAuthor(value)}
                        />
                    </View>
                    <View style={{ flexDirection: "column", width: "100%", marginTop: 20 }}>
                        <Text style={styles.orText}>Nhà xuất bản</Text>
                        <TextInput
                            style={styles.viewInput}
                            placeholder="Nhập vào tên nhà xuất bản ..."
                            placeholderTextColor={"#686868"}
                            value={publishingCompany}
                            onChangeText={(value) => setPublishingCompany(value)}
                        />
                    </View>
                    {/* <View style={{ flexDirection: "column", width: "100%", marginTop: 20 }}>
            <Text style={styles.orText}>Năm xuất bản</Text>
            <TextInput
              style={styles.viewInput}
              placeholder="Nhập vào năm xuất bản ..."
              placeholderTextColor={"#686868"}
              value={author}
              onChangeText={(value) => setAuthor(value)}
            />
            
          </View> */}
                    <View style={{ flexDirection: "column", width: "100%", marginTop: 20 }}>
                        <Text style={styles.orText}>Thể loại</Text>
                        <View>
                            <DropDownPicker
                                style={{ marginTop: 10, borderColor: "#ccc" }}
                                placeholder="Chọn vai trò"
                                open={open}
                                value={categoryId}
                                items={items}
                                setOpen={setOpen}
                                setValue={setCategoryId}
                                setItems={setItems}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: "column", width: "100%", marginTop: 20 }}>
                        <Text style={styles.orText}>Mô tả sách</Text>
                        <TextInput
                            style={styles.viewInput}
                            placeholder="Mô tả sách ..."
                            placeholderTextColor={"#686868"}
                            value={description}
                            onChangeText={(value) => setDescription(value)}
                        />
                    </View>
                    <View style={{ ...styles.uploadAudio }}>
                        <TouchableOpacity
                            onPress={pickPdf}
                            style={{ marginRight: 10, width: "100%" }}
                        >
                            <View
                                style={{
                                    backgroundColor: "#51d67b",
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: 10,
                                }}
                            >
                                <Text
                                    style={{ fontSize: 13, fontWeight: "600", color: "#ffffff" }}
                                >
                                    Tải nội dung{" "}
                                    <Icons name={"folder-plus"} size={15} color={"#ffffff"} />
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {filePdf ? (
                            <View>
                                <Text
                                    style={{
                                        color: "#686868",
                                        borderBottomWidth: 0.5,
                                        borderBottomColor: "#ffffff99",
                                    }}
                                >
                                    {filePdf.name}
                                </Text>
                            </View>
                        ) : null}
                    </View>
                    <View style={{ flexDirection: "column", width: "100%", marginTop: 10 }}>
                        <TouchableOpacity
                            onPress={pickImage}
                            style={{ marginRight: 10, width: "100%" }}
                        >
                            <View
                                style={{
                                    backgroundColor: "#686868",
                                    padding: 10,
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{ fontSize: 13, fontWeight: "600", color: "#ffffff" }}
                                >
                                    Tải ảnh{" "}
                                    <Icons name={"folder-plus"} size={15} color={"#ffffff"} />
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {imageUrlApi ? (
                            <Image
                                source={{ uri: `${BaseUrl}${imageUrlApi}` }}
                                resizeMode="cover"
                                style={{
                                    width: 100,
                                    height: 200,
                                    marginTop: 10,
                                    borderRadius: 15,
                                    borderWidth: 1,
                                }}
                            />
                        ) :
                            <Image
                                source={{ uri: imageUrl }}
                                resizeMode="cover"
                                style={{
                                    width: 100,
                                    height: 200,
                                    marginTop: 10,
                                    borderRadius: 15,
                                    borderWidth: 1,
                                }}
                            />}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                        <TouchableOpacity style={{ ...styles.inputSubmit, backgroundColor: 'red', borderColor: 'red' }} onPress={deleteBookId}>
                            <Text style={{ color: "#fff", fontWeight: '600' }}>Xóa sách</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.inputSubmit }} onPress={updateBook}>
                            <Text style={{ color: "#51d67b", fontWeight: '600' }}>Cập nhật sách</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        // backgroundColor: "#232020",
    },
    btnWrapper: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: 20,
    },
    orText: {
        color: "#111",
        fontWeight: "600",
    },
    viewInput: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#686868",
        flexDirection: "row",
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
        color: "#686868",
    },
    uploadAudio: {
        marginTop: 25,
        height: 50,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    inputSubmit: {
        padding: 10,
        width: "40%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 50,
        borderWidth: 1,
        borderColor: "#51d67b",
    }
});

export default BookUpdateScreen;
