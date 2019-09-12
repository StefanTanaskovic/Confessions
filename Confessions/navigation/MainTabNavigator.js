import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import TabBarIcon from '../src/components/TabBarIcon';
import HomeScreen from '../src/screens/HomeScreen';
import LinksScreen from '../src/screens/LinksScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
                    <Ionicons
                        name={'md-paper-plane'}
                        size={30}
                        style={{ color: focused ? '#001021' : '#EFF1ED'}}	
                    />
                ),
  tabBarOptions: {
      activeTintColor: '#001021',
      inactiveTintColor: '#000000',
    style: {
        backgroundColor: '#84DCC6',
      }
    },
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Post',
  tabBarIcon: ({ focused }) => (
                    <Ionicons
                        name={'md-create'}
                        size={30}
                        style={{ color: focused ? '#001021' : '#EFF1ED'}}	
                    />
                ),
  tabBarOptions: {
      activeTintColor: '#001021',
      inactiveTintColor: '#000000',
        style: {
        backgroundColor: '#84DCC6',
      }
    },
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
});
