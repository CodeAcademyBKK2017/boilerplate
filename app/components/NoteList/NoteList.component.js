
import noop from 'lodash/noop';
import noteListStyles from './NoteList.style';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

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
    <View style={noteListStyles.container}>
      <TouchableOpacity onPress={this.onShowModal(item)}>
        <View>
          <Text style={noteListStyles.noteListTitle}>{item.title}</Text>
          <Text style={noteListStyles.noteListContent}>{item.content}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.props.onDeletePress(item)}>
        <View>
          <Text style={noteListStyles.delete}>Delete</Text>
        </View>
      </TouchableOpacity>
    </View>
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

