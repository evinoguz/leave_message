import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Main, Splash} from '_screens';

const STACK1 = createStackNavigator();

const Navigation = () => {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
  }, []);

  return (
    <NavigationContainer>
      <STACK1.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        { // "showSplash" değişkeninin ilk değeri true olduğu için Splash isimli sayfa gelecektir.
          // Bir kaç saniye sonra "showSplash" değişkeninin değeri false olacağı için Main sayfasına yönlendirecektir. 
        }
        <STACK1.Screen
          name={showSplash ? 'Splash' : 'Main'}
          component={showSplash ? Splash : Main}
        />
      </STACK1.Navigator>
    </NavigationContainer>
  );
};
export {Navigation};
