/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.components';
import Footer from './components/Footer/Footer.components';
import Overlay from 'react-native-modal-overlay';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.components';
import uuid from 'uuid';

import {
  AsyncStorage,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class App extends Component {
  _keyExtractor  = (item) => item.unique;
  _renderItem = (args) => 
    <View>
      <TouchableOpacity
        onPress={this.modalOpen(args)}>
        <Text style={styles.text}>{args.item.title}</Text>
        <Text>{args.item.text}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={this.deleteNote(args.item.unique)}>
        <Text style={styles.del}>DELETE</Text>
      </TouchableOpacity>
    </View>
  state ={
    text: '',
    textTitle: '',
    notes: [],
    modalVisible: false,
    modalText: []
  }
  deleteNote =(uuid) => () => {
    const res = this.state.notes.filter((element) => element.unique !== uuid);
    this.setState(
      {textTitle: '', text: '', 'notes': res}, () => {
        AsyncStorage.setItem('NOTES', JSON.stringify(this.state));
      }
    );
  }
  componentDidMount () {
    AsyncStorage.getItem('NOTES').then((res) => {
      this.setState(JSON.parse(res));
    });
  }
  texts =(v) => {
    this.setState({text: v});
  }
  onTitle =(v) => {
    this.setState({textTitle: v});
  }
  noteTitle =() => { 
    
    const data = {'text': this.state.text, 'title': this.state.textTitle, 'unique': uuid()};
    const newNotes = [data, ...this.state.notes];
    // console.log(newNotes);

    this.setState(
      {textTitle: '', text: '', 'notes': newNotes}, () => {
        AsyncStorage.setItem('NOTES', JSON.stringify(this.state));
      }
    );

  }
  modalOpen =(arg) => () => {
    const data = {'title': arg.item.title, 'text': arg.item.text};
    this.setState({
      modalVisible: true,
      modalText: data
    });
  }
  modalonClose =() => {
    this.setState({
      modalVisible: false
    });
  }
  
  render () {
    return (
      <View style={styles.container}>  
        <Title titles={this.onTitle} text={this.state.textTitle}/>
        <Content  fn={this.texts} text={this.state.text}/>
        <Footer texts={this.state.text} noteTitles={this.noteTitle} />
        <Text style={styles.textNote}>Notes:</Text>
        <FlatList style={styles.flatLits}
          data={this.state.notes}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <Overlay visible={this.state.modalVisible}
          onClose={this.modalonClose}
          closeOnTouchOutside animationType='zoomIn'
          animationDuration={500}>
          <Text>{this.state.modalText.title}</Text>
          <Text>{this.state.modalText.text}</Text>
        </Overlay>
      </View>
    );
  }
}
