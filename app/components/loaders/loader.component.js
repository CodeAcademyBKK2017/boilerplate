/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import ProptTypes from 'prop-types';
import React from 'react';
import styles from './loader.style';
import {
  ActivityIndicator,
  Modal,
  View
} from 'react-native';

const Loader = ({isModalVisible}) =>  (
  <Modal
    visible={isModalVisible}
    animationType={'slide'}
    transparent={true}>
    <View style={styles.modalContainer}>
      <ActivityIndicator size='large' color='#ff0000' />
    </View>
  </Modal>);

Loader.propTypes = {
  isModalVisible: ProptTypes.bool.isRequired
};
    
Loader.defaultProps = {
  isModalVisible: false
};

export default Loader;