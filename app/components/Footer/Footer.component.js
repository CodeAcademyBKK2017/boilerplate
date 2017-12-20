import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Footer.style';
import Touchable from 'react-native-platform-touchable';
import {
  Text,
  View
} from 'react-native';

export default class Footer extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.status}>
          <Touchable style={styles.saveButtonTouch} background={Touchable.Ripple('blue')}>
            <Text style={styles.saveButtonContent}>Save</Text>
          </Touchable>
          <Text style={styles.charLength}>{this.props.textContent.length} characters</Text>
        </View>
      </View>
    );
  }
}

Footer.propTypes = {
  textContent: PropTypes.string.isRequired
};

Footer.defaultProps = {
  textContent: ''
};
