import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Footer.style';
import Touchable from 'react-native-platform-touchable';
import {Text, View} from 'react-native';

export default class Footer extends Component {
  render () {
    const {characterCount, onPressSave} = this.props;
    return (
      <View style={styles.container}>
        <Touchable style={styles.touchable} background={Touchable.Ripple('blue')} activeOpacity={1} onPress={onPressSave} >
          <Text style={styles.textBold}>Save</Text>
        </Touchable>
        <Text style={styles.text}>{characterCount} characters</Text>
      </View>
    );
  }
}
Footer.propTypes = {
  characterCount: PropTypes.number,
  onPressSave: PropTypes.func
};
