import React from "react";
import { View, Text } from "react-native";

const UnDevelopedScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <Text style={{ fontSize: 15, fontWeight: "400", textAlign: "center" }}>
        Tính năng này chưa được phát triển
      </Text>
    </View>
  );
};

export default UnDevelopedScreen;
