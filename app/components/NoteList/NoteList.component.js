
import noteListStyles from './NoteList.style';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  FlatList,
  Text,
  View
} from 'react-native';

class NoteList extends Component {
  renderItem = ({item}) => 
    <View>
      <Text style={noteListStyles.noteList}>Notes: </Text>
      <Text style={noteListStyles.noteListTitle}>{item.title}</Text>
      <Text style={noteListStyles.noteListContent}>{item.content}</Text>
    </View>

  render () {
    return (
      <FlatList data={this.props.notes} renderItem={this.renderItem}/>
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

