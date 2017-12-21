import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Title.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

class Title extends Component {
  render () {
    return (
      <View style={styles.title}>
        <View style={styles.textRow}>
          <View style={styles.titleLeft}>
            <Text style={styles.titleText}>Note Title</Text>
          </View>
    
          <View >
            <Text style={styles.titleEn}>en</Text>
          </View>
        </View>
        
        <TextInput 
          style={styles.titleInput}
          onChangeText={this.props.titles}
          placeholder='Tasks for today'
          value={this.props.text}
        />
       
      </View>
    );
  }
}
Title.propTypes = {
  titles: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};
export default Title;