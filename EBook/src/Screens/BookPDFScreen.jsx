import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Pdf from 'react-native-pdf';
import { useRoute } from "@react-navigation/native";
import BaseUrl from '../Utils/BaseUrl';
import Icon from "react-native-vector-icons/Ionicons";

const BookPDFScreen = ({ navigation }) => {
    const route = useRoute();
    const { bookUrl, bookName } = route.params;
    const PdfResource = { uri: `${BaseUrl}${bookUrl}`, cache: true };

    return (
        <View style={styles.container}>
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
                        {bookName}
                    </Text>
                </View>
            </View>
            {/* <Text style={styles.title}>Đọc sách</Text> */}
            <Pdf
                trustAllCerts={false}
                source={PdfResource}
                style={styles.pdf}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`number of pages: ${numberOfPages}`);
                }}
            />
        </View>
    )
}

export default BookPDFScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})