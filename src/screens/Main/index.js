import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MainTab} from '_/screens/Main/MainTab'
import {DrawerContent} from '_/screens/Main/DrawerContent';
import { SignIn, SignUp} from '_screens';

const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    <SafeAreaProvider>
      {
        // Ekranlar arasında gezinmek için soldan veya sağdan açılan menü oluşturmak için "Drawer" kullanıldı.
      }
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="MainTab" component={MainTab} />
        <Drawer.Screen name="SignIn" component={SignIn} />
        <Drawer.Screen name="SignUp" component={SignUp} />
      </Drawer.Navigator>
    </SafeAreaProvider>
  );
};
export {Main};
