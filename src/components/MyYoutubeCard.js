import React, { Component } from 'react';
import axios from 'axios';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

class MyYoutubeCard extends Component {
  constructor() {
    super();
    this.state = {
      user: false,
    };
  }

  render() {
    const {...props} = this.props;

    return (
        <View style={styles.youtubeCard}>
          <YoutubePlayer
            height={200}
            videoId={this.props.data.title.substring(32)} //https://www.youtube.com/watch?v=1hXYhZaGl0o
            play={this.props.data.index === 0 ? true : false} //ilk videonun otomatik oynaması için
            onError={e => console.log(e)}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  youtubeCard: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 20,
    marginRight: 20,
    marginLeft: 20,
  },
});
export default MyYoutubeCard;