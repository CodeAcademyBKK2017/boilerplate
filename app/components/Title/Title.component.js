import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Title.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class Title extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Note Title</Text>
          {/* <Button style={styles.languageButton} title='en' onPress={null}/> */}
        </View>
        
        <TextInput
          style={styles.textInput}
          underlineColorAndroid='transparent'
          value={this.props.text}
          onChangeText={this.props.onChangeTextTitle}/>
      </View>
    );
  }
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
  onChangeTextTitle: PropTypes.func.isRequired
};

Title.defaultProps = {
  text: '',
  onChangeTextTitle: noop
};
