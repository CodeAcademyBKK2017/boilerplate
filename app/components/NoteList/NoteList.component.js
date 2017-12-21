import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './NoteList.style.js';
import {
  FlatList,
  Text,
  View
} from 'react-native';

class NoteList extends Component {
  _keyExtractor = (item) => item.uuid;
  _renderItem = ({item}) => <View><Text style={styles.title}>{item.title}</Text><Text style={styles.content}>{item.content}</Text></View>;
    
  render () {
    return (
      <FlatList data={this.props.notes}
        extraData={this.props.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
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