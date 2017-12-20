import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import React, {Component} from 'react';
import styles from './index.styles';
import Title from './components/Title/Title.component';

import {
  View
} from 'react-native';

export default class App extends Component {
  state = {
    characterCount: 0
  }

  onChangeText = (e) => {
    this.setState({
      characterCount: e.length
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <Title />
        <Content onChangeText={this.onChangeText} />
        <Footer characterCount={this.state.characterCount}/>
      </View>
    );
  }
}