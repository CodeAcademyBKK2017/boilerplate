/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import React, {Component} from 'react';
import Title from './components/Title/Title.component';
import {
  StyleSheet,
  View
} from 'react-native';

export default class App extends Component {
    state = {
      count: 0
    }
    onType = (text) => {
      this.setState({count: text.length});
    }
    render () {
      return (
        <View style={styles.boxMain}>
          <Title/>
          <Content onType={this.onType}/>
          <Footer showNumber={this.state.count}/>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  boxMain: {
    flex: 1
  }
});