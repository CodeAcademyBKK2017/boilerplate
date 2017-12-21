/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import noop from 'lodash/noop';
import ProptTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './title.style';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default class Title extends Component {

  render () {
    const {text, FTitle} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.titleHead}>
          <Text style={styles.NText}>
            Note Title
          </Text>
          <TouchableOpacity>
            <Text style={styles.btnText}>
            EN
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style = {styles.textArea}
          multiline = {true}
          onChangeText={FTitle}
          value={text}
        />
      </View>
    );
  }
}

Title.propTypes = {
  FTitle: ProptTypes.func.isRequired,
  text: ProptTypes.string.isRequired
};

Title.defaultProps = {
  FTitle: noop,
  text: ''
};
