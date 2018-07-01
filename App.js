/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Camera from 'react-native-camera';
const base64 = require('base-64');
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Camera
          captureTarget={Camera.constants.CaptureTarget.disk}
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
            <Text
              style={styles.capture}
              onPress={this.takePicture.bind(this)}>
              [CAPTURE_IMAGE]
            </Text>
        </Camera>
      </View>
    );
  }

  async takePicture() {
    this.camera.capture().then(async(data) => {
        let base64Img = data.path;
        RNFS.readFile(Platform.OS === 'android'? base64Img.substring(7): base64Img, "base64")
        .then((res) =>  {
            this.setState({uri: res})
            RNFetchBlob.fetch('POST', 'https://waste-classifier-cs.cfapps.sap.hana.ondemand.com/classify', {
               'Content-Type' : 'application/octet-stream',
               Authorization: 'Basic ' + base64.encode('Ask Kheyali for credential' + ":" + 'Ask Kheyali for credential'),
            }, res) .then((res) => {
             console.log(res.text())
           })
           .catch((err) => {
              console.log(err)
           }).then((response) => {
                    console.log("success response", response);
                })
            .catch((error) => {
                  console.log("error ", error);
                });
            })
            .catch((error) => {
                              console.log("error ", error);
            });

    }).catch((error) => {
        console.log(error);
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  preview: {
     flex: 1,
     justifyContent: 'flex-end',
     alignItems: 'center'
  },
  capture: {
     flex: 0,
     backgroundColor: '#fff',
     borderRadius: 5,
     color: '#000',
     padding: 10,
     margin: 40
  },
});
