/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import noop from 'lodash/noop';
import Overlay from 'react-native-modal-overlay';
import ProptTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './overlay.style';
import {
  Text,
  View
} from 'react-native';

export default class overlay extends Component {
    
  render () {
    const {item, modalVisible, closeModal} = this.props;
    return (
      <View style={styles.container}>
        <Overlay visible={modalVisible}
          closeOnTouchOutside animationType='zoomIn'
          containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
          childrenWrapperStyle={{backgroundColor: '#eee'}}
          animationDuration={500}
          onClose={closeModal}>
          <Text>{item.title}</Text>
          <Text>{item.content}</Text>
        </Overlay>
      </View>
    );

  }
}
overlay.propTypes = {
  item: ProptTypes.object.isRequired,
  modalVisible: ProptTypes.bool.isRequired,
  closeModal: ProptTypes.func.isRequired
};
  
overlay.defaultProps = {
  item: {},
  modalVisible: true,
  closeModal: noop
};