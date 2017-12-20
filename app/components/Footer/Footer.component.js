// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Footer.style';
import Touchable from 'react-native-platform-touchable';
import {Text, View} from 'react-native';

export default class Footer extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Touchable style={styles.touchable} background={Touchable.Ripple('blue')} activeOpacity={1}>
          <Text style={styles.textBold}>Save</Text>
        </Touchable>
        <Text style={styles.text}>150 characters</Text>
      </View>
    );
  }

}