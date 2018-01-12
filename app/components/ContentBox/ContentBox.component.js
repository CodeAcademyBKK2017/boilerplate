import Icon from 'react-native-vector-icons/Foundation';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './ContentBox.style';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default class ContentBox extends Component {

  render () {
    return (
      <View style={styles.contentStyle}>
        <View style={styles.contentStyleColum}>
          <Text style={styles.textContent}>Please type your note below.</Text><Icon name='clipboard-notes' size={20} color='#333333' />
        </View>
        <TextInput 
          style={styles.textInput}
          multiline= {true}
          value={this.props.contentValueText}
          placeholder={'- Understand how react-native works.\n- Build a native android and iOS app.\n- Setup CI for automated builds.\n- Conventions to manage the codebase.'}
          onChangeText={this.props.onContentChange}
          underlineColorAndroid='transparent'
        />
        <View style={styles.saveTabStyle}>
          <TouchableOpacity style={styles.flexOne} onPress={this.props.onSave}><Text style={styles.saveTextStyle}>Save</Text></TouchableOpacity>
          <Text>{this.props.count} chacters</Text>
        </View>
      </View>
    );
  }
}

ContentBox.propTypes = {
  onContentChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  contentValueText: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

ContentBox.defaultProps = {
  onContentChange: PropTypes.func,
  onSave: PropTypes.func,
  contentValueText: '',
  count: 0
};