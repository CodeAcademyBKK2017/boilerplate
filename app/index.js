/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  style,
  Button,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import TextAlign from './components/TextArea/TextArea.components';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

export default class App extends Component {
  getName = () => 'Yo'
  state = {
    text: '',
  };
  render () {
    return (
      <View style={styles.container}>
        
        <TextAlign/>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(37, 8, 10, 0.78)',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width:'80%',
    height:200,
    justifyContent: 'center'
    
  },
  bt:{
    backgroundColor:'yellow',
    padding:10
    
    }
});
