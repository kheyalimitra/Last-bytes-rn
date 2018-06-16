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
//import ImgToBase64 from 'react-native-image-base64';
//import { TensorFlow } from 'react-native-tensorflow';
//import { TfImageRecognition } from 'react-native-tensorflow';
import RNFS from 'react-native-fs';
//const label_file = 'retrained_labels_v5.txt';


//import Fetch from 'react-native-fetch';

//const graph_file = require('./assets/retrained_graph_v5.pb');

//const graph = FileSystem.readFile(graph_file, 'utf8')
//  .then((statResult) => {
//    if (statResult[0].isFile()) {
//    console.warn(statResult);
//      return statResult;
//    }
//  })
//  .catch((err) => {
//    console.log(err.message, err.code);
//  });




//const instructions = Platform.select({
//  ios: 'Press Cmd+R to reload,\n' +
//    'Cmd+D or shake for dev menu',
//  android: 'Double tap R on your keyboard to reload,\n' +
//    'Shake or press menu button for dev menu',
//});
//
//
//const tfImageRecognition = new TfImageRecognition({
//  model: require('./android/assets/retrained_graph_v5.pb'),
//  labels: require('./assets/retrained_labels_v5.txt'),
//  imageMean: 117, // Optional, defaults to 117
//  imageStd: 1 // Optional, defaults to 1
//})

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
            console.log(res);
            fetch('https://waste-classifier-cs.cfapps.sap.hana.ondemand.com/classify', {
            method: 'POST',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'Basic ' + base64.encode('Ask Kheyali for credential' + ":" + 'Ask Kheyali for credential')
            },
            data: res
            }).then((response) => {
                    console.log("success response", response);
                })
            .catch((error) => {
                  console.error("error ", error);
                });
            })
            .catch(err => console.error(err))

    }).catch((error) => {
      console.error(error)
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
