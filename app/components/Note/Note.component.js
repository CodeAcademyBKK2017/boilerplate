import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Note.style';
import Touchable from 'react-native-platform-touchable';
import {FlatList, Text, View} from 'react-native';

export default class Note extends Component {
    state ={
      modalVisible: false,
      title: '',
      content: ''
    }
 
onOpen=(title, content) => () => {
  this.setState({
    modalVisible: !this.state.modalVisible
    , title
    , content});
}
onClose=() => {
  this.setState({modalVisible: false});
}
generateList = ({item}) => (
  <Touchable style={styles.box} onPress={this.onOpen(item.title, item.content)}>
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
      <Overlay visible={this.state.modalVisible}
        closeOnTouchOutside={true}  
        onClose={this.onClose}
        animationType='slideInLeft'
        containerStyle={styles.modalContainer}
        childrenWrapperStyle={styles.modalChildrenWrap}
        animationDuration={1000}>
        <Text style={styles.title}> {this.state.title}</Text>
        <Text style={styles.content}> {this.state.content}</Text>
      </Overlay>
    </View>
  );
}
}

Note.propTypes = {
  noteList: PropTypes.array
};
  