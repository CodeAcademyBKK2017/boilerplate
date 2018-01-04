import React, {Component} from 'react';
import styles from './AboutApp.style';
import {Text, View} from 'react-native';

class AboutApp extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>About the App </Text>
      </View>
    );
  }
}

AboutApp.defaultProps = {
};
AboutApp.propTypes = {
};

export default AboutApp;
