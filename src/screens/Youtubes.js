import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Youtubes = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Youtubes Screen</Text>
      </View>
    );
};

export default Youtubes;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});