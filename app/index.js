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
import {KeyboardAvoidingView, Platform, View} from 'react-native';

export default class App extends Component {
  state = {
    content: ''
  }
  WrapperView = Platform.select(
    {ios: KeyboardAvoidingView,
      android: View
    }
  )
  changeText  = (text) => {
    this.setState({content: text});
  }
  render () {
    return (
      <this.WrapperView style={styles.container} behavior={'padding'} >
        <Title/>
        <Content  onTextChange={this.changeText} />
        <Footer characterCount={this.state.content.length}/>
      </this.WrapperView>
    );
  }
}

