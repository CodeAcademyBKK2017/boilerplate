import noop from 'lodash/noop';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './NoteList.style';
import Swipeout from 'react-native-swipeout';
import Touchable from 'react-native-platform-touchable';
import {connect} from 'react-redux';
import {
  FlatList, Text, View
} from 'react-native';

class NoteList extends Component {
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

    <View style={styles.dummyContainer}>
      <Touchable
        style={styles.itemTouch}
        background={Touchable.Ripple('blue')}
        onPress={this.onOpenOverlay(item)}>
        <Swipeout style={styles.swite} right={[
          {
            text: 'Open',
            color: '#ffffff',
            onPress: this.onOpenOverlay(item),
            backgroundColor: 'gray'
          },
          {
            text: 'Delete',
            onPress: this.props.onDeleteButtonPress(item),
            backgroundColor: 'red'
          }
        ]}>
          <View style={styles.itemContainer}>
            <View style={styles.noteContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemContent}>{item.content}</Text>
            </View>
            {/* <Touchable
            style={styles.deleteTouch}
            background={Touchable.Ripple('#d33')}
            onPress={this.props.onDeleteButtonPress(item)}>
            <Text style={styles.deleteTitle}>Delete</Text>
          </Touchable> */}
          </View>
        </Swipeout>
      </Touchable>
    </View>
    
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

const mapStateToProps = (storeState) => ({data: storeState.notes});

export default connect(mapStateToProps)(NoteList);