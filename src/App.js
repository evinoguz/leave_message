import React, {useState, useEffect} from 'react';
import {View, StatusBar, Provider, Keyboard} from 'react-native';
import {Navigation} from '_/Navigation';
import { observer } from 'mobx-react'; //state yönetim kütüphanesidir.
import {keyboard} from './mobx/keyboard';

const App = observer(() => {
  useEffect(() => {
    // TextInput gibi veri girişi gerektiren durumlarda, kullanıcı klavyeyi kullanırken tasarımdaki kaymaları engellemek için
    // klavyenin yüksekliğine göre tasarlanır.
    Keyboard.addListener('keyboardDidHide', keyboard.close);
    Keyboard.addListener('keyboardDidShow', keyboard.open);
  }, []);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={{flex: 1}}>
        <Navigation />
      </View>
    </>
  );
});

export {App};
