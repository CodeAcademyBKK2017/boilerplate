/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import noop from 'lodash/noop';
import Overlay from 'react-native-modal-overlay';
import ProptTypes from 'prop-types';
import React, {Component} from 'react';
import {
  Text
} from 'react-native';

export default class overlay extends Component {
    
  render () {
    const {item, modalVisible, closeModal} = this.props;
    return (
      <Overlay visible={modalVisible}
        closeOnTouchOutside animationType='zoomIn'
        animationDuration={500}
        onClose={closeModal}>
        <Text>{item.title}</Text>
        <Text>{item.content}</Text>
      </Overlay>
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