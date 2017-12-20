import contentStyles from './Content.style';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View
} from 'react-native';

class Content extends Component {
  render () {
    return (
      <View style={contentStyles.container}>
        <Text style={contentStyles.fontTitle}>
          Please type your note below
        </Text>
        <TextInput style={contentStyles.inputBox} multiline = {true} underlineColorAndroid= 'transparent' onChangeText={this.props.onType}/>
      </View>
    );
  }
}
Content.propTypes = {
  onType: PropTypes.func
};
Content.defaultProps = {
  onType: noop
};

export default Content;

