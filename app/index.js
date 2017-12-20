/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.components';
import Footer from './components/Footer/Footer.components';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.components';

import {
  View
} from 'react-native';

export default class App extends Component {
  state ={
    text: ''
  }
  texts =(v) => {
    this.setState({text: v});
  }
  render () {
    return (
      <View style={styles.container}>  
        <Title/>
        <Content  fn={this.texts}/>
        <Footer texts={this.state.text}/>
      </View>
    );
  }
}
