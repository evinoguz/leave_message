import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Login = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Login Screen</Text>
      </View>
    );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});