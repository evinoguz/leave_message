import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'; //@react-navigation: Modül olarak çalışır.
//Sekmelere dokunarak veya yatay olarak kaydırarak sayfalar arasında geçiş yapmanyı sağlar.

//import {TabBar, MyRooms, MyPosts, MyYoutubes} from '_/screens/Main/MyAccount'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {TabBar} from '_/screens/Main/MyAccount/TabBar';
import {Home} from '_screens';
import {Bugun} from '_/screens/Main/MyAccount/Bugun';
import {Mypost} from '_/screens/Main/MyAccount/Mypost';
import {Myroom} from '_/screens/Main/MyAccount/Myroom';
import {Myyoutube} from '_/screens/Main/MyAccount/Myyoutube';


const Tab = createMaterialTopTabNavigator();

const MyAccount = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      {/*
         initialRouteName: Navigatörün ilk yüklemesinde oluşturulacak başlangıç sayfası belirler. 
        name deki değerleri tabBara gönderip stil verir.
        component de belirtilen sayfa açılır
        */}
      <Tab.Navigator tabBar={TabBar}>
        <Tab.Screen name={'MyPosts'} component={Mypost} />
        <Tab.Screen name={'MyRooms'} component={Myroom} />
        <Tab.Screen name={'MyYoutubes'} component={Myyoutube} />
      </Tab.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  
});
export {MyAccount};
