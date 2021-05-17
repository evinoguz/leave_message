import React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from "./src/screens/DrawerContent";
import MainTab from "./src/screens/MainTab";

const Drawer = createDrawerNavigator();
const App = () => {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTab} />
      </Drawer.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
  }

export default App;
