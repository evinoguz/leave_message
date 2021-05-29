import React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from "./src/screens/DrawerContent";
import MainTab from "./src/screens/MainTab";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";

const Drawer = createDrawerNavigator();
const App = () => {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTab} />
        <Drawer.Screen name="SignIn" component={SignIn} />
        <Drawer.Screen name="SignUp" component={SignUp} />

      </Drawer.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
  }

export default App;
