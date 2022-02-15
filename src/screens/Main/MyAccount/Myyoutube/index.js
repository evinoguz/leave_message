import React, {Component, useState} from 'react';
import axios from 'axios';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {APP_URL, ACCESS_TOKEN} from '_/api';
import MyYoutubeCard from '_components/MyYoutubeCard';

class Myyoutube extends Component {
  constructor() {
    super();
    this.state = {
      youtube: [],
      loading: false,
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
         youtube: response.data.youtube,
         loading: false,
       });
     });
  }

  componentDidMount() {
    this.getDatas();
  }

  renderData() {
    var data = this.state.youtube;
    const item = ({item, index}) => <MyYoutubeCard key={index} data={item} />;
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
      <View style={{flex: 1, marginTop: 10}}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#009387"></ActivityIndicator>
        ) : null}
        {this.renderData()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
});

export {Myyoutube};
