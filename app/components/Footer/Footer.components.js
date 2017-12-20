import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Foot.style';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class Footer extends Component {
  render () {
    return (
      <View style={styles.Foot}>
        <View style={styles.footerRow}>
          <TouchableOpacity>
            <Text style={styles.fonts}>Save</Text>
          </TouchableOpacity>
          <Text style={styles.footSave}>{this.props.texts.length} chacters</Text>
        </View>
      </View>
    );
  }
}

Footer.propTypes = {
  texts: PropTypes.string.isRequired
};
export default Footer;