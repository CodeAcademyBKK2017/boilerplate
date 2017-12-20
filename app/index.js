import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import React, {Component} from 'react';
import styles from './index.styles';
import Title from './components/Title/Title.component';

import {
  View
} from 'react-native';

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Title />
        <Content />
        <Footer />
      </View>
    );
  }
}