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
        <TextInput style={contentStyles.inputBox} multiline = {true} underlineColorAndroid= 'transparent' onChangeText={this.props.onTypeContent}/>
      </View>
    );
  }
}
Content.propTypes = {
  onTypeContent: PropTypes.func
};
Content.defaultProps = {
  onTypeContent: noop
};

export default Content;

