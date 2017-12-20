import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './TextArea.style';
import {Text, TextInput, View} from 'react-native';

export default class TextArea extends Component {
  render () {
    return (
      <View >
        <Text style={styles.text}>Content</Text>
        <TextInput style={styles.textArea} onChangeText={this.props.onChangeText} />
      </View>
    );
  }
}

TextArea.propTypes = {
  onChangeText: PropTypes.func
};
