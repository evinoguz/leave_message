import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Rooms = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Rooms Screen</Text>
      </View>
    );
};

export default Rooms;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});