import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './AboutSection.style';
import Touchable from 'react-native-platform-touchable';
import {
  Text,
  View
} from 'react-native';

export default class AboutSection extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Touchable
          style={styles.aboutButtonTouch}
          background={Touchable.Ripple('orange')}
          onPress={this.props.onAboutButtonPress}
        >
          <Text style={styles.aboutButtonContent}>About</Text>
        </Touchable>
      </View>
    );
  }
}

AboutSection.propTypes = {
  onAboutButtonPress: PropTypes.func.isRequired
};

AboutSection.defaultProps = {
  onAboutButtonPress: noop
};
