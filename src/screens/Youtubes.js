import React, { Component, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated from 'react-native-reanimated';
import YoutubePlayer from "react-native-youtube-iframe";

const { width, height } = Dimensions.get("screen");
class Youtubes extends Component {
    constructor() {
        super();
        this.state = {
            youtubes: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get(`https://anonymupload.com/api`)
            .then(response => {
                this.setState({
                    youtubes: response.data.youtubes,
                    loading: false,
                });
            })

    }
    renderData() {
        var data = this.state.youtubes;
        return data.map((items, Id) =>
            <View style={{ padding: 30, backgroundColor: '#141430', marginBottom: 20 }}>
                <YoutubePlayer
                    height={200}
                    videoId={items.title.substring(32)} //https://www.youtube.com/watch?v=1hXYhZaGl0o
                    play={Id === 0 ? true : false} //ilk videonun otomatik oynaması için
                    onError={e => console.log(e)}
                />
            </View>
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

export default Youtubes;