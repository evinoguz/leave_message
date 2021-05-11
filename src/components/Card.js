import { useNavigation } from '@react-navigation/core';
import React,{useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert} from 'react-native';
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import prettyTime from './PrettyTime';
const Cards = (props) => {
    let input = '';
    const saveUserInput = userInput => {
        input = userInput;
    };

    function id(){
        // {props.data.id}
    }
    return (
        <TouchableOpacity>
            <Text>{input}</Text>
            <Card style={styles.listItem}>
                <Text style={{ width: '50%',fontSize:18}}>
                    {props.data.title.slice(0, 25)}
                </Text>
                <View style={{ flexDirection: 'row',paddingTop:40,paddingLeft:100, alignItems:'flex-end' }}>
                <Icon name="clock-outline" size={15} style={{paddingRight: 5}}/>
                <Text style={{ width: '50%', fontSize:10}} >
                    {prettyTime(props.data.created_at)}
                </Text>
                </View>

            </Card>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    listItem: {
        margin: 10,
        padding: 20,
        backgroundColor: '#FFF',
        width: '95%',
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth:0,
        borderRadius: 5,
      minHeight:100
    },
});
export default Cards;
