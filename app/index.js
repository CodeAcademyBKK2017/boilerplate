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
  View
} from 'react-native';

export default class App extends Component {
  state = {
    countContent: 0
  }

  onType = (textInput) => {
    this.setState({countContent: textInput.length});
  }

  render () {
    return (
      <View style={styles.container}>
        <Title/>
        <Content onType={this.onType}/>
        <Footer countContent={this.state.countContent}/>
      </View>
    );
  }
}