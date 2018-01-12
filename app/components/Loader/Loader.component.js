import React, {Component} from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  View
} from 'react-native';

export default class Loader extends Component {
  render () {
    return (
      
      <Modal
        visible={this.props.showLoader}
        animationType={'slide'}
        transparent={true}
      >
        <View style={[styles.container]}>
          <ActivityIndicator color='#0000ff' />
        </View>
      </Modal>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});