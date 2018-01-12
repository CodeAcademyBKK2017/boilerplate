import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View

} from 'react-native';

export default class Loader extends Component {
  render () {
    return (
      <Overlay visible={this.props.isLoaderVisible}
        closeOnTouchOutside animationType='zoomIn'
        animationDuration={500} onClose={this.onCloseModal}>
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      </Overlay>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

Loader.propTypes = {
  isLoaderVisible: PropTypes.bool
};