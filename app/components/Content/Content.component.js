import Icon from 'react-native-vector-icons/Foundation';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Content.style';
import {
  Text,
  TextInput,
  TouchableOpacity,
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
          <Icon name='clipboard-notes' size={30} color='#000' />
        </View>
        <View style={styles.conArea}>
          <TextInput
            style={styles.textArea}
            onChangeText = {this.props.Fn}
            multiline = {true}
            numberOfLines = {4}
            underlineColorAndroid = 'transparent'
            value = {this.props.texts}
          />
        </View>
        <View style={styles.title}>
          <View style={styles.noteLeft}>
            <TouchableOpacity
              onPress={this.props.FnSave}>
              <Text style={styles.note}>Save</Text>
            </TouchableOpacity>
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
  Fn: PropTypes.func.isRequired,
  FnSave: PropTypes.func.isRequired
};
export default Content;
