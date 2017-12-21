import noop from 'lodash/noop';
import PropTypes from 'prop-types';
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
          underlineColorAndroid='transparent'
          onChangeText={this.props.onKeyPressTitle}
          value={this.props.text}
        />
      </View>
    );
  }
}

Title.propTypes = {
  onKeyPressTitle: PropTypes.func,
  text: PropTypes.string
};
Title.defaultProps = {
  onKeyPressTitle: noop,
  text: ''
};

export default Title;