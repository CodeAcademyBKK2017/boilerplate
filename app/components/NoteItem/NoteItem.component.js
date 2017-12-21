import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './NoteItem.styles';
import Touchable from 'react-native-platform-touchable';
import {
  Text,
  View
} from 'react-native';

class NoteItem extends Component {
    _onPress = () => {
      this.props.onPressItem(this.props.data);
    };

    render () {
      const {data} = this.props;

      return (
        <Touchable onPress={this._onPress} >
          <View style={styles.container}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.content}>{data.content}</Text>
          </View>
        </Touchable>
      );
    }
}

NoteItem.propTypes = {
  data: PropTypes.object,
  onPressItem: PropTypes.func
};

NoteItem.defaultTypes = {
  data: {key: '', title: '', content: ''},
  onPressItem: noop
};

export default NoteItem;

