import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Content.style';
import {Text, TextInput, View} from 'react-native';

export default class TextArea extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.headContent}>
          <Text style={styles.text}>Please type your note below</Text>
          <Icon name='note-add' size={30} color='#900' />
        </View>
        <TextInput style={styles.textArea} 
          multiline={true} 
          underlineColorAndroid='transparent'
          onChangeText={this.props.onContentChange}  />
      </View>
    );
  }
}
TextArea.propTypes = {
  onContentChange: PropTypes.func
};
