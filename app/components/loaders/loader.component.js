import Overlay from 'react-native-modal-overlay';
import React, {Component} from 'react';
import styles from './loader.style';
import {ActivityIndicator} from 'react-native';

export default class Loader extends Component {
  render () {
    return (
      <Overlay visible={this.props.isVisible}
        closeOnTouchOutside
        animationType='zoomIn'
        animationDuration={500}
        style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size='large' color='#0000ff' />
      </Overlay>
    );
  }
}