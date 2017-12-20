import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Content.style';
import {Text, TextInput, View} from 'react-native';

export default class TextArea extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please type your note below</Text>
        <TextInput style={styles.textArea} 
          multiline={true} 
          underlineColorAndroid='transparent'
          onChangeText={this.props.onTextChange}  />
      </View>
    );
  }
}
TextArea.propTypes = {
  onTextChange: PropTypes.func
};
