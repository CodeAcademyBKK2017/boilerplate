/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import noop from 'lodash/noop';
import ProptTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './content.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class Content extends Component {

  render () {
    const {FText, textState} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
            Please type your note below.
        </Text>
        <TextInput
          style = {styles.textArea}
          multiline = {true}
          onChangeText={FText}
          value = {textState}
        />
      </View>
    );
  }
}

Content.propTypes = {
  textState: ProptTypes.string.isRequired,
  FText: ProptTypes.func.isRequired
};

Content.defaultProps = {
  FText: noop,
  textState: ''
};
