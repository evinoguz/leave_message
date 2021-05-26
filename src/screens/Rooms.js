import React, { Component, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import Card from '.././components/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get("screen");
class Rooms extends Component {
    constructor() {
        super();
        this.state = {
            texts: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get(`https://anonymupload.com/api`)
            .then(response => {
                this.setState({
                    texts: response.data.texts,
                    loading: false,
                });
            })
    }
    renderData() {
        var data = this.state.texts;
        return data.map((items, Id) =>
            <Card key={Id} data={items} />
        );
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 10 }}>
                <ScrollView >
                    {this.state.loading ? <ActivityIndicator size="large" color="#009387"></ActivityIndicator> : null}
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