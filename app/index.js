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
import {View} from 'react-native';

export default class App extends Component {
  state = {
    data: '',
    modalVisible: false
  }
  // showText  = (text) => {
  //   this.setState({data: text});
  // onChangeText={this.showText}
  // }
  render () {
    return (
      <View style={styles.container}>
        <Title/>
        <Content />
        <Footer/>
      </View>
    );
  }
}

