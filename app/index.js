/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/contents/content.component';
import Footer from './components/footers/footer.component';
import globalStyle from './index.style';
import React, {Component} from 'react';
import Title from './components/titles/title.component';
import {View} from 'react-native';

export default class App extends Component {
  state = {
    text: ''
  }

  Logger = (text) => {
    this.setState({text});
  }

  render () {
    return (
      <View style={globalStyle.container}>
        <Title/>  
        <Content FText={this.Logger} textState={this.state.text}/>
        <Footer textState={this.state.text.length}/>
      </View> 
    );
  }
}
