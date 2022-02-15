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
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from 'react-native-paper';
import {API_URL} from '_/api';
import {AuthContext} from '_/AuthContext'
class SignIn extends Component {
  static contextType=AuthContext;
  constructor() {
    super();
    this.state = {
      user: {},
      access_token: '',
      name: '',
      email: '',
      password: '',
      loading: false,
    };
  }
  
  getUser() {
    this.setState({loading: true});
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
      .post(API_URL + '/login', data, header)
      .then(response => {
        this.setState({
          user: response.data.user,
          access_token: response.data.access_token,
          loading: false,
        });
        if (this.state.user) {
          const authUser = {
            email: this.state.user.email,
            name: this.state.user.name,
          };
          this.context.toggleAuth(authUser);
          this.context.toggleCookie(this.state.access_token);
          alert(this.state.user.name + ', session opened successfully.');
          this.props.navigation.navigate('Home');
        } else {
          alert('Error: Email or password is incorrect');
          this.setState({
            loading: false,
          });
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
          email: '',
          password: '',
        });
      });
  }

  login() {
    if (!this.state.email) {
      alert('Warning: Please enter your Email.');
    } else if (!this.state.password) {
      alert('Warning: Please enter Password.');
    } else {
      this.getUser();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
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
              value={this.state.email ? this.state.email : ''}
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
              value={this.state.password ? this.state.password : ''}
              onChangeText={password => this.setState({password})}
            />
          </View>

          <TouchableOpacity>
            <Text style={{color: '#009387', marginTop: 15}}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <TouchableOpacity
              disabled={this.state.loading}
              style={styles.signIn}
              onPress={() => {
                this.login();
              }}>
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
                  {this.state.loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    'Sign In'
                  )}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignUp')}
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
                Sign Up
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
        </Animatable.View>
      </View>
    );
  }
}

export {SignIn};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
});
