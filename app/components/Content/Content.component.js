import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Content.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class Content extends Component {
  render () {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.title}>Please type your note below</Text>
        <TextInput style={styles.textInput} multiline={true}/>
      </View>
    );
  }
}

Content.propTypes = {
  style: PropTypes.number
};
