/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.components';
import Footer from './components/Footer/Footer.components';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.components';
import uuid from 'uuid';

import {
  Alert,
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
        onPress={this.popUpText(args)}>
        <Text style={styles.text}>{args.item.title}</Text>
        <Text>{args.item.text}</Text>
      </TouchableOpacity>
    </View>
  state ={
    text: '',
    textTitle: '',
    notes: []
  }
  popUpText =(arg) => () => {
    Alert.alert(
      arg.item.title,
      arg.item.text,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')}
      ],
      {cancelable: false}
    );
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
    console.log(newNotes);

    this.setState({textTitle: '', text: '', 'notes': newNotes});
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
      </View>
    );
  }
}
