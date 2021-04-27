import React, { Component, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from "react-native";
import Card from '.././components/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get("screen");
class Rooms extends Component {
    constructor() {
        super();
        this.state = {
            texts: [],
            files: [],
        };
    }

    componentDidMount() {
        axios.get(`https://anonymupload.com/api`)
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
                <ScrollView >
                    {this.renderData()}
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Rooms;