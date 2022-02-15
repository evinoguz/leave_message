import React, {Component, useState} from 'react';
import axios from 'axios';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import MyRoomCard from '_components/MyRoomCard';
import {APP_URL, ACCESS_TOKEN} from '_/api';

class Myroom extends Component {
  constructor() {
    super();
    this.state = {
      texts: [],
      loading: false,
      title: '',
    };
  }

  getDatas() {
    this.setState({loading: true});
     let header = {
       headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + ACCESS_TOKEN,
       },
     };
     axios.get(APP_URL + '/api/my-posts', header)
     .then(response => {
       this.setState({
         texts: response.data.texts,
         loading: false,
       });
     });
  }

  componentDidMount() {
    this.getDatas();
  }

  renderData() {
    var data = this.state.texts;
    const item = ({item, index}) => <MyRoomCard key={index} data={item} />;
    return (
      <FlatList
        data={data}
        renderItem={item}
        keyExtractor={(d, i) => i.toString()}
      />
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 12, marginTop: 10}}>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#009387"></ActivityIndicator>
          ) : null}
          {this.renderData()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export {Myroom};
