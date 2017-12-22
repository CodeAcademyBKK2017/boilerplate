import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './NoteList.style.js';
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
  renderItem = ({item}) => <TouchableOpacity onPress={this.showModal(item)}><View><Text style={styles.title}>{item.title}</Text><Text style={styles.content}>{item.content}</Text></View></TouchableOpacity>;
  showModal = (item) => () => {
    this.setState({modalVisible: true, modalTitle: item.title, modalContent: item.content});
  }
  onModalClose = () => {
    this.setState({modalVisible: false});
  }
  render () {
    return (
      <View>
        <FlatList data={this.props.notes}
          extraData={this.props.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        <Overlay visible={this.state.modalVisible}
          closeOnTouchOutside animationType='zoomIn'
          containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
          childrenWrapperStyle={{backgroundColor: '#eee'}}
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
  state: PropTypes.object
};
NoteList.defaultProps = {
  notes: [],
  state: {}
};

export default NoteList;