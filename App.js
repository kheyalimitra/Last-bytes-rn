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
  View
} from 'react-native';
import Camera from 'react-native-camera';
import { TensorFlow } from 'react-native-tensorflow';
import { TfImageRecognition } from 'react-native-tensorflow';
import FileSystem from 'react-native-fs';
const label_file = 'retrained_labels_v5.txt';
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
    const tf = new TensorFlow('tensorflow_inception_graph.pb')
    console.log('tf' , tf)
    await tf.feed({name: "inputName", data: [1,2,3], shape:[1,2,4], dtype: "int64"})
    await tf.run(['outputNames'])
    const output = await tf.fetch('outputName')
    console.log('output' , output)
//    console.log('graph: ' , graph_file)
//    const tfImageRecognition = new TfImageRecognition({
//      model: require('./assets/retrained_graph_v5.pb'),
//      labels: require('./assets/retrained_labels_v5.txt'),
//      imageMean: 117, // Optional, defaults to 117
//      imageStd: 1 // Optional, defaults to 1
//    })
////       const graph = await FileSystem.readFile(graph_file)
//       const tf = new TensorFlow(graph_file)
//       console.warn('tf : ' , tf)
//       await tf.feed({name: "inputName", data: [1,2,3], shape:[1,2,4], dtype: "int64"})
//       await tf.run(['outputNames'])
//       const output = await tf.fetch('outputName')
//       console.warn('output: ' , output)

//      console.log(data)
//      console.log(tfImageRecognition)
//      const results = await tfImageRecognition.recognize({
//              image: data,
//              inputName: "input", //Optional, defaults to "input"
//              inputSize: 224, //Optional, defaults to 224
//              outputName: "output", //Optional, defaults to "output"
//              maxResults: 3, //Optional, defaults to 3
//              threshold: 0.1, //Optional, defaults to 0.1
//       })
////
//        results.forEach(result =>
//          console.log(
//            result.id, // Id of the result
//            result.name, // Name of the result
//            result.confidence // Confidence value between 0 - 1
//          )
//        )
//        await tfImageRecognition.close()

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
