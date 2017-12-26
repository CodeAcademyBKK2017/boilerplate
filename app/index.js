/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Note from './components/Note/Note.component';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.component';
import uuid from 'uuid';
import {AsyncStorage, KeyboardAvoidingView, Platform, View} from 'react-native';

export default class App extends Component {
  initialstate = {
    content: '',
    title: '',
    note: []
  }
  init =() => {
    AsyncStorage.getItem('storageNote')
      .then((data) => {
        const storageData = data ?  JSON.parse(data) : [];
        this.setState({note: storageData});
      }); 
  }
  componentDidMount () {
    this.init();
  }
state = this.initialstate
  WrapperView = Platform.select(
    {ios: KeyboardAvoidingView,
      android: View
    }
  )
  changeTitle  = (text) => {
    this.setState({title: text});
  }
  changeContent  = (text) => {
    this.setState({content: text});
  }
  onSave = () => {
    const newNote =  [...this.state.note, {
      title: this.state.title,
      content: this.state.content,
      key: uuid()
    }];
    // newNote.push({title: this.state.title, content: this.state.content});
    this.setState({note: newNote});
    AsyncStorage.setItem('storageNote', JSON.stringify(newNote));
  }

  onDelete=(item) => () => {
    const delNote = [...this.state.note];
    const isDelete = (value) => value.key !== item.key;
    const remainNote = delNote.filter(isDelete);
    this.setState({note: remainNote});
  }
  
  render () {

    return (
      <this.WrapperView style={styles.container} behavior={'padding'} >
        <Title onTitleChange={this.changeTitle}/>
        <Content  onContentChange={this.changeContent} />
        <Footer characterCount={this.state.content.length} onPressSave={this.onSave} />
        {this.state.note.length > 0 ? <Note noteList={this.state.note} onDelete={this.onDelete}/> : null}
      </this.WrapperView>
    );
  }
}

