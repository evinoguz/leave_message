import React, { Component, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, Alert, ActivityIndicator } from 'react-native';
import Card from '.././components/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import DocumentPicker from 'react-native-document-picker';

const { width, height } = Dimensions.get('screen');

class Home extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            texts: [],
            files: [],
            file: '',
            password: '',
            title: '',
            singleFile: null,
            state: true,
        };
    }

    async openDocumentFile() {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            this.setState({ singleFile: res, state: false });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw "Files error";
            }
        }
    }

    upload = () => {
        if (!this.state.singleFile) {
            Alert.alert('Warning:', 'Please upload a file');
        } else if (!this.state.title) {
            Alert.alert('Warning:', 'Please enter title');
        }
        else if (!this.state.password) {
            Alert.alert('Warning:', 'Saved note in rooms tab');
        }
        else {
            Alert.alert('info:', 'Your file has been uploaded');
        }
        let header = {
            headers: {
                'Content-Type': 'multipart/form-data; ',
            },
        };
        const data = new FormData();
        if (this.state.singleFile) {
            data.append('file', this.state.singleFile);
            data.append('title', this.state.title);
            data.append('password', this.state.password);
        }
        this.setState({ loading: true });
        axios.post(`https://anonymupload.com/api`, data, header)
            .then(response => {
                //alert(response.data.data.id);
                this.getDatas();
                this.setState({
                    file: '',
                    password: '',
                    title: '',
                    singleFile: null,
                    state: true,
                    loading: false,
                    id: '',
                });
            }).catch(e => {
                alert('Error: ');
            });

    };

    getDatas() {
        axios.get(`https://anonymupload.com/api`)
            .then(response => {
                this.setState({
                    texts: response.data.texts,
                    files: response.data.files
                });
            });
    }

    componentDidMount() {
        this.getDatas();

    }

    renderData() {
        var data = this.state.files;
        return data.map((items, Id) =>
            <Card key={Id} data={items} />,
        );
    }

    renderInner = () => (
        <View style={styles.panel}>
            <TextInput secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#cccccc"
                autoCorrect={false}
                style={styles.password}
            />
            <TouchableOpacity
                style={styles.panelButton}>
                <Text style={styles.panelButtonTitle}>Download</Text>
            </TouchableOpacity>
            {/*
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => this.bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
             */}
        </View>
    );

    renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    bs = React.createRef();
    fall = new Animated.Value(1);

    render() {

        return (
            <View style={{ flex: 1, marginTop: 10 }}>
                <BottomSheet
                    ref={this.bs}
                    snapPoints={[330, 0]}
                    renderContent={this.renderInner}
                    renderHeader={this.renderHeader}
                    initialSnap={1}
                    callbackNode={this.fall}
                    enabledGestureInteraction={true}
                />
                <View style={{
                    padding: 20,
                    borderRadius: 20,
                    backgroundColor: '#009387',
                    marginRight: 10,
                    marginLeft: 10,
                }}>
                    <Text>{this.myFile}</Text>
                    <TextInput placeholder="Share a youtube link or any text..." style={styles.input}
                        numberOfLines={10}
                        multiline={true}
                        placeholderTextColor="#cccccc"
                        onChangeText={(title) => this.setState({ title })}
                        value={this.state.title}

                    >
                    </TextInput>

                    <TouchableOpacity style={styles.click} onPress={() => this.openDocumentFile()}>
                        <Icon name="download" size={30} color="#000000" />
                        <Text>
                            Drop file here or click to upload
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'red', textAlign: 'center', fontSize: 12 }}>Share file with password
                        (max:1GB)</Text>
                    <TextInput secureTextEntry={true}
                        autoCorrect={false}
                        placeholder="Password" style={styles.password}
                        placeholderTextColor="#cccccc"
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}

                    >
                    </TextInput>
                    <TouchableOpacity disabled={this.state.state} onPress={() => this.upload()} style={styles.file}>
                        <Text style={styles.panelButtonTitle}>Share Here</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ paddingTop: 20 }}>
                    <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                        <Text>video tıkla</Text>
                    </TouchableOpacity>
                    {this.state.loading ? <ActivityIndicator size="large" color="#009387"></ActivityIndicator> : null}
                    {this.renderData()}
                </ScrollView>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    input: {
        height: 80,
        margin: 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#cccccc',
        textAlignVertical: 'top',
        color: '#5a004b',
        paddingLeft: 10,
    },
    password: {
        marginTop: 15,
        margin: 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#cccccc',
        textAlignVertical: 'top',
        color: '#05375a',
        paddingLeft: 10,

    },
    file: {
        height: 50,
        margin: 8,
        marginBottom: 25,
        alignItems: 'center',
        backgroundColor: '#39bf5a',
        padding: 10,
        borderRadius: 10,
        color: 'white',
    },
    click: {
        height: 80,
        margin: 8,
        alignItems: 'center',
        backgroundColor: '#cccccc',
        padding: 10,
    },
    container: {
        flex: 1,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        height: '100%',

    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#167726',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    card: {
        height: 100,
    },
});

export default Home;
