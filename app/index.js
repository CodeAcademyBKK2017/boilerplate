/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import ApiNotes from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Note from './components/Note/Note.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.component';
import uuid from 'uuid';
import {Alert, AsyncStorage, KeyboardAvoidingView, Platform, Text, View} from 'react-native';

export default class App extends Component {
  initialstate = {
    content: '',
    title: '',
    note: []
  }
   init = async () => {
     try {
       const response = await new ApiNotes().getNotes();
  
       this.setState({
         note: response
       });
     } catch (error) {
       const value = await AsyncStorage.getItem('storageNote');
       let note;
       if (value) {
         note = JSON.parse(value);
       } else {
         note = [];
       }
  
       this.setState({
         note
       });
     }
   
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
  onSave = async () => {
    try {
      const note =   {
        title: this.state.title,
        content: this.state.content,
        key: uuid()
      };
      await new ApiNotes().addNote(note);
      const newNote = [...this.state.note];
      newNote.push(note);
      await AsyncStorage.setItem('storageNote', JSON.stringify(newNote));
      const newState = {
        textTitle: '',
        textContent: '',
        notes: newNote
      };
      this.setState(newState);
     
    } catch (error) {
      Alert.alert(
        'Save Failed',
        String(error),
        [
          {text: 'OK', onPress: () => {}}
        ],
        {
          cancelable: false
        }
      );
    }
  }

  onDelete=(item) => async () => {
    try {
      await new ApiNotes().deleteNote(item.id);
      const delNote = [...this.state.note];
      const isDelete = (value) => value !== item;
      const remainNote = delNote.filter(isDelete);
      this.setState({note: remainNote});
      AsyncStorage.setItem('storageNote', JSON.stringify(remainNote));
    } catch (error) {
      Alert.alert(
        'Delete Failed',
        String(error),
        null,
        {
          cancelable: false
        }
      );
    }
  }

  goToAbout = () => {
    this.props.navigation.navigate('About');
  }
  
  render () {

    return (
      <this.WrapperView style={styles.container} behavior={'padding'} >
        <Title onTitleChange={this.changeTitle}/>
        <Content  onContentChange={this.changeContent} />
        <Footer characterCount={this.state.content.length} onPressSave={this.onSave} />
        {this.state.note.length > 0 ? <Note noteList={this.state.note} onDelete={this.onDelete}/> : null}
        <View><Text onPress={this.goToAbout}>about us</Text></View>
      </this.WrapperView>
    );
  }
}

App.propTypes = {
  navigation: PropTypes.object
};
