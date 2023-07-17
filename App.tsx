
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Button, SafeAreaView, NativeModules,Image } from 'react-native'



import { launchImageLibrary } from 'react-native-image-picker';


const App = () => {
  const [files, setFiles] = useState([]);

 

  const getFiles = () => {
    axios.get('http://172.24.160.1:3000/api/images')
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  };
  const [file, setfile] = useState<any>({})
  const renderFiles = () => {
    return files.map((file:any) => (
    
      <Image
      key={file.filename}
      source={{ uri: file.url }}
      style={{ width: 100, height: 100 }}
    />
    ));
  };

  const upload = () => {
    launchImageLibrary({
      mediaType: 'photo'
    }, setfile);
  };

  const postFile = () => {
    const formData = new FormData();
    formData.append('profileImg', {
      uri: file.assets[0].uri,
      name: file.assets[0].fileName,
      type: file.assets[0].type,
    });
    formData.append('userId', 3);

    axios.post('http://192.168.100.27:3000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  return (
    <View style={{ backgroundColor: 'red' }}>
      <Button title='Upload' onPress={upload} />
      <Button title='POST' onPress={postFile} />
      <Button title='GET' onPress={getFiles} />
      {renderFiles()}
    </View>
  );
};

export default App;