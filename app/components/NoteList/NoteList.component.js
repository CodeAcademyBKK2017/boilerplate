import noop from 'lodash/noop';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './NoteList.style';
import Swipeout from 'react-native-swipeout';
import Touchable from 'react-native-platform-touchable';

import {
  FlatList, Text, View
} from 'react-native';

export default class NoteList extends Component {
  state = {
    modalVisible: false,
    selectedNoteItem: {}
  }

  onOpenOverlay = (item) => () => {
    this.setState({
      modalVisible: true,
      selectedNoteItem: item
    });
  }

  onCloseOverlay = () => {
    this.setState({
      modalVisible: false,
      selectedNoteItem: {}
    });
  }

  _keyExtractor = (item) => item.id;

  renderItem = ({item}) => {
    const swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        onPress: this.props.onDeleteButtonPress(item)
      }
    ];

    return (
      <View style={styles.dummyContainer}>
        <Touchable
          style={styles.itemTouch}
          background={Touchable.Ripple('blue')}
          onPress={this.onOpenOverlay(item)}>
          <Swipeout
            right={swipeoutBtns}
            backgroundColor='transparent'
            style={styles.itemSwipe}>
            <View style={styles.itemContainer}>
              <View style={styles.noteContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemContent}>{item.content}</Text>
              </View>
            </View>
          </Swipeout>
        </Touchable>
      </View>
    );
  };

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.noteTitle}>Notes:</Text>
        <FlatList
          data={this.props.data}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}/>
        <Overlay visible={this.state.modalVisible}
          closeOnTouchOutside
          animationType='zoomIn'
          animationDuration={500}
          onClose={this.onCloseOverlay}>
          <Text>{this.state.selectedNoteItem.title}</Text>
          <Text>{this.state.selectedNoteItem.content}</Text>
        </Overlay>
      </View>
    );
  }
}

NoteList.propTypes = {
  data: PropTypes.array.isRequired,
  onDeleteButtonPress: PropTypes.func.isRequired
};

NoteList.defaultProps = {
  data: [],
  onDeleteButtonPress: noop
};
