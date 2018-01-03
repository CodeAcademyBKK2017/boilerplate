import Icon from 'react-native-vector-icons/Foundation';
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
          <Icon name='clipboard-notes' size={30} color='#488dd8' />
        </Text>
        
        <TextInput
          style={styles.textin}
          onChangeText={this.props.fn}
          multiline = {true}
          underlineColorAndroid = 'transparent'
          numberOfLines = {4}
          value={this.props.text}   
          // placeholder='-Understand how react-native works.'
        />
      </View>
    );
  }
}

Content.propTypes = {
  fn: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};
export default Content;