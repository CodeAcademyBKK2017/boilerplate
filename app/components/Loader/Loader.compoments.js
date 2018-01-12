import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Loader.compoments.style';
import {ActivityIndicator, Modal, View
} from 'react-native';

export default class Loader extends Component {
  render () {
    return (
      <Modal transparent={true} visible={this.props.show} style={[styles.container, styles.horizontal]}>
        <View  style={styles.containerView}>
          <ActivityIndicator animating={this.props.show} size='large' color='#0000ff' />
        </View>
      </Modal>
    );
  }
}

Loader.propTypes = {
  show: PropTypes.bool
};
  