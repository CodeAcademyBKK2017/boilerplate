import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './NoteList.style';
import {
  FlatList, Text, View
} from 'react-native';

export default class NoteList extends Component {
  renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemContent}>{item.content}</Text>
    </View>
  );

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.noteTitle}>Notes:</Text>
        <FlatList
          data={this.props.data}
          renderItem={this.renderItem}/>
      </View>
    );
  }
}

NoteList.propTypes = {
  data: PropTypes.array.isRequired
};

NoteList.defaultProps = {
  data: []
};
