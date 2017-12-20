// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Footer.style';
import {Text, View} from 'react-native';

export default class Footer extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.textBold}>Save</Text>
        <Text style={styles.text}>150 characters</Text>
      </View>
    );
  }

}