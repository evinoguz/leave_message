import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const tabs = [
  {title: 'POSTS', name: 'MyPosts'},
  {title: 'NOTES', name: 'MyRooms'},
  {title: 'VİDEOS', name: 'MyYoutubes'},
];

const TabBar = ({state: {index}, navigation: {jumpTo}}) => {
  const item = ({title, name, i}) => (
    <TouchableOpacity
      style={style.tabButton}
      key={i}
      onPress={() => jumpTo(name)}>
      <Text
        style={{
          color: index === i ? '#ccc' : '#93a0a8',
          fontWeight: 'bold',
          paddingHorizontal: 12,
        }}>
        {title}
      </Text>
      <View
        style={{
          height: 3,
          width: '100%',
          backgroundColor: 'white',
          marginTop: 10,
          borderRadius: 10,
          alignSelf: 'center',
          display: index === i ? 'flex' : 'none',
        }}></View>
    </TouchableOpacity>
  );
  return (
    <View style={style.container}>
        {tabs.map((d, i) => item({...d, i}))}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#009387',
  },
  tabButton: {
    paddingVertical: 6,
    marginHorizontal: 30,
  },
});
export {TabBar};
