import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Footer.style.js';
import {
  Text
  , TouchableOpacity
  , View
} from 'react-native';

class Footer extends Component {
  saveAction = () => {

  }
  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.saveAction}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
        <Text style={styles.countLabel}>{this.props.countContentCharacters} characters</Text>
      </View>
    );
  }
}

Footer.propTypes = {
  countContentCharacters: PropTypes.number.isRequired
};
Footer.defaultProps = {
  countContentCharacters: 0
};

export default Footer;