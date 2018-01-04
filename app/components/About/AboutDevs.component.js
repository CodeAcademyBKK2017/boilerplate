import React, {Component} from 'react';
import styles from './AboutDevs.style';
import {Text, View} from 'react-native';

class AboutDevs extends Component {
  render () {
    return (
      <View  style={styles.container}>
        <Text>About the Devs </Text>
      </View>
    );
  }
}

AboutDevs.defaultProps = {
};
AboutDevs.propTypes = {
};

export default AboutDevs;
