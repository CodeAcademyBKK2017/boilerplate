import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Loader.style';
import {ActivityIndicator} from 'react-native';

export default class Loader extends Component {
  render () {
    const showHide = this.props.visibility;
    return (
      <Overlay visible={showHide.isVisible}
        closeOnTouchOutside={true}  
        animationType='slideInLeft'
        animationDuration={1000} 
        containerStyle={styles.containerModal}
        childrenWrapperStyle={styles.childrenModal}>
        <ActivityIndicator size='large' color='#32ff00' />
      </Overlay>
    );
  }
}
Loader.propTypes = {
  visibility: PropTypes.object
};
  