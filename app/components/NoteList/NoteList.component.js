
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

    // const containerStyles = (index % 2 !== 0) ? noteListStyles.whiteBackground : noteListStyles.greyBackground; // ternary operator
    <TouchableOpacity onPress={this.onShowModal(item)}>
      <View>
        <Text style={noteListStyles.noteListTitle}>{item.title}</Text>
        <Text style={noteListStyles.noteListContent}>{item.content}</Text>
      </View>
    </TouchableOpacity>

  render () {
    return (
      <View>

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

export default NoteList;

