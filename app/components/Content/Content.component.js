import contentStyle from './Content.style';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class Content extends Component {
  render () {
    return (
      <View style={contentStyle.boxTextArea}>
        
        <Text style={contentStyle.welcome}>
          Please type your note below <Icon name='notebook' size={20} color='#900' />
        </Text>
        
        <TextInput underlineColorAndroid='transparent' 
          style={contentStyle.inputText} 
          multiline = {true} 
          numberOfLines = {4}
          onChangeText={this.props.onType}
          value={this.props.inputContent}
        />
      </View>
    );
  }
}

Content.propTypes = {
  onType: PropTypes.func.isRequired,
  inputContent: PropTypes.string.isRequired
};
Content.defaultProps = {
  onType: noop,
  inputContent: ''
};
