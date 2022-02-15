import React, { Component, useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Clipboard,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import prettyTime from './PrettyTime';
import {APP_URL, ACCESS_TOKEN} from '_/api';

class MyFileCard extends Component {
  constructor() {
    super();
    this.state = {
      copiedText: '',
      download_link:'',
    };
  }
  copyToItem(link) {
    Alert.alert('Uyarı', 'Link copied');
    Clipboard.setString(link);
  }
  componentDidMount() {}
  fetchCopiedItem = async () => {
    const text = await Clipboard.getString();
    this.setState({copiedText: text});
  };
  download(id) {
      let header = {
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      };
      const data = new FormData();
      data.append('password', "123456");
      axios
        .post(APP_URL + `/api/` + id + '/password', data, header)
        .then(response => {
          this.setState({
            download_link: response.data.download_link,
          });
          Alert.alert('Warning', 'Do you want to download the file?', [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Download',
              onPress: () => {
                this.loadInBrowser(this.state.download_link);
              },
            },
          ]);
        }
        );
   
  }

  loadInBrowser = url => {
      Linking.openURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Don't know how to open URI: " + url);
        }
      });
  };
  render() {
    const {children, style, ...props} = this.props;
    return (
        <View style={styles.listItem}>
          {children}
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18}}>
                {this.props.data.title.slice(0, 25)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'flex-end',
                paddingTop: 40,
              }}>
              <Text style={{width: '100%', fontSize: 10, textAlign: 'right'}}>
                <Icon name="clock-outline" size={15} />
                {'  ' + prettyTime(this.props.data.created_at)}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.icon}>
            <Icon
              name="download"
              size={25}
              style={{paddingRight: 10}}
              color={'#39bf5a'}
              onPress={() =>
                Alert.alert('Warning', 'Do you want to download the file?', [
                  {text: 'Cancel', style: 'cancel'},
                  {
                    text: 'Download',
                    onPress: () => {
                      this.download(this.props.data.id);
                    },
                  },
                ])
              }
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <Icon
              name="content-copy"
              size={21}
              style={{paddingRight: 5}}
              onPress={() => this.copyToItem(this.props.data.link)}
            />
          </TouchableOpacity>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    margin: 5,
    padding: 10,
    backgroundColor: '#FFF',
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    width: '95%',
    borderWidth:1,
    borderColor:'#ccc'
  },
});

export default MyFileCard;
