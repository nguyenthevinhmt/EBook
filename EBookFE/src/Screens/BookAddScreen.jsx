import { View, Text, TextInput, StyleSheet, Image, useWindowDimensions, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { useState, useRef, useMemo } from "react";
import Icons from 'react-native-vector-icons/Feather';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from "expo-image-picker";
import axios from 'axios';

const BookAddScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [imageUrl, setImageUrl] = useState()
  const [fileAudio, setFileAudio] = useState(null);
  const [name, setName] = useState("");
  const [musician, setMusician] = useState("");
  const [singer, setSinger] = useState("");
  const [description, setDescription] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      includeBase64: true
    });
    if (!result.cancelled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  // Chọn bài hát
  const pickAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*'
      });
      if (result.assets[0]) {
        console.log(result.assets[0])
        setFileAudio(result.assets[0])
        // uploadFile(fileAudio)
      }

    } catch (err) {
      console.error('Error picking document: ', err);
    }
  };

  // Tải bài hát
  const uploadFile = () => {
    try {
      const formData = new FormData();
      formData.append('Music', {
        uri: fileAudio.uri,
        type: fileAudio.mimeType, // Replace with the appropriate MIME type
        name: fileAudio.name, // Replace with the desired file name
      });
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

        formData.append('Image', {
          uri: imageUrl,
          type: typeImage, // Replace with the appropriate MIME type
          name: imageName, // Replace with the desired file name
        });
      }
      formData.append('name', name);
      formData.append('musician', musician);
      formData.append('singer', singer);
      formData.append('description', description);
      console.log(formData)
    //   upload_music(dispatch, formData,  (res) => {
    //     setTimeout(() => {
    //         navigation.navigate('BottomTabs', {
    //           screen: 'MySong'
    //         });
    //       }, 500);
    //   });
    } catch (error) {
      console.error('Lỗi tải file nhạc:', error);
    }
  };

  return (
    <View style={styles.container}>
        <View style={{marginTop: 50}}>
            <Text style={{fontSize: 24, fontWeight: '500'}}>Thêm cuốn sách</Text>
        </View>
      <View style={{ ...styles.btnWrapper, width: width - 100 }}>
        <View style={{ flexDirection: 'column', width: '100%' }}>
          <Text style={styles.orText}>Tên cuốn sách</Text>
          <TextInput
            style={styles.viewInput} placeholderTextColor={'#686868'}
            placeholder="Tên cuốn sách"
            value={name}
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={{ flexDirection: 'column', width: '100%', marginTop: 20 }}>
          <Text style={styles.orText}>Ca sĩ</Text>
          <TextInput
            style={styles.viewInput}
            placeholder="Tên ca sĩ" placeholderTextColor={'#686868'}
            value={singer}
            onChangeText={(value) => setSinger(value)}
          />
        </View>
        <View style={{ flexDirection: 'column', width: '100%', marginTop: 20 }}>
          <Text style={styles.orText}>Mô tả bài hát</Text>
          <TextInput
            style={styles.viewInput}
            placeholder="Mô tả bài hát" placeholderTextColor={'#686868'}
            value={description}
            onChangeText={(value) => setDescription(value)}
          />
        </View>
        <View style={{ ...styles.uploadAudio }}>
          <TouchableOpacity onPress={pickAudio} style={{ marginRight: 10 }}>
            <View style={{ backgroundColor: '#686868', width: 110, height: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#ffffff99' }}>Tải file nhạc  <Icons name={'folder-plus'} size={15} color={'#ffffff99'} /></Text>
            </View>
          </TouchableOpacity>
          {fileAudio ?
            <View>
              <Text style={{ color: '#686868', borderBottomWidth: 0.5, borderBottomColor: "#ffffff99", }}>{fileAudio.name}</Text>
            </View> : null}
        </View>
        <View style={{ flexDirection: 'column', width: '100%', marginTop: 10 }}>
          <TouchableOpacity onPress={pickImage} style={{ marginRight: 10 }}>
            <View style={{ backgroundColor: '#686868', width: 110, height: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#ffffff99' }}>Tải ảnh <Icons name={'folder-plus'} size={15} color={'#ffffff99'} /></Text>
            </View>
          </TouchableOpacity>
          {imageUrl ?
            <Image source={{ uri: imageUrl, }} resizeMode='cover' style={{ width: 100, height: 200, marginTop: 10, borderRadius: 15, borderWidth: 1, }} />
            : null}
          
        </View>
        <TouchableOpacity
          onPress={uploadFile}
          style={{
            height: 40,
            width: 150,
            backgroundColor: "#686868",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            marginTop: 50
          }}
        >
          <Text style={{color: "#fff"}}>Thêm bài hát</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: '#232020'
  },
  btnWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 20,
  },
  orText: {
    color: '#696969'
  },
  viewInput: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#686868",
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    color: '#686868'
  },
  uploadAudio: {
    marginTop: 25,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default BookAddScreen;