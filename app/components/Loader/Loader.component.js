import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Loader.style';
import {
  ActivityIndicator,
  Modal,
  View
} from 'react-native';

class Loader extends Component {
    state = {
      modalVisible: true
    };
    openModal () {
      this.setState({modalVisible: true});
    }
    closeModal () {
      return this.setState({modalVisible: false});
    }
    render () {
      return (
        <Modal
          visible={this.props.visible}
          transparent={this.props.transparent}
          animationType={'fade'}
          onRequestClose={this.closeModal}
        >
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size='large' color='#cc0000' />
          </View>
        </Modal>
      );
    }
}

Loader.propTypes = {
  visible: PropTypes.bool,
  transparent: PropTypes.bool
};
  
Loader.defaultProps = {
  visible: 'true',
  transparent: 'false'
};

export default Loader;