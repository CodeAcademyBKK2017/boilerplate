import footerStyles from './Footer.style';
import Icon from 'react-native-vector-icons/FontAwesome';
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
      <View>
        <View style={footerStyles.container}>
          <TouchableOpacity onPress={this.props.onSavePress}>
            <Text style={footerStyles.fontTitle}>
          Save
            </Text>
          </TouchableOpacity>
          <Text style={footerStyles.chacters}>
            {this.props.countContent} <Icon name='rocket' size={30} color='#900' />
          </Text>
          
        </View>
        <View>
          <Text style={footerStyles.noteList}>Notes: </Text>
        </View>
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

