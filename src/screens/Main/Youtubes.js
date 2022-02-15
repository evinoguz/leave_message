import React, {Component, useState} from 'react';
import axios from 'axios';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {APP_URL} from '_/api';
import YoutubeCard from '_components/YoutubeCard';

class Youtubes extends Component {
  constructor() {
    super();
    this.state = {
      youtube: [],
      loading: false,
    };
  }
  getDatas() {
    this.setState({loading: true});
    axios.get(APP_URL + '/api').then(response => {
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
    const item = ({item, index}) => <YoutubeCard key={index} data={item} />;
    return (
      <FlatList
        data={data}
        renderItem={item}
        keyExtractor={(d, i) => i.toString()}
      />
    );

    /* return data.map((items, Id) =>
            <View style={styles.youtubeCard}>
                <YoutubePlayer
                    height={200}
                    videoId={items.title.substring(32)} //https://www.youtube.com/watch?v=1hXYhZaGl0o
                    play={Id === 0 ? true : false} //ilk videonun otomatik oynaması için
                    onError={e => console.log(e)}
                />
            </View>,
        );*/
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
  container: {
    flex: 1,
  },
});

export {Youtubes};
