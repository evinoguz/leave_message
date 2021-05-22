import React, { Component, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, ActivityIndicator } from "react-native";
import VideoPlayer from '.././components/VideoPlayer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get("screen");
class Youtubes extends Component {
  constructor() {
    super();
    this.state = {
      youtubes: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get(`https://anonymupload.com/api`)
      .then(response => {
        this.setState({
          youtubes: response.data.youtubes,
          loading: false,
        });
      })
  }
  renderData() {
    var data = this.state.youtubes;
    return data.map((items, Id) =>
    <VideoPlayer key={Id} data={items} />
    );
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        <ScrollView >
          {this.state.loading ? <ActivityIndicator size="large" color="#009387"></ActivityIndicator> : null}
          {}
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Youtubes;