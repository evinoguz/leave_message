import React, { Component, useState } from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import prettyTime from './PrettyTime';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get("screen");
class VideoPlayerComponent extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
        };
    }
    render() {
        return (

                <View style={{
                    flex: 1,
                    marginTop: 10
                }}>
                    <View style={{
                        width: "100%",
                        height: 200
                    }}>
                        <WebView
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            source={{ uri: `https://www.youtube.com/watch?v=4ExxzX1A9gM&list=LL&index=3` }} />

                    </View>
                    <Text style={{
                        fontSize: 20,
                        width: width - 50,
                        margin: 9
                    }}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {title}
                    </Text>
                    <View
                        style={{ borderBottomWidth: 1 }}
                    />
                </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default VideoPlayerComponent;