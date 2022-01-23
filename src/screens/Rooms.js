import React, { Component, useState } from 'react';
import axios from 'axios';
import {
    View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity,
    TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import CardNotes from '.././components/CardNotes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

class Rooms extends Component {
    constructor() {
        super();
        this.state = {
            texts: [],
            loading: false,
            title: '',
        };
    }

    getDatas() {
        this.setState({ loading: true });
        axios.get('https://www.anonymupload.com/api').then(response => {
          this.setState({
            texts: response.data.texts,
            loading: false,
          });
        });
    }

    componentDidMount() {
        this.getDatas();
    }
    sendNotes = () => {
        let header = {
            headers: {
                'Content-Type': 'multipart/form-data; ',
            },
        };
        const data = new FormData();
        data.append('title', this.state.title);
        this.setState({loading: true});
        axios
          .post('https://www.anonymupload.com/api', data, header)
          .then(response => {
            this.getDatas();
            this.setState({
              title: '',
              loading: false,
            });
          })
          .catch(e => {
            this.setState({
              loading: false,
            });
            alert('Error: ');
          });

    };

    renderData() {
        var data = this.state.texts;
        var reverseData=data.reverse();
        return reverseData.map((items, Id) =>
            <CardNotes key={Id} data={items} />,
        );
    }

    renderInputForm() {
        return <View>
            <View style={styles.inputStyle}>
                <TextInput placeholder="Write a note..." style={styles.textBox}
                    placeholderTextColor="#cccccc"
                    multiline={true}
                    onChangeText={(title) => this.setState({ title })}
                    value={this.state.title}
                >

                </TextInput>
                <TouchableOpacity style={styles.click} onPress={() => this.sendNotes()}>
                    <Icon name="send" size={25} color="white" />

                </TouchableOpacity>
            </View>
        </View>
            ;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 12, marginTop: 10 }}>
                    <ScrollView
                        style={styles.messagesMainDiv}
                        ref={ref => {
                            this.scrollView = ref;
                        }}
                        onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: false })}>
                        {this.state.loading ? <ActivityIndicator size="large" color="#009387"></ActivityIndicator> : null}
                        {this.renderData()}
                    </ScrollView>

                </View>
                <View style={styles.inputStyle}>
                    <KeyboardAvoidingView
                        enabled={true}
                        behavior="padding">
                        {this.renderInputForm()}
                    </KeyboardAvoidingView>
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
        height:55,
        flexDirection: 'row',
        flex: 1,
        padding: 0,
        marginBottom: 10,
        alignSelf: 'center',
        alignItems:'center'
    },
    textBox: {
        width: '85%',
        height: 55,
        backgroundColor: 'white',
        margin: 1,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#cccccc',
        textAlignVertical: 'top',
        color: '#5a004b',
        paddingLeft: 10,
    },
    messagesMainDiv: {
        minHeight: '95%',
    },

    click: {
        height: 40,
        padding: 5,
        borderRadius: 50,
        width: 40,
        paddingTop: 7,
        margin: 4,
        alignItems: 'flex-end',
        backgroundColor: '#009387'
    },
});

export default Rooms;
