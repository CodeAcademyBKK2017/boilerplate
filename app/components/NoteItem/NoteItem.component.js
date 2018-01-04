import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './NoteItem.styles';
import Swipeout from 'react-native-swipeout';
import Touchable from 'react-native-platform-touchable';

import {
  Text,
  View
} from 'react-native';

class NoteItem extends Component {
  render () {
    const {data, onPressItem, onDeleteItem} = this.props;
    const swipeoutBtns = [
      {
        text: 'Delete',
        onPress: onDeleteItem(data),
        type: 'delete'
      }
    ];

    return (
      <Swipeout right={swipeoutBtns} style={styles.swipeOut}>
        <Touchable onPress={onPressItem(data)}>
          <View style={styles.container}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.content}>{data.content}</Text>
          </View>
        </Touchable>
      </Swipeout>
    );
  }
}

NoteItem.propTypes = {
  data: PropTypes.object,
  onPressItem: PropTypes.func,
  onDeleteItem: PropTypes.func
};

NoteItem.defaultTypes = {
  data: {key: '', title: '', content: ''},
  onPressItem: noop
};

export default NoteItem;

