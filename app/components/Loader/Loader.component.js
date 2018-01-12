import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Loader.style';
import {
  ActivityIndicator,
  View

} from 'react-native';

export default class Loader extends Component {
  render () {
    return (
      <Overlay visible={this.props.modalShow.isLoaderVisible}
        closeOnTouchOutside animationType='zoomIn'
        animationDuration={500} onClose={this.onCloseModal}>
        <View style={styles.container}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      </Overlay>
     
    );
  }
}

Loader.propTypes = {
  modalShow: PropTypes.object
};

Loader.defaultProps = {
  modalShow: {}
};