import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Content.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

class Content extends Component {
  render () {
    return (
      <View>
        <View style={styles.content}>
          <Text style={styles.welcome}>
          Please type your note below
          </Text>
        </View>
        <View style={styles.conArea}>
          <TextInput
            style={styles.textArea}
            onChangeText = {this.props.Fn}
            multiline = {true}
            numberOfLines = {4}
            underlineColorAndroid = 'transparent'
          />
        </View>
        <View style={styles.title}>
          <View style={styles.noteLeft}>
            <Text style={styles.note}>Save</Text>
          </View>
          <View style={styles.noteRight}>
            <Text>{this.props.texts.length} chacters</Text>
          </View>
        </View>
      </View>
    );
  }
}
Content.propTypes = {
  texts: PropTypes.string.isRequired,
  Fn: PropTypes.func.isRequired
};
export default Content;
