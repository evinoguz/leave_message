import React, {Component, useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import FileCard from '_components/FileCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import DocumentPicker from 'react-native-document-picker';
//import RNFetchBlob from 'rn-fetch-blob';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import {registerCustomIconType} from 'react-native-elements';
import {APP_URL} from '_/api';
import {AuthContext} from '_/AuthContext';
class Home extends Component {
  static contextType = AuthContext;
  constructor() {
    super();
    this.state = {
      loading: false,
      files: [],
      password: '',
      title: '',
      singleFile: null,
      download_link: '',
      password_Download: '',
      id: '',
      removestate: true,
      removeMessage: '',
      sayac: 1,
      time: 180,
      timerstate: false,
      copiedText: '',
    };
  }

  async openDocumentFile() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      this.setState({singleFile: res});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }

  upload = () => {
    let access_token = this.context.cookie;
    let header=null;
    if(access_token){
      header = {
        headers: {
          'Content-Type': 'multipart/form-data; ',
          'Authorization': 'Bearer ' + access_token,
        },
      };
    }
    else{
      header = {
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      };
    }
    /*let header = {
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      };*/

    const data = new FormData();
    data.append('file', this.state.singleFile);
    data.append('title', this.state.title);
    data.append('password', this.state.password);
    this.setState({loading: true});
    axios
      .post(APP_URL + '/api', data, header)
      .then(response => {
        //alert(response.data.data.id);
        this.getDatas();
        this.setState({
          password: '',
          title: '',
          singleFile: '',
          loading: false,
          id: '',
        });
      })
      .catch(e => {
        this.setState({
          loading: false,
        });
        alert('Error: ');
      });
  };

  getDatas() {
    this.setState({
      loading: true,
    });
    axios
      .get(APP_URL + '/api')
      .then(response => {
        this.setState({
          loading: false,
          files: response.data.files,
        });
      })
      .catch(e => {
        this.setState({
          loading: false,
        });
        alert('Error: ');
      });
  }

  componentDidMount() {
    this.getDatas();
  }
  update = () => {
    if (this.state.time === 0) {
      this.setState({
        sayac: 1,
        timerstate: false,
      });
    } else {
      this.setState({
        time: this.state.time - 1,
      });
    }
  };

  secondsToMinutes = time => {
    if (this.state.time === 0) {
      this.setState({
        sayac: 1,
        timerstate: false,
        time: 180,
      });
    }
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return (
      (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    );
  };

  cardBottomSheet(value) {
    if (value > 0) {
      this.setState({
        password_Download: '',
        download_link: '',
        id: value,
        removestate: true,
      });
      this.bs.current.snapTo(0);
    }
  }

  download(id) {
    if (this.state.password_Download) {
      if (this.state.sayac === 4) {
        this.setState({
          time: 180,
          timerstate: true,
        });

        Alert.alert('Error', 'Please wait...');
        const timer = setInterval(() => this.update(), 1500);
        return () => {
          clearInterval(timer);
        };
      }
      let header = {
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      };
      const data = new FormData();
      data.append('password', this.state.password_Download);
      axios
        .post(APP_URL + `/api/` + id + '/password', data, header)
        .then(response => {
          this.setState({
            sayac: 1,
            loading: false,
            download_link: response.data.download_link,
            removestate: false,
          });
          Alert.alert('Warning', 'Do you want to download the file?', [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Download',
              onPress: () => {
                this.loadInBrowser(this.state.download_link);
              },
            },
          ]);
        })
        .catch(error => {
          Alert.alert('Warning', 'password is incorrect');
          this.setState({
            password_Download: '',
            loading: false,
            sayac: this.state.sayac + 1,
          });
        });
    } else {
      Alert.alert('Warning', 'Please enter password');
    }
  }

  loadInBrowser = url => {
    Linking.openURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Don't know how to open URI: " + url);
      }
    });
  };
  /* filedowload = () => {
         this.setState({
             removestate: false,
         });
         const { config, fs } = RNFetchBlob;
         const date = new Date();
 
         const { DownloadDir } = fs.dirs; // You can check the available directories in the wiki.
         const options = {
             fileCache: true,
             addAndroidDownloads: {
                 useDownloadManager: true, // true will use native manager and be shown on notification bar.
                 notification: true,
                 path: `${DownloadDir}_${Math.floor(date.getTime() + date.getSeconds() / 2)}`,
                 description: 'Downloading...',
             },
         };
 
         config(options).fetch('GET', this.state.download_link).then((res) => {
             console.log('do some magic in here');
         });
     };
 */
  remove(id) {
    if (this.state.download_link) {
      Alert.alert('Warning', 'Would you like to delete a file?', [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes',
          onPress: () => {
            this.getremove(id);
          },
        },
      ]);
    }
  }
  getremove(id) {
    let header = {
      headers: {
        'Content-Type': 'multipart/form-data; ',
      },
    };
    const data = new FormData();
    data.append('id', id);
    data.append('password', this.state.password_Download);
    this.setState({loading: true});
    axios.post(APP_URL + `/api/removeFile`, data, header).then(response => {
      this.setState({
        loading: false,
      });
      Alert.alert('Warning', response.data.message), this.bs.current.snapTo(1);
      this.getDatas();
    });
  }
  renderData() {
    var data = this.state.files;
    return data.map((item, Id) => (
      <FileCard
        key={Id}
        data={item}
        onPress={() => this.cardBottomSheet(item.id)}
      />
    ));
  }
  renderInner = () => (
    <View style={styles.panel}>
      {this.state.timerstate && (
        <Text style={{color: '#cccccc', fontSize: 20, textAlign: 'center'}}>
          <ActivityIndicator size="small" color="#cccccc"></ActivityIndicator>
          {'  ' + this.secondsToMinutes(this.state.time)}
        </Text>
      )}
      <TextInput
        secureTextEntry={true}
        editable={this.state.removestate}
        placeholder="Password"
        placeholderTextColor="#cccccc"
        autoCorrect={false}
        style={styles.password}
        onChangeText={password_Download => this.setState({password_Download})}
        value={this.state.password_Download}
      />
      <TouchableOpacity
        style={styles.panelDownload}
        onPress={() => this.download(this.state.id)}>
        <Text style={styles.panelButtonTitle}>Download</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={this.state.removestate}
        style={styles.panelRemove}
        onPress={() => this.remove(this.state.id)}>
        <Text style={styles.panelButtonTitle}>Remove</Text>
      </TouchableOpacity>
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
      <View style={{flex: 1, marginTop: 10}}>
        <BottomSheet
          ref={this.bs}
          snapPoints={[330, 0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.fall}
          enabledGestureInteraction={true}
        />
        <ScrollView>
          <Animated.View
            style={{
              padding: 20,
              borderRadius: 20,
              backgroundColor: '#009387',
              marginRight: 10,
              marginLeft: 10,
            }}>
            <Text>{this.myFile}</Text>
            <TextInput
              placeholder="Share a youtube link or any text..."
              style={styles.input}
              numberOfLines={10}
              multiline={true}
              placeholderTextColor="#cccccc"
              onChangeText={title => this.setState({title})}
              value={this.state.title}></TextInput>

            <TouchableOpacity
              style={styles.click}
              onPress={() => this.openDocumentFile()}>
              <Icon name="download" size={30} color="#000000" />
              <Text>Drop file here or click to upload</Text>
            </TouchableOpacity>
            <Text style={{color: 'red', textAlign: 'center', fontSize: 12}}>
              Share file with password (max:1GB)
            </Text>
            <TextInput
              secureTextEntry={true}
              autoCorrect={false}
              placeholder="Password"
              style={styles.password}
              placeholderTextColor="#cccccc"
              onChangeText={password => this.setState({password})}
              value={this.state.password}></TextInput>

            <TouchableOpacity onPress={() => this.upload()} style={styles.file}>
              <Text style={styles.panelButtonTitle}>Share Here</Text>
            </TouchableOpacity>
          </Animated.View>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#009387"></ActivityIndicator>
          ) : null}
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
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    height: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
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
  panelDownload: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#167726',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelRemove: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#bf0000',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

export {Home};
