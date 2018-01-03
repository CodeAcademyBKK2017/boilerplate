import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './FooterBox.component.style';
import {
  Text,
  TouchableOpacity
} from 'react-native';

export default class Footer extends Component {
  
  openAbout = () => this.props.navigation.navigate('About');

  render () {
    return (
      <TouchableOpacity style={styles.footerStyle} onPress={this.openAbout}>
        <Text style={styles.textFooter}>About Us</Text>
      </TouchableOpacity>
    );
  }
}

Footer.propTypes = {
  navigation: PropTypes.object.isRequired
};

Footer.defaultProps = {
  navigation: {}
};