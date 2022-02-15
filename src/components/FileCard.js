import React, { Component, useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Clipboard,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import prettyTime from './PrettyTime';
import {APP_URL, ACCESS_TOKEN} from '_/api';

class FileCard extends Component {
  constructor() {
    super();
    this.state = {
      copiedText: '',
    };
  }
  copyToItem(link) {
    this.setState({loading: true});
    axios
      .get(APP_URL + '/api/get/' + link)
      .then(response => {
        Alert.alert('Uyarı', 'Link copied');
        Clipboard.setString(response.data.link);
      });
  }
  componentDidMount() {
    this.copyToItem();
  }
  fetchCopiedItem = async () => {
    const text = await Clipboard.getString();
    this.setState({copiedText: text});
  };
  render() {
    const {children, style, ...props} = this.props;
    return (
      <TouchableOpacity {...props}>
        {children}
        <View style={styles.listItem}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{ fontSize: 18}}>
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
          {/*<TouchableOpacity style={styles.icon}>
            <Icon
              name="content-paste"
              size={20}
              style={{paddingRight: 5}}
              onPress={() => this.fetchCopiedItem()}
            />
            </TouchableOpacity>*/
            }
          <TouchableOpacity style={styles.icon}>
            <Icon
              name="content-copy"
              size={20}
              style={{paddingRight: 5}}
              onPress={() => this.copyToItem(this.props.data.id)}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
    width: '95%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    width: '95%',
    borderWidth:1,
    borderColor:'#ccc'
  },
});

export default FileCard;
