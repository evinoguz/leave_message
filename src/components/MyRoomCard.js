import React, { Component, useState } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import prettyTime from './PrettyTime';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Animated from "react-native-reanimated";

class MyRoomCard extends Component {
  constructor() {
    super();
    this.state = {
      user: false,
    };
  }

  render() {
    const {small, shadowless, children, color, style, ...props} = this.props;

    return (
      <TouchableOpacity {...props}>
        {children}
        <Card
          style={[
            styles.listItem,
            this.state.user ? styles.listItemTrue : styles.listItemFalse,
          ]}>
          <Text style={{width: '50%', fontSize: 15}}>
            {this.props.data.title.slice(0, 25)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 40,
              paddingLeft: 70,
              alignItems: 'flex-end',
            }}>
            <Icon name="clock-outline" size={15} style={{paddingRight: 5}} />
            <Text style={{width: '50%', fontSize: 10}}>
              {prettyTime(this.props.data.created_at)}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem: {
        margin: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: '#FFF',
        width: '90%',
        flex: 1,
        flexDirection: 'row',
        borderWidth: 0,
        right: 0,
        minHeight: 50,
        maxHeight: 100,
    },
    listItemTrue: {
        alignSelf: 'flex-end',
        backgroundColor: '#d4fbf2',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    listItemFalse: {
        alignSelf: 'flex-start',
        backgroundColor: '#e8fcc9',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
});
export default MyRoomCard;