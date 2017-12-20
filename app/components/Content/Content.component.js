import React, {Component} from 'react';
import styles from './Content.style.js';
import {
  Text
  , TextInput
  , View
} from 'react-native';

class Content extends Component {
  render () {
    return (
      <View>
        <Text style={styles.text}>Please type your note below</Text>
        <TextInput
          style={styles.textinput}
          multiline = {true}
        />
      </View>
    );
  }
}

export default Content;