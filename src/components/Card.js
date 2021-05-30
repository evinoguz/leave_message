import React, { Component, useState } from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import prettyTime from './PrettyTime';
const { width, height } = Dimensions.get("screen");
class CardComponent extends Component {
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
                    <Card style={styles.listItem}>
                        <Text style={{ width: '50%', fontSize: 18 }}>
                            {this.props.data.title.slice(0, 25)}
                        </Text>
                        <View style={{ flexDirection: 'row', paddingTop: 40, paddingLeft: 70, alignItems: 'flex-end' }}>
                            <Icon name="clock-outline" size={15} style={{ paddingRight: 5 }} />
                            <Text style={{ width: '50%', fontSize: 10 }} >
                                {prettyTime(this.props.data.created_at)}
                            </Text>
                        </View>

                    </Card>
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
        borderWidth:0,
        borderBottomWidth:2,
        borderBottomColor:'#009387',
        borderRightWidth:2,
        borderRightColor:'#009387',
        borderRadius: 5,
      minHeight:100
    },
});

export default CardComponent;
