import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './TitleBox.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class TitleBox extends Component {
  render () {
    return (
      <View style={styles.titleStyle}>
        <View style={styles.TitleStyleColum}>
          <Text style={styles.textTitle}>Note Title</Text>
          <View style={styles.languageTitle}><Text style={styles.textLanguage}>en</Text></View>
        </View>
        <TextInput 
          style={styles.textInput}
          placeholder={'Tasks for today'}
          placeholderTextColor={'#000'}
          value={this.props.titleValueText}
          underlineColorAndroid='transparent'
          onChangeText={this.props.onTitleChange}
        />
      </View>
    );
  }
}

TitleBox.propTypes = {
  onTitleChange: PropTypes.func.isRequired,
  titleValueText: PropTypes.string.isRequired
};

TitleBox.defaultProps = {
  onTitleChange: PropTypes.func,
  titleValueText: ''
};