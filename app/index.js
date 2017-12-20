/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import TextArea from './components/TextArea/TextArea.component';
import {
  StyleSheet,
  View
} from 'react-native';

export default class App extends Component {
  state = {
    data: '',
    modalVisible: false
  }
  getName = () => 'Yo'
  showText  = (text) => {
    this.setState({data: text});
  }
  render () {
    return (
      <View style={styles.container}>
        <TextArea onChangeText={this.showText}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
