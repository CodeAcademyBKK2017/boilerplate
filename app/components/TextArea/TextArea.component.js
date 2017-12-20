import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

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
const styles = StyleSheet.create({
  textArea: {
    width: 300,
    height: 200,
    borderWidth: 5
  },
  text: {
    color: 'green',
    fontSize: 20,
    textAlign: 'left'
  }
});

TextArea.propTypes = {
  onChangeText: PropTypes.func
};
