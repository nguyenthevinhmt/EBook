import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");
// Lấy chiều rộng của màn hình

// Tính chiều rộng cho mỗi item dựa trên màn hình, trừ đi khoảng cách giữa các item
const itemWidth = width / 3;
const BookCard = ({ imageUrl, title, author, onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">
        {author}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: itemWidth,
    padding: 5,
    justifyContent: "flex-start",
  },
  author: {
    fontSize: 10,
    width: "100%",
  },
  image: {
    // width: "100%",
    height: 140,
    resizeMode: "cover",
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 14,
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

export default BookCard;
