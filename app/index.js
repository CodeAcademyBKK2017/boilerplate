/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.component';
import {
  KeyboardAvoidingView, Platform, View
} from 'react-native';

export default class App extends Component {
  state = {
    textContent: ''
  }

  WrapperView = Platform.select({
    ios: KeyboardAvoidingView,
    android: View
  });

  onChangeTextContent = (text) => {
    this.setState({
      textContent: text
    });
  }

  render () {
    return (
      <this.WrapperView style={[styles.container]}
        behavior='padding'>
        <Title/>
        <Content style={styles.fill} onChangeTextContent={this.onChangeTextContent}/>
        <Footer textContent={this.state.textContent}/>
      </this.WrapperView>
    );
  }
}
