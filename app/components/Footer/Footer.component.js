import footerStyles from './Footer.style';
import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class Footer extends Component {
  render () {
    return (
      <View style={footerStyles.container}>
        <TouchableOpacity onPress={this.openModal}>
          <Text style={footerStyles.fontTitle}>
          Save
          </Text>
        </TouchableOpacity>
        <Text style={footerStyles.chacters}>
          150 chacters
        </Text>
      </View>
    );
  }
}

export default Footer;

