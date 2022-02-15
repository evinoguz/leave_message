import React, {Component, useState} from 'react';
import {Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Main, Splash} from '_screens';
import {AuthProvider} from '_/AuthContext';

const STACK1 = createStackNavigator();
class Navigation extends Component {
  constructor() {
    super();
  
    this.toggleAuth = user => {
      this.setState(state => ({
        auth: user,
      }));
    };

    this.toggleCookie = token => {
      this.setState(state => ({
        cookie: token,
      }));
    };

    this.state = {
      auth: {
        email: '',
        name: '',
      },
      cookie: null,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      toggleAuth: this.toggleAuth,
      toggleCookie: this.toggleCookie,
      showSplash: true,
    };
  }
  componentDidMount() {
    setTimeout(() => this.setState({showSplash: false}), 1000);
  }
  render() {
    return (
      <AuthProvider value={this.state}>
        <NavigationContainer>
          <STACK1.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {
              // "showSplash" değişkeninin ilk değeri true olduğu için Splash isimli sayfa gelecektir.
              // Bir kaç saniye sonra "showSplash" değişkeninin değeri false olacağı için Main sayfasına yönlendirecektir.
            }
            <STACK1.Screen
              name={this.state.showSplash ? 'Splash' : 'Main'}
              component={this.state.showSplash ? Splash : Main}
            />
          </STACK1.Navigator>
        </NavigationContainer>
      </AuthProvider>
    );
  }
}

export {Navigation};
