import React, {Component, useState} from 'react';
import axios from 'axios';
import {
    View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity,
    TextInput,
} from 'react-native';
import CardNotes from '.././components/CardNotes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Animated from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');

class Rooms extends Component {
    constructor() {
        super();
        this.state = {
            texts: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        axios.get(`https://anonymupload.com/api`)
            .then(response => {
                this.setState({
                    texts: response.data.texts,
                    loading: false,
                });
            });
    }

    renderData() {
        var data = this.state.texts;
        return data.map((items, Id) =>
            <CardNotes key={Id} data={items}/>,
        );
    }
    sendNotes(){
        alert('Evin')
        // axios.post
        this.renderData()
    }
    renderInputForm() {
        return <View>
            <View style={styles.inputStyle}>
                <TextInput style={styles.textBox}
                           placeholderTextColor="#cccccc"
                           multiline={true}
                >

                </TextInput>
                <TouchableOpacity style={styles.click} onPress={() => this.sendNotes()}>
                    <Icon name="send" size={35} color="white"/>

                </TouchableOpacity>
            </View>
        </View>
            ;
    }

    render() {
        return (
            <View style={{flex: 1, marginTop: 10}}>
                <ScrollView
                    style={styles.messagesMainDiv}
                    ref={ref => {
                        this.scrollView = ref;
                    }}
                    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: false})}>
                    {this.state.loading ? <ActivityIndicator size="large" color="#009387"></ActivityIndicator> : null}

                    {this.renderData()}
                </ScrollView>
                <View style={{borderTopColor:'green',borderStyle:'solid'}}>
                    {this.renderInputForm()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputStyle: {
        flexDirection:'row',
        flex: 1,
        padding: 0,
        paddingBottom: 90,
        marginBottom: 10,

    },
    textBox: {
        width: '80%',
        height: 50,
        backgroundColor: 'white',
        margin: 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#cccccc',
        textAlignVertical: 'top',
        color: '#5a004b',
        paddingLeft: 10,
    },
    messagesMainDiv: {
        minHeight: '90%',
    },

    click: {
        height: 50,
        padding: 5,
        borderRadius: 50,
        width:50,
        paddingTop:7,
        margin: 4,
        alignItems: 'flex-end',
        backgroundColor: '#167726'
    },
});

export default Rooms;
