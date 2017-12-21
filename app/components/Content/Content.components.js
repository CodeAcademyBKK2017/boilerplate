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
      <View style={styles.conView}>
        <Text style={styles.welcome}>
         Please type your note below
        </Text>
        <TextInput
          style={styles.textin}
          onChangeText={this.props.fn}
          multiline = {true}
          underlineColorAndroid = 'transparent'
          numberOfLines = {4}
          value={this.props.delContene}   
          // placeholder='-Understand how react-native works.'
        />
      </View>
    );
  }
}

Content.propTypes = {
  fn: PropTypes.func.isRequired,
  delContene: PropTypes.string.isRequired
};
export default Content;