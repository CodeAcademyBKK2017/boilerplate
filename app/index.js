/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.component.js';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.component';
import uuid from 'uuid';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class App extends Component {

  state = {
    title: '',
    text: '',
    NOTES: []
  }

  onCount = (v) => this.setState({text: v});
  onTitle = (v) => this.setState({title: v});
  saveNote = () => {
    const data = {'title': this.state.title, 'content': this.state.text, 'unique': uuid()};
    const newNotes = [...this.state.NOTES, data];
    this.setState(
      {title: '', text: '', 'NOTES': newNotes}, () => {
        console.log(this.state.NOTES);
      }
    );
  }
  modalBox = (args) =>  () => {
    Alert.alert(
      args.item.title,
      args.item.content,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      {cancelable: false}
    );
  }
  _keyExtractor = (item) => item.unique;
  _renderItem = (args) => 
    <View>
      <TouchableOpacity
        onPress={this.modalBox(args)}>
        <Text style={styles.flatText}>{args.item.title}</Text>
        <Text>{args.item.content}</Text>
      </TouchableOpacity>
    </View>
  render () {
    return (
      <View style={styles.container}>
        <Title titles={this.onTitle} textTitle={this.state.title}/>
        <Content texts={this.state.text} Fn={this.onCount}
          FnSave={this.saveNote}/>
        {/* <Text style={styles.flatTitle}>Notes:</Text> */}
        <View style={styles.conFlat}>
          <FlatList
            style={styles.flat}
            data={this.state.NOTES}
            extraData={this.state}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </View>
    );
  }
}

