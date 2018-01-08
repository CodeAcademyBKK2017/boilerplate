import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Note.style';
import Swipeout from 'react-native-swipeout';
import Touchable from 'react-native-platform-touchable';
import {connect} from 'react-redux';
import {FlatList, Text, View} from 'react-native';

class Note extends Component {
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

generateList = ({item}) => {
  const  swipeoutBtns = [
    {
      text: 'Delete',
      onPress: this.props.onDelete(item),
      backgroundColor: 'red'

    }
  ];
  return (
    <Swipeout right={swipeoutBtns} style={styles.swipeout}>
      <Touchable style={styles.box} onPress={this.onOpen(item.title, item.content)}>
        <View style={styles.noteBlock}>
          <View > 
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
          <View>
            <Text>Swipe me left</Text>
          </View>
        </View>
      </Touchable>
    </Swipeout>
  );
}
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
const mapStateToProps = (storeState) => ({noteList: storeState.notes});
export default connect(mapStateToProps)(Note);