/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import noop from 'lodash/noop';
import ProptTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './footer.style';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class Footer extends Component {

  render () {
    const {textState, addContent} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={addContent}>
          <Text style={styles.Save}>
            Save
          </Text>
        </TouchableOpacity>
        <Text style={styles.Count}>
          {textState} chacters
        </Text> 
      </View>
    );
  }
}
Footer.propTypes = {
  textState: ProptTypes.number.isRequired,
  addContent: ProptTypes.func.isRequired
};
  
Footer.defaultProps = {
  textState: 0,
  addContent: noop
};
