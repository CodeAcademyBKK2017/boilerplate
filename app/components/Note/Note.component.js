import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Note.style';
import Touchable from 'react-native-platform-touchable';
import {FlatList, Text, View} from 'react-native';

export default class Note extends Component {
  initialstate ={
    modalVisible: false,
    title: '',
    content: ''
  }
    state = this.initialstate; 
onOpen=(title, content) => () => {
  this.setState({
    modalVisible: !this.state.modalVisible
    , title
    , content});
}
onClose=() => {
  this.setState(this.initialstate);
}

generateList = ({item}) => (
  <Touchable style={styles.box} onPress={this.onOpen(item.title, item.content)}>
    <View style={styles.noteBlock}>
      <View > 
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </View>
      <Touchable onPress={this.props.onDelete(item)}>
        <Text style={styles.del}>Delete</Text>
      </Touchable>
    </View>
  </Touchable>)
render () {
       
  return (
    <View style={styles.container}>
      <Text style={styles.header} >Notes:</Text>
      <FlatList data={this.props.noteList} renderItem={this.generateList} />
      <Overlay visible={this.state.modalVisible}
        closeOnTouchOutside={true}  
        onClose={this.onClose}
        animationType='slideInLeft'
        animationDuration={1000}>
        <Text style={styles.title}> {this.state.title}</Text>
        <Text style={styles.content}> {this.state.content}</Text>
      </Overlay>
    </View>
  );
}
}

Note.propTypes = {
  noteList: PropTypes.array,
  onDelete: PropTypes.func
};
  