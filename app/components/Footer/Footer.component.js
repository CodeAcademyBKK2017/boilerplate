// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Footer.style';
import {Text, TouchableOpacity, View} from 'react-native';

export default class Footer extends Component {
  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.textBold}>Save</Text>
        </TouchableOpacity>
        <Text style={styles.text}>150 characters</Text>
      </View>
    );
  }

}