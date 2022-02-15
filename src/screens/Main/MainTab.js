import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Home, Rooms, Youtubes,MyAccount} from '_screens';



const HomeStack = createStackNavigator();
const RoomsStack = createStackNavigator();
//const LoginStack = createStackNavigator();
const YoutubesStack = createStackNavigator();
const MyAccountsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: '#009387',
    }}>
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="Rooms"
      component={RoomsStackScreen}
      options={{
        tabBarLabel: 'Notes',
        tabBarColor: '#d02860',
        tabBarIcon: ({color}) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="Youtubes"
      component={YoutubesStackScreen}
      options={{
        tabBarLabel: 'Video Player',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => (
          <Entypo name="folder-video" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="My Account"
      component={MyAccountsStackScreen}
      options={{
        tabBarLabel: 'My Account',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => (
          <MaterialIcons name="my-library-books" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export {MainTab};;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Home',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() =>
              navigation.dispatch(DrawerActions.openDrawer())
            }></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const RoomsStackScreen = ({navigation}) => (
  <RoomsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <RoomsStack.Screen
      name="Rooms"
      component={Rooms}
      options={{
        title: 'Rooms',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() =>
              navigation.dispatch(DrawerActions.openDrawer())
            }></Icon.Button>
        ),
      }}
    />
  </RoomsStack.Navigator>
);

const YoutubesStackScreen = ({navigation}) => (
  <YoutubesStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <YoutubesStack.Screen
      name="Youtubes"
      component={Youtubes}
      options={{
        title: 'Youtubes',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() =>
              navigation.dispatch(DrawerActions.openDrawer())
            }></Icon.Button>
        ),
      }}
    />
  </YoutubesStack.Navigator>
);

const MyAccountsStackScreen = ({navigation}) => (
  <MyAccountsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <MyAccountsStack.Screen
      name="Youtubes"
      component={MyAccount}
      options={{
        title: 'My Posts',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() =>
              navigation.dispatch(DrawerActions.openDrawer())
            }></Icon.Button>
        ),
      }}
    />
  </MyAccountsStack.Navigator>
);
/*const LoginStackScreen = ({ navigation }) => (
  <LoginStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#009387',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <LoginStack.Screen name="Login" component={SignInScreen} options={{
      title:'',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }} />
  </LoginStack.Navigator>
);*/
