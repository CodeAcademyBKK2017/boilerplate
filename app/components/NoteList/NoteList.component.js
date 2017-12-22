import noop from 'lodash/noop';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './NoteList.style';
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

  renderItem = ({item}) => (
    <Touchable
      style={[styles.itemTouch, item.isEven ? styles.evenContainer : styles.oddContainer]}
      background={Touchable.Ripple('blue')}
      onPress={this.onOpenOverlay(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.noteContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemContent}>{item.content}</Text>
        </View>
        <Touchable
          style={styles.deleteTouch}
          background={Touchable.Ripple('red')}
          onPress={this.props.onDeleteButtonPress(item)}>
          <Text style={styles.deleteTitle}>Delete</Text>
        </Touchable>
      </View>
    </Touchable>
  );

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.noteTitle}>Notes:</Text>
        <FlatList
          data={this.props.data}
          renderItem={this.renderItem}/>
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
