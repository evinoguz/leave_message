import React, { Component, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, BottomSheet } from "react-native";
import Card from '.././components/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppIntroSlider from 'react-native-app-intro-slider';

const { width, height } = Dimensions.get("screen");

class Home extends Component {
    constructor() {
        super();
        this.state = {
            texts: [],
            files: [],
        };
    }
    componentDidMount() {
        axios.get(`https://recepgumus.com/api`)
            .then(response => {
                this.setState({ texts: response.data.texts, files: response.data.files });
            })
    }
    renderData() {
        var data = this.state.texts.concat(this.state.files)
        return data.map((items, Id) =>
            <Card key={Id} data={items} />
        );
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 10 }}>
                <View>
                    <TextInput placeholder="Share a youtube link or any text..." style={styles.input}
                        numberOfLines={10}
                        multiline={true}
                        placeholderTextColor="#cccccc"
                    >
                    </TextInput>

                    <TouchableOpacity style={styles.click}>
                        <Icon name="download" size={30} color="#000000" />
                        <Text>
                            Drop file here or click to upload
                    </Text>
                    </TouchableOpacity>
                    <Text style={{ color: "red", textAlign: "center", fontSize: 12 }}>Share file with password (max:1GB)</Text>
                    <TextInput placeholder="Password" style={styles.password}
                        placeholderTextColor="#cccccc"
                    >
                    </TextInput>
                    <TouchableOpacity disabled={true} style={styles.file}>
                        <Text>Share Here </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView >
                    {this.renderData()}
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    input: {
        height: 80,
        margin: 8,
        borderWidth: 1,
        textAlignVertical: 'top'
    },
    password: {
        marginTop: 15,
        margin: 8,
        borderWidth: 1,
        textAlignVertical: 'top'
    },
    file: {
        height: 50,
        margin: 8,
        marginBottom: 25,
        alignItems: "center",
        backgroundColor: "#39bf5a",
        padding: 10,
    },
    click: {
        height: 80,
        margin: 8,
        alignItems: "center",
        backgroundColor: "#cccccc",
        padding: 10,

    },
});

export default Home;