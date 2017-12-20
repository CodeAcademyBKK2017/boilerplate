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
    content: ''
  }
  changeText  = (text) => {
    this.setState({content: text});
  }
  render () {
    return (
      <View style={styles.container} >
        <Title/>
        <Content  onTextChange={this.changeText} />
        <Footer characterCount={this.state.content.length}/>
      </View>
    );
  }
}

