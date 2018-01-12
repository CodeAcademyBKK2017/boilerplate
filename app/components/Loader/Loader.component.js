import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Loader.style';
import {ActivityIndicator, Modal, View} from 'react-native';

export default class Loader extends Component {
  render () {
    return (
      <Modal
        visible={this.props.visible}
        animationType={'fade'}
        transparent={true}>
        <View style={styles.container}>
          <ActivityIndicator size='large'/>
        </View>
      </Modal>
    );
  }
}

Loader.propTypes = {
  visible: PropTypes.bool.isRequired
};

Loader.defaultProps = {
  visible: false
};
