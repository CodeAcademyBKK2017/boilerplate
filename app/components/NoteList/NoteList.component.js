
import noop from 'lodash/noop';
import noteListStyles from './NoteList.style';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Swipeout from 'react-native-swipeout';

import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class NoteList extends Component {

  state = {
    showModal: false,
    title: '',
    content: ''
  }

  onShowModal = (item) => () => {
    this.setState({showModal: true, title: item.title, content: item.content});
  }
  onCloseModal = () => {
    this.setState({showModal: false});
  }

  renderItem = ({item}) => 
    <Swipeout autoClose={true} right={[
      {
        text: 'View', onPress: this.onShowModal(item), backgroundColor: 'lightblue'
      },
      {
        text: 'Delete', onPress: this.props.onDeletePress(item), backgroundColor: 'red'
      }
    ]}>
      <View style={noteListStyles.container}>
        <TouchableOpacity >
          <View>
            <Text style={noteListStyles.noteListTitle}>{item.title}</Text>
            <Text style={noteListStyles.noteListContent}>{item.content}</Text>
          </View>
        </TouchableOpacity>
        
      </View>
    </Swipeout>
  render () {
    return (
      <View style={{maxHeight: 200}}>

        <FlatList data={this.props.notes} renderItem={this.renderItem}/>
        <Overlay visible={this.state.showModal}
          closeOnTouchOutside animationType='zoomIn'
          animationDuration={500} onClose={this.onCloseModal}>
          <Text style={noteListStyles.noteListTitle}>{this.state.title}</Text>
          <Text style={noteListStyles.noteListContent}>{this.state.content}</Text>
          
        </Overlay>
      </View>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.array
};
NoteList.defaultProps = {
  notes: []
};

NoteList.propTypes = {
  onDeletePress: PropTypes.func
};
NoteList.defaultProps = {
  onDeletePress: noop
};

export default NoteList;

