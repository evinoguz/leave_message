import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Splash = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color: '#009387',
        fontSize: 20,
      }}>
        {// "react-native-vector-icons" kütüphanesi kullanılarak istenilen icon seçildi, iconun rengi, boyutu ayarlandı. 
        }
      <FontAwesome name={'check'} color={'#009387'} size={170} />
      <Text
        style={{
          color: '#009387',
          fontSize: 30,
        }}>
        Leave Message
      </Text>
    </View>
  );
};
export {Splash};
