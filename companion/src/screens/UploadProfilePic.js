import { useState, useContext } from 'react';
import useAxios from '../shared/hooks/useAxios';
import mime from 'mime';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { AuthContext } from '../shared/context/AuthContext';
import Button from '../components/Button';

const UploadProfilePic = ({ navigation: { navigate } }) => {
  const authContext = useContext(AuthContext);

  const { fetchData, loading, error, clearError } = useAxios();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('id', authContext.user._id);

    const imageData = {
      name: image.uri.split('/').pop(),
      uri: image.uri,
      type: mime.getType(image.uri),
    };

    formData.append('image', imageData);

    await fetchData({
      url: '/users/upload',
      method: 'POST',
      data: formData,
      headers: { 'content-type': 'multipart/form-data', accept: 'application/json' },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image && <Image source={{ uri: image.uri }} style={{ height: 150, width: 150 }} />}
        <Text>pick Image</Text>
      </TouchableOpacity>
      <Button onPress={handleSubmit}>Upload</Button>
      <Button onPress={() => navigate('home')} outline={true}>
        Skip
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  imagePicker: {
    height: 150,
    width: 150,
    borderRadius: 500,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
  },
});

export default UploadProfilePic;
