import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import stylesLoader from './Loader.style';
import {ActivityIndicator} from 'react-native';

export default class ListItem extends Component {

  render () {
    return <Overlay
      containerStyle={stylesLoader.transparentStyle}
      childrenWrapperStyle={stylesLoader.transparentStyle}
      visible={this.props.modalVisibility}
      onClose={this.onCloseModal} closeOnTouchOutside={true}>
      <ActivityIndicator size='large'/>
    </Overlay>;
  }
}

ListItem.propTypes = {
  modalVisibility: PropTypes.bool.isRequired
};

ListItem.defaultProps = {
  modalVisibility: true
};