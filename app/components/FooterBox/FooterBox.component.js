import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './FooterBox.style';
import {
  Text,
  TouchableOpacity
} from 'react-native';

export default class Footer extends Component {
  
  render () {
    return (
      <TouchableOpacity style={styles.footerStyle} onPress={this.props.openAbout}>
        <Text style={styles.textFooter}>About Us</Text>
      </TouchableOpacity>
    );
  }
}

Footer.propTypes = {
  openAbout: PropTypes.func.isRequired
};

Footer.defaultProps = {
  openAbout: noop
};