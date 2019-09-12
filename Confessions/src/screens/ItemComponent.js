import React, { Component } from 'react';  
import { View, Text, StyleSheet ,  Image,FlatList,TouchableHighlight} from 'react-native';  
import PropTypes from 'prop-types';
import { Card,ListItem,Button } from 'react-native-elements'
import moment from "moment";
import TimeAgo from 'react-native-timeago';
import { Ionicons } from '@expo/vector-icons';

export default class ItemComponent extends Component {  
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          return (
            <View  key={index}>
              <Card containerStyle={{padding: 0,borderRadius: 5,backgroundColor:"#EFF1ED"}} >
              <Text style={{fontSize:18,marginLeft:10,marginTop:10,marginBottom:10}} >{item.messages}</Text>
              {item.image != null ? (
              <Image
              style={{width: 200, height: 200,marginBottom:30,borderRadius: 10,marginLeft:'25%',}}
              source={{uri: item.image}}/>
              ) : (
                null
              )}
              <Text style={{marginBottom:10,marginLeft:'1%',fontSize:12}}> <TimeAgo time={item.date} /></Text>
              </Card>
            </View>
      );
    })
  }
      </View>
    );
  }
}
const styles = StyleSheet.create({  
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10
  },
  itemtext: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'grey',
    padding:20,
    borderBottomColor: '#ff0000',
    borderBottomWidth: 1,
  }
});