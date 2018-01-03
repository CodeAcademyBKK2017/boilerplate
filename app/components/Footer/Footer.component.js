import noop from 'lodash/noop';
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
          <Touchable
            style={styles.saveButtonTouch}
            background={Touchable.Ripple('blue')}
            onPress={this.props.onSaveButtonPress}>
            <Text style={styles.saveButtonContent}>Save</Text>
          </Touchable>
          <Touchable
            style={styles.saveButtonTouch}
            background={Touchable.Ripple('blue')}
            onPress={this.props.onShowAboutUs}>
            <Text style={styles.saveButtonContent}>About</Text>
          </Touchable>
          <Text>{this.props.textContentLength} characters</Text>
        </View>
      </View>
    );
  }
}

Footer.propTypes = {
  textContentLength: PropTypes.number.isRequired,
  onSaveButtonPress: PropTypes.func.isRequired,
  onShowAboutUs: PropTypes.func.isRequired
};

Footer.defaultProps = {
  textContentLength: 0,
  onSaveButtonPress: noop,
  onShowAboutUs: noop
};
