import Overlay from 'react-native-modal-overlay';
import React, {Component} from 'react';
import styles from './loader.style';
import {ActivityIndicator, Modal, View} from 'react-native';

export default class Loader extends Component {
  render () {
    return (
      <Modal
        visible={this.props.isVisible}
        animationType={'fade'}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
        </View>
      </Modal>
    );
  }
}