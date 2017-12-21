import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Note.style';
import {FlatList, Text, View} from 'react-native';

export default class Note extends Component {
    generateList = ({item}) => <View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
    render () {
      return (
        <FlatList data={this.props.noteList} renderItem={this.generateList} />
      );
    }
}

Note.propTypes = {
  noteList: PropTypes.array
};
  