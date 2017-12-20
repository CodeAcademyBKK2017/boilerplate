import footerStyle from './Footer.style';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
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
          {this.props.showNumber} chacters
        </Text>
      </View>
    );
  }
}

Footer.propTypes = {
  showNumber: PropTypes.number.isRequired
};
Footer.defaultProps = {
  showNumber: 0
};