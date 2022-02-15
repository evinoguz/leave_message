import React, {Component, useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Linking,
  FlatList,
} from 'react-native';
import MyFileCard from '_components/MyFileCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
//import RNFetchBlob from 'rn-fetch-blob';
//import {AsyncStorage} from '@react-native-async-storage/async-storage';
import {registerCustomIconType} from 'react-native-elements';
//import {APP_URL, ACCESS_TOKEN} from 'react-native-dotenv';
import {APP_URL, ACCESS_TOKEN} from '_/api';
class Mypost extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      files: [],
    };
  }

  getDatas() {
    this.setState({
      loading: true,
    });
   
    let header = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + ACCESS_TOKEN,
      },
    };
    axios
      .get(APP_URL + '/api/my-posts', header)
      .then(response => {
        this.setState({
          loading: false,
          files: response.data.files,
        });
      })
      .catch(e => {
        this.setState({
          loading: false,
        });
      });
  }
  renderData() {
    var data = this.state.files;
    const item = ({item, index}) => (
      <MyFileCard
        key={index}
        data={item}
      />
    );
    return (
      <FlatList
        data={data}
        renderItem={item}
        keyExtractor={(d, i) => i.toString()}
      />
    );

  }
  componentDidMount() {
    this.getDatas();
  }

  render() {
    return (
      <View style={{flex: 1, marginTop: 10}}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#009387"></ActivityIndicator>
        ) : null}
        {this.renderData()}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export {Mypost};
