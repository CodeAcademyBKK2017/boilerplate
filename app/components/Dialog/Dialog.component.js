import noop from 'lodash/noop';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React from 'react';

import {
  Text
} from 'react-native';

const Dialog =  ({visible, title, content, onClose}) => (
  <Overlay visible={visible}
    onClose={onClose}
    closeOnTouchOutside animationType='zoomInUp'
    animationDuration={500}>
    <Text>{title}</Text>
    <Text>{content}</Text>
  </Overlay>
);

Dialog.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  onClose: noop
};
  
Dialog.defaultTypes = {
  visible: false,
  title: '',
  content: ''
};

export default Dialog;