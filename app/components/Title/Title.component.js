import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import titleStyle from './Title.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class Title extends Component {
  render () {
    return (
      <View style={titleStyle.boxTitle}>
        <Text style={titleStyle.textTitle}>
          New Title
        </Text>
        <TextInput underlineColorAndroid='transparent' value={this.props.inputTitle} style={titleStyle.inputText} onChangeText={this.props.onTypeTitle}/>
      </View>
    );
  }
}

Title.propTypes = {
  onTypeTitle: PropTypes.func.isRequired,
  inputTitle: PropTypes.string.isRequired
};
Title.defaultProps = {
  onTypeTitle: noop,
  inputTitle: ''
};