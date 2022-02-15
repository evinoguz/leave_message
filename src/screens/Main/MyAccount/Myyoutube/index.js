import React, {Component, useState} from 'react';
import axios from 'axios';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import {APP_URL} from '_/api';
import MyYoutubeCard from '_components/MyYoutubeCard';
import {AuthContext} from '_/AuthContext';

class Myyoutube extends Component {
  static contextType = AuthContext;
  constructor() {
    super();
    this.state = {
      youtube: [],
      loading: false,
    };
  }
  getDatas() {
    this.setState({loading: true});
    let access_token = this.context.cookie;
    let header = {
      headers: {
        'Content-Type': 'multipart/form-data; ',
        Authorization: 'Bearer ' + access_token,
      },
    };
    axios
      .get(APP_URL + '/api/my-posts', header)
      .then(response => {
        this.setState({
          youtube: response.data.youtube,
          loading: false,
        });
      })
      .catch(e => {
        this.setState({
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
        {!this.state.youtube ? <Text>no data</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
});

export {Myyoutube};
