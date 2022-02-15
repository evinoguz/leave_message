import React, {Component, useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import {API_URL} from '_/api';

class SignUp  extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      access_token:'',
      name:'',
      email:'',
      password:'',
      loading: false,
    };
  }

  register() {
    let header = {
      headers: {
        'Content-Type': 'multipart/form-data; ',
      },
    };
    const data = new FormData();
    data.append('name', this.state.name);
    data.append('email', this.state.email);
    data.append('password', this.state.password);
    this.setState({loading: true});
    axios
      .post(API_URL + '/register', data, header)
      .then(response => {
        this.setState({
          user: response.data.user,
          access_token: response.data.access_token,
          loading: false,
        });
        if (this.state.user) {
          alert('Info: Account created. Please login');
          this.props.navigation.navigate('SignIn');
        } else {
          alert('Warning: Email already exists.');
        }
        
      })
      .catch(e => {
        this.setState({
          loading: false,
        });
        alert('Error: Please check your data');
        
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 25,
                },
              ]}>
              Name
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Name"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={name => this.setState({name})}
              />
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 25,
                },
              ]}>
              Email
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Email"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={email => this.setState({email})}
              />
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 25,
                },
              ]}>
              Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                secureTextEntry={true}
                placeholder="Your Password"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={password => this.setState({password})}
              />
            </View>

            <View style={styles.button}>
              <TouchableOpacity style={styles.signIn} onPress={() => {this.register()}}>
                <LinearGradient
                  colors={['#08d4c4', '#01ab9d']}
                  style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Sign Up
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('SignIn');
                }}
                style={[
                  styles.signIn,
                  {
                    borderColor: '#009387',
                    borderWidth: 1,
                    marginTop: 15,
                  },
                ]}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#009387',
                    },
                  ]}>
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Home');
                }}
                style={[
                  styles.signIn,
                  {
                    borderColor: '#009387',
                    borderWidth: 1,
                    marginTop: 15,
                  },
                ]}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#009387',
                    },
                  ]}>
                  Guest Login
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }
}

export {SignUp};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
});