import Icon from 'react-native-vector-icons/Foundation';
import noop from 'lodash/noop';
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
        <View style={styles.titleCon}>
          <Text style={styles.title}>Please type your note below</Text>
          <Icon style={styles.icon} name='clipboard-notes'/>
        </View>
        <TextInput
          style={styles.textInput}
          multiline={true}
          underlineColorAndroid='transparent'
          value={this.props.text}
          onChangeText={this.props.onChangeTextContent}/>
      </View>
    );
  }
}

Content.propTypes = {
  style: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  text: PropTypes.string.isRequired,
  onChangeTextContent: PropTypes.func.isRequired
};

Content.defaultProps = {
  text: '',
  onChangeTextContent: noop
};
