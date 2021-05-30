import React, {Component, useState} from 'react';
import axios from 'axios';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    TextInput,
    Alert,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
import prettyTime from './PrettyTime';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Animated from "react-native-reanimated";

const {width, height} = Dimensions.get('screen');

class CardComponent extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
        };
    }

    render() {
        const {small, shadowless, children, color, style, ...props} = this.props;

        return (
            <TouchableOpacity {...props}>
                {children}
                <Card style={styles.listItem}>
                    <Text style={{width: '50%', fontSize: 15}}>
                        {this.props.data.title.slice(0, 25)}
                    </Text>
                    <View style={{flexDirection: 'row', paddingTop: 40, paddingLeft: 70, alignItems: 'flex-end'}}>
                        <Icon name="clock-outline" size={15} style={{paddingRight: 5}}/>
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
        alignSelf: 'flex-start',
        flexDirection: 'row',
        borderWidth: 0,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius:25,
        right: 0,
        minHeight: 50,
        maxHeight: 100,
    },
    

});

export default CardComponent;
