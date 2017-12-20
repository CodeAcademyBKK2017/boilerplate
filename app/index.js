/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import ContentBox from './components/ContentBox/ContentBox.component';
import Footer from './components/FooterBox/FooterBox.component';
import HeaderBox from './components/HeaderBox/HeaderBox.component';
import React, {Component} from 'react';
import style from './index.style';
import TitleBox from './components/TitleBox/TitleBox.component';
import {View} from 'react-native';

export default class App extends Component {
  render () {
    return (
      <View style={style.container}>
        <HeaderBox />
        <TitleBox />
        <ContentBox />
        <Footer />
      </View>
    );
  }
}