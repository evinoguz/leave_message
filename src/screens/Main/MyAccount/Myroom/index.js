import React, {Component, useState} from 'react';
import axios from 'axios';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import MyRoomCard from '_components/MyRoomCard';
import {APP_URL} from '_/api';
import {AuthContext} from '_/AuthContext';
class Myroom extends Component {
  static contextType = AuthContext;
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
    let access_token = this.context.cookie;
    let header = {
      headers: {
        'Content-Type': 'multipart/form-data; ',
        'Authorization': 'Bearer ' + access_token,
      },
    };
    axios
      .get(APP_URL + '/api/my-posts', header)
      .then(response => {
        this.setState({
          texts: response.data.texts,
          loading: false,
        });
        if (!this.state.texts) {
          Alert.alert('Warning', 'You have no posts');
        }
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
          {!this.state.texts ? <Text>no data</Text> : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export {Myroom};
