import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './ContentBox.component.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class ContentBox extends Component {

  render () {
    return (
      <View style={styles.contentStyle}>
        <View style={styles.contentStyleColum}>
          <Text style={styles.textContent}>Please type your note below</Text>
        </View>
        <TextInput 
          style={styles.textInput}
          multiline= {true}
          placeholder={'- Understand how react-native works.\n- Build a native android and iOS app.\n- Setup CI for automated builds.\n- Conventions to manage the codebase.'}
          onChangeText={this.props.onChange}
          underlineColorAndroid='transparent'
        />
        <View style={styles.saveTabStyle}><Text style={styles.saveTextStyle}>Save</Text><Text>{this.props.count} chacters</Text></View>
      </View>
    );
  }
}

ContentBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired
};

ContentBox.defaultProps = {
  onChange: PropTypes.func,
  count: 0
};