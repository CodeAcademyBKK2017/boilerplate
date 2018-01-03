import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import titleStyles from './Title.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

class Title extends Component {
  render () {
    return (
      <View>
        <Text style={titleStyles.fontTitle}>
          Note Title
        </Text>
        <TextInput style={titleStyles.inputBox} underlineColorAndroid= 'transparent' onChangeText={this.props.onTypeTitle} value={this.props.text}/>
      </View>
    );
  }
}

Title.propTypes = {
  onTypeTitle: PropTypes
};
Title.defaultProps = {
  onTypeTitle: noop
};

Title.propTypes = {
  text: PropTypes.string
};
Title.defaultProps = {
  text: noop
};

export default Title;

