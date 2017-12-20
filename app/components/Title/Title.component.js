import React, {Component} from 'react';
import styles from './Title.style.js';
import {
  Text
  , TextInput
  , View
} from 'react-native';

class Title extends Component {
  render () {
    return (
      <View>
        <Text style={styles.text}>Note Title</Text>
        <TextInput
          style={styles.textinput}
        />
      </View>
    );
  }
}

export default Title;