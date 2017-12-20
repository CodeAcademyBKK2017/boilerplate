import footerStyle from './Footer.style';
import noop from 'lodash/noop';
import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// TouchableOpacity, Text

export default class Footer extends Component {
  render () {
    return (
      <View style={footerStyle.boxFooter}>
        <TouchableOpacity title='Save' style={footerStyle.button} onPress={noop}>
          <Text>
            Save
          </Text>
        </TouchableOpacity>
        <Text style={footerStyle.textRight}>
            150 chacters
        </Text>
      </View>
    );
  }
}
