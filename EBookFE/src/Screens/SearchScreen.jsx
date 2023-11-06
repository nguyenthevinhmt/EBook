import React from "react";
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

const SearchScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View style={styles.headerSearch}>
          <Icon name="magnify" size={18} color={"#666"}></Icon>
          <TextInput style={{ paddingHorizontal: 10 }} placeholder="Tìm kiếm" />
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
          {/* <FlatList
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
                    (params = { id: item.id })
                  );
                }}
              />
            )}
            numColumns={3}
            contentContainerStyle={styles.flatListContentContainer}
          /> */}
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
