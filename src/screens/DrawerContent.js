import React from 'react';
import { View, StyleSheet, ImageBackground,Image } from 'react-native';
import {
  Text,
  useTheme,
  Drawer,
} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
const image = { uri: "https://media3.s-nbcnews.com/j/newscms/2019_41/3047866/191010-japan-stalker-mc-1121_06b4c20bbf96a51dc8663f334404a899.fit-760w.JPG" };
const profileImage = { uri: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Billykid.jpg" };

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SignIn from './SignIn';

export function DrawerContent(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
            source={image}
            style={{width:undefined,padding:16,paddingTop:50}}
        >
            <Image source={profileImage} style={styles.profile}/>
            <Text style={styles.name}>Bill the Kid</Text>
        </ImageBackground>
    <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="home-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => { props.navigation.navigate('Home') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                name="account-check-outline" 
                color={color}
                  size={size}
                />
              )}
              label="Rooms"
              onPress={() => { props.navigation.navigate('Rooms') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                name="account-check-outline" 
                color={color}
                  size={size}
                />
              )}
              label="Youtubes"
              onPress={() => { props.navigation.navigate('Youtubes') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                name="exit-to-app" 
                color={color}
                  size={size}
                />
              )}
              label="Login"
              onPress={() => { props.navigation.navigate('SignIn') }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  container: {
    flex: 1
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff"
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8
  },
});