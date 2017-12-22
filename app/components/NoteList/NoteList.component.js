import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './NoteList.style';
import Touchable from 'react-native-platform-touchable';
import {
  FlatList, Text, View
} from 'react-native';

export default class NoteList extends Component {
  renderItem = ({item}) => (
    <Touchable
      style={styles.itemTouch}
      background={Touchable.Ripple('blue')}
      onPress={this.props.onItemPress}>
      <View style={[styles.itemContainer, item.isEven ? styles.evenContainer : styles.oddContainer]}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemContent}>{item.content}</Text>
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
      </View>
    );
  }
}

NoteList.propTypes = {
  data: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired
};

NoteList.defaultProps = {
  data: [],
  onItemPress: noop
};
