import footerStyles from './Footer.style';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
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
        <TouchableOpacity onPress={this.props.onSavePress}>
          <Text style={footerStyles.fontTitle}>
          Save
          </Text>
        </TouchableOpacity>
        <Text style={footerStyles.chacters}>
          {this.props.countContent} chacters
        </Text>
      </View>
    );
  }
}

Footer.propTypes = {
  countContent: PropTypes.number.isRequired,
  onSavePress: PropTypes.func
};
Footer.defaultProps = {
  countContent: 0,
  onSavePress: noop
};

export default Footer;

