import React from 'react';
import { View, StyleSheet, ImageBackground,Image, Alert } from 'react-native';
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

// Soldan veya sağdan açılan menüyu açmal için: navigation.openDrawer(), 
// kapatmak için navigation.closeDrawer() komutu kullanıldı.

export function DrawerContent(props) {
  return (
    <View style={styles.container}>
      {
        // Belirtilen alana resim tanımlandı. Resmin stili verildi.
      }
      <ImageBackground
        source={image}
        style={{width: undefined, padding: 16, paddingTop: 50}}>
        <Image source={profileImage} style={styles.profile} />
        <Text style={styles.name}>Bill the Kid</Text>
      </ImageBackground>

      <DrawerContentScrollView {...props}>
        {
          // Açılır menünün elemanlarının rengini, yazı boyutunu ve yazı tipini gibi stiller verildi.
        }
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Rooms"
              onPress={() => {
                props.navigation.navigate('Rooms');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Youtubes"
              onPress={() => {
                props.navigation.navigate('Youtubes');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="login" color={color} size={size} />
              )}
              label="SignIn"
              onPress={() => {
                props.navigation.navigate('SignIn');
              }}
            />
            {/*<DrawerItem
              icon={({color, size}) => (
                <Icon name="exit-to-app" color={color} size={size} />
              )}
              label="logout"
              onPress={() =>
                Alert.alert('Warning', 'Are you sure you want to sign out?', [
                  {text: 'Cancel', style: 'cancel'},
                  {
                    text: 'Yes',
                    onPress: () => {
                      props.navigation.navigate('SignIn');
                    },
                  },
                ])
              }
            />*/
            }
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Text style={styles.version}>version 1.2</Text>
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
    flex: 1,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  version: {
    color: '#cccc',
    textAlign:'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});