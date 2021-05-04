import React,{useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, TextInput,} from 'react-native';
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
import prettyTime from './PrettyTime';

const Cards = (props) => {
    let input = '';
    const saveUserInput = userInput => {
        input = userInput;
    };
    return (
        <TouchableOpacity>
            <Text>{input}</Text>
            <Card style={styles.listItem}>
                <Text style={{ width: '50%',fontSize:18}}>
                    {props.data.title.slice(0, 25)}
                </Text>
                <Text style={{ width: '50%',paddingTop:40,paddingLeft:60}} >
                    {prettyTime(props.data.created_at)}
                </Text>

            </Card>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    listItem: {
        margin: 10,
        padding: 20,
        backgroundColor: '#FFF',
        width: '90%',
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 20,
      minHeight:100
    },
});
export default Cards;
