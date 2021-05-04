import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from "./screens/DrawerContent";
import Home from "./screens/Home"
import Rooms from "./screens/Rooms"

const Drawer = createDrawerNavigator();

const Main = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Rooms" component={Rooms} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default Main;