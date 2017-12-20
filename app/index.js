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

  render () {
    return (
      <View style={globalStyle.container}>
        <Title/>  
        <Content />
        <Footer />
      </View>
    );
  }
}
