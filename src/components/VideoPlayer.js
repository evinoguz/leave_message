import React, { Component, useState } from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import prettyTime from './PrettyTime';
const { width, height } = Dimensions.get("screen");
class VideoPlayerComponent extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
        };
    }
    render() {
        const { small, shadowless, children, color, style, ...props } = this.props;

        return (
            <TouchableOpacity {...props}>
                {children}
                
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem: {
        margin: 10,
        padding: 20,
        backgroundColor: '#FFF',
        width: '95%',
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth: 0,
        borderRadius: 5,
        minHeight: 100
    },
});

export default VideoPlayerComponent;