import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

const AddCategoryScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontSize: 24, fontWeight: "500" }}>Thêm danh mục</Text>
      </View>
      <View style={{ ...styles.btnWrapper, width: width - 50 }}>
        <View style={{ flexDirection: "column", width: "100%" }}>
          <Text style={styles.orText}>Tên danh mục</Text>
          <TextInput
            style={styles.viewInput}
            placeholderTextColor={"#686868"}
            placeholder="Nhập vào tên danh mục..."
            value={name}
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={{ flexDirection: "column", width: "100%", marginTop: 20 }}>
          <Text style={styles.orText}>Mô tả</Text>
          <TextInput
            style={styles.viewInput}
            placeholder="Nhập vào mô tả"
            placeholderTextColor={"#686868"}
            value={description}
            onChangeText={(value) => setDescription(value)}
          />
        </View>

        <TouchableOpacity
          onPress={uploadFile}
          style={{
            padding: 10,
            width: "100%",
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            marginTop: 50,
            borderWidth: 1,
            borderColor: "#51d67b",
          }}
        >
          <Text style={{ color: "#51d67b" }}>Thêm danh mục</Text>
        </TouchableOpacity>
      </View>
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
});

export default AddCategoryScreen;
