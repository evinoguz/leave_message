import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
// "Drawer" menüsündeki sayfalara erişmek için sayfaların yolu belirtilir. 
import {SignIn, SignUp, Home, Rooms, Youtubes,DrawerContent} from '_screens';

const Drawer = createDrawerNavigator();

const DrawerItem = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Rooms" component={Rooms} />
    <Drawer.Screen name="Youtubes" component={Youtubes} />
    <Drawer.Screen name="SignIn" component={SignIn} />
    <Drawer.Screen name="SignUp" component={SignUp} />
  </Drawer.Navigator>
);

export {DrawerItem};
