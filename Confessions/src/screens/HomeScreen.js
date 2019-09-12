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
  Picker,
  StatusBar
} from 'react-native';
import { WebBrowser, NavigationControlsAndroid  } from 'expo';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import React, { Component } from 'react';  
import { Dropdown } from 'react-native-material-dropdown';
import { MonoText } from '../components/StyledText';
import ItemComponent from '../screens/ItemComponent';
import { Ionicons } from '@expo/vector-icons';

import { db } from '../config';
    const data = [{
      value: 'sheridan',
    }, {
      value: 'mcmaster',
    }, ];


export default class HomeScreen extends Component {
    state = {
    items: [],
    count :1
  };

  static navigationOptions = {
         title: 'Home',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#84DCC6',
          },
          headerTitleStyle: {
            fontSize: 18,
          }
  };
  
  componentDidMount() {
    this.loadItems(data[0].value)
  }

  onChangeHandler = (schools) => {
    this.loadItems(schools)
  };

  loadItems =(schools) => {
    let itemsRef = db.ref('/' + schools);
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data).reverse();
      this.setState({ items });
    });
  }
  
  render() {
      return (
      <ScrollView style={{flex: 1,backgroundColor: '#ffffff',padding:'2%'}}>
          <Dropdown
            label='Schools'
            data={data}
            value = "sheridan"
            onChangeText={(schools) => this.onChangeHandler(schools)}/>
      <View style={styles.container1}>
        {this.state.items.length > 0 ? (
          <TouchableHighlight>
          <ItemComponent items={this.state.items} />
            </TouchableHighlight>
        ) : (
          <Text>No items</Text>
        )}
      </View>
      </ScrollView>
    );
  }
}
 



const styles = StyleSheet.create({
  buttonText: {
  fontSize: 18,
  color: 'white',
  alignItems: 'center',
  padding:7,
},
  button: {
  borderRadius: 20, 
  marginTop:10,
  marginLeft:10, 
  marginRight: 10, 
  marginBottom: 10,
  height:40,
  flexDirection: 'row',
  backgroundColor: '#84DCC6',
  borderColor: '#84DCC6',
},
scrollView: {
    backgroundColor: '#6A85B1',
    flex: 1,
  },
  flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch'
},
    container1: {
    flex: 1,
    
  },
});
