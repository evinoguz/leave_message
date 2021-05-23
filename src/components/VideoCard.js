import React, { Component, useState } from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import prettyTime from './PrettyTime';
const { width, height } = Dimensions.get("screen");
class VideoCardComponent extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
        };
    }
    render() {
        const { small, shadowless, children, color, data, style, ...props } = this.props;

        return (
            <TouchableOpacity {...props}>
                {children}
            
                <View style={{ marginBottom: 10 }}>
                    <View style={{ width: '100%', height: width * .4, backgroundColor: 'black' }}>
                    </View>
                    <View style={{ margin: 5 }}>
                        <Text style={{
                            fontSize: 18,
                            width: width - 50,
                        }}
                            ellipsizeMode="tail"
                            numberOfLines={2}
                        >{data.title.slice(0, 50)}</Text>
                         <View style={{ flexDirection: 'row', paddingTop: 10, paddingLeft: 1, alignItems: 'flex-end' }}>
                            <Icon name="clock-outline" size={15} style={{ paddingRight: 5 }} />
                            <Text style={{ width: '50%', fontSize: 10 }} >
                                {prettyTime(this.props.data.created_at)}
                            </Text>
                        </View>
                        <Text></Text>
                    </View>
                </View>
            
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default VideoCardComponent;