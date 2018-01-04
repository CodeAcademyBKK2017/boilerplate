import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Lower.style';
import Touchable from 'react-native-platform-touchable';
import {
  Text,
  View
} from 'react-native';

export default class Lower extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Touchable
          style={styles.aboutButtonTouch}
          background={Touchable.Ripple('blue')}
          onPress={this.props.onShowAboutUs}>
          <Text style={styles.aboutButtonContent}>About Us</Text>
        </Touchable>
      </View>
    );
  }
}

Lower.propTypes = {
  onShowAboutUs: PropTypes.func.isRequired
};

Lower.defaultProps = {
  onShowAboutUs: noop
};
