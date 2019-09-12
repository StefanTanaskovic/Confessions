import React from 'react';
import { MapView } from 'expo';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableHighlight,
  Alert,
  CameraRoll
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { Constants, ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import * as firebase from 'firebase';
import { ExpoLinksView } from '@expo/samples';
import { db } from '../config';
import moment from "moment";

console.disableYellowBox = true;
//Used this github example to implemment expo camera and sending it to the firebase
//https://github.com/expo/firebase-storage-upload-example
const url =
  'https://firebasestorage.googleapis.com/v0/b/blobtest-36ff6.appspot.com/o/Obsidian.jar?alt=media&token=93154b97-8bd9-46e3-a51f-67be47a4628a';

let addItem = (item,school1,image,date) => {  
  db.ref(school1).push({
    messages: item,
    image: image,
    date: date,
  });
  image = ""
};

export default class LinksScreen extends React.Component {
    state = {
    messages: '',
    image: null,
    uploading: false,
    date:'',
  };
    async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  };
    handleChange = e => {
    this.setState({
      messages: e.nativeEvent.text
    });
  };
  
  handleSubmit = (school1,image) => {
    var finalDate = moment().format();
    if (this.state.messages == ""){
      Alert.alert(
        'Post has not been sent',
        'Please fill text box',
      [
        {text: 'OK'},
      ],
      {cancelable: false}
      );
      }else{
          addItem(this.state.messages,school1,image,finalDate);
          Alert.alert(
            'Post has been sent',
            'Check Home to see post',
            [
              {text: 'OK'},
            ],
            {cancelable: false}
          );
        this.state.image = null;
      }
  };

  static navigationOptions = {
         title: 'Post',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#84DCC6',
          },
          headerTitleStyle: {
            fontSize: 18,
          },
  };
      
  render() {
   let { image } = this.state;
    return (
      
      <View style={StyleSheet.absoluteFill}>      
        <View style={styles.flowRight}>
        <TextInput
          style={styles.searchInput}
          placeholder='New Post'
          onChange={this.handleChange}
          clearButtonMode='while-editing'/>
    
        <TouchableHighlight
         style={styles.button1}
          onPress={this._pickImage}>
         <Ionicons name="md-photos" color="white" size={18} />
          </TouchableHighlight>
        <TouchableHighlight
         style={styles.button1}
          onPress={this._takePhoto}  >
         <Ionicons name="md-camera" color="white" size={18} />
          </TouchableHighlight>
      </View>
    <ScrollView style={{flex: 1}} >

      <Card title='Sheridan College'  containerStyle={{borderRadius: 20,backgroundColor:"#EFF1ED"}}>
        <TouchableHighlight
         style={styles.button}
         onPress={() => this.handleSubmit("/sheridan",image)}>
           <Text style={styles.buttonText}>Post</Text>
          </TouchableHighlight>
      </Card>
      <Card title='McMaster University' containerStyle={{borderRadius: 20,backgroundColor:"#EFF1ED"}}>
        <TouchableHighlight
         style={styles.button}
         onPress={() => this.handleSubmit("/mcmaster",image)}>
           <Text style={styles.buttonText}>Post</Text>
          </TouchableHighlight>
        </Card>
        </ScrollView>

      </View>
    );
  }


   _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);
  blob.close();
  return await snapshot.ref.getDownloadURL();
}
  

const schools = [
 {
    name: '/Sheridan',
 },
 {
    name: '/McMaster',
 },
]

const styles = StyleSheet.create({
scrollView: {
    backgroundColor: '#6A85B1',
    flex: 1,
  },
  container: {
    height: 201,
    flex: 1,
    padding:4
  },
  flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch'
    
},
buttonText: {
  fontSize: 18,
  color: 'white',
  alignItems: 'center',
  padding:10,
},
button: {
  borderRadius: 20, 
  marginLeft: 0, 
  marginRight: 0, 
  marginBottom: 0,
  height:40,
  flexDirection: 'row',
  backgroundColor: '#84DCC6',
  borderColor: '#84DCC6',
},button1: {
  padding:10,
  borderRadius: 100, 
  marginLeft: 5, 
  marginRight: 5, 
  marginBottom: 5,
  marginTop:5,
  flexDirection: 'row',
  backgroundColor: '#84DCC6',
  borderColor: '#84DCC6',
},
searchInput: {
  height: 36,
  marginRight: 5,
  flex: 4,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#84DCC6',
  borderRadius: 8,
  color: '#84DCC6'
}
});
