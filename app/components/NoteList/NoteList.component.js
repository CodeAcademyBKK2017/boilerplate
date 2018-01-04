import noop from 'lodash/noop';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './NoteList.style.js';
import Swipeout from 'react-native-swipeout';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class NoteList extends Component {
  state = {
    modalVisible: false,
    modalTitle: '',
    modalContent: ''
  }  
  keyExtractor = (item) => item.uuid;
  // renderItem = ({item}) => <TouchableOpacity onPress={this.showAlert(item)}><View><Text style={styles.title}>{item.title}</Text><Text style={styles.content}>{item.content}</Text></View></TouchableOpacity>;
  // showAlert = (item) => () => Alert.alert(item.title, item.content)
  renderItem = ({item}) => <Swipeout autoClose={true} right={[
    {
      text: 'Info',
      onPress: this.showModal(item),
      backgroundColor: '#003'
    },
    {
      text: 'Cancel',
      backgroundColor: '#666'
    },
    {
      text: 'Delete',
      onPress: this.props.onDeleteNote({uuid: item.uuid}),
      backgroundColor: '#900'
    }
  ]}>
    <View style={styles.noteListContainer}>
      <TouchableOpacity onPress={this.showModal(item)}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={this.props.onDeleteNote({uuid: item.uuid})}>
        <View>
          <Text style={styles.delete}>Delete</Text>
        </View>
      </TouchableOpacity> */}
    </View>
  </Swipeout>;
  showModal = (item) => () => {
    this.setState({modalVisible: true, modalTitle: item.title, modalContent: item.content});
  }
  onModalClose = () => {
    this.setState({modalVisible: false});
  }
  styleFlatList = {padding: 10, backgroundColor: '#dbddde'}
  render () {
    return (
      <View>
        <FlatList data={this.props.notes}
          extraData={this.props.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          style={this.styleFlatList}
        />
        <Overlay visible={this.state.modalVisible}
          closeOnTouchOutside animationType='zoomIn'
          // containerStyle={styles.modalContainer}
          // childrenWrapperStyle={styles.modalChildrenWrapper}
          animationDuration={500}
          onClose={this.onModalClose}
        >
          <Text style={styles.modalTitle}>{this.state.modalTitle}</Text>
          <Text style={styles.modalContent}>{this.state.modalContent}</Text>
        </Overlay>
      </View>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.array,
  state: PropTypes.object,
  onDeleteNote: PropTypes.func
};
NoteList.defaultProps = {
  notes: [],
  state: {},
  onDeleteNote: noop
};

export default NoteList;