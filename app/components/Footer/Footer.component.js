import footerStyles from './Footer.style';
import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';

class Footer extends Component {
  render () {
    return (
      <View style={footerStyles.container}>
        <Text style={footerStyles.fontTitle}>
          Save
        </Text>
        <Text style={footerStyles.chacters}>
          150 chacters
        </Text>
      </View>
    );
  }
}

export default Footer;

