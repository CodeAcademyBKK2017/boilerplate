import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Note.style';
import Touchable from 'react-native-platform-touchable';
import {Alert, FlatList, Text, View} from 'react-native';

export default class Note extends Component {
    popup =(title, content) => () => { 
      Alert.alert(title, content); 
    }

    generateList = ({item}) => (
      <Touchable style={styles.box}  onPress={this.popup(item.title, item.content)}>
        <View > 
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      </Touchable>)
    render () {
      return (
        <View style={styles.container}>
          <Text style={styles.header} >Notes:</Text>
          <FlatList data={this.props.noteList} renderItem={this.generateList} />
        </View>
      );
    }
}

Note.propTypes = {
  noteList: PropTypes.array
};
  