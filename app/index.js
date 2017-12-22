/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import NoteList from './components/NoteList/NoteList.component';
import Overlay from 'react-native-modal-overlay';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.component';
import uuid from 'uuid';
import {
  Alert, KeyboardAvoidingView, Platform, Text, View
} from 'react-native';

export default class App extends Component {
  state = {
    textTitle: '',
    textContent: '',
    notes: [],
    modalVisible: false,
    selectedNoteItem: {}
  }

  WrapperView = Platform.select({
    ios: KeyboardAvoidingView,
    android: View
  });

  onChangeTextTitle = (textTitle) => {
    this.setState({textTitle});
  }

  onChangeTextContent = (textContent) => {
    this.setState({textContent});
  }

  onSaveButtonPress = () => {
    const notes = [...this.state.notes];
    const note = {
      key: uuid(),
      title: this.state.textTitle,
      content: this.state.textContent,
      isEven: (notes.length % 2 === 0)
    };
    notes.push(note);

    const newState = {
      textTitle: '',
      textContent: '',
      notes
    };
    this.setState(newState);
  }

  onNoteItemPress = (item) => () => {
    // Alert.alert(item.title, item.content);
    // Alert.alert(
    //   item.title,
    //   item.content,
    //   [
    //     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    //     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //     {text: 'OK', onPress: () => console.log('OK Pressed')}
    //   ],
    //   {cancelable: false}
    // );
    this.setState({
      modalVisible: true,
      selectedNoteItem: item
    });
  };

  onCloseOverlay = () => {
    this.setState({
      modalVisible: false,
      selectedNoteItem: {}
    });
  }

  render () {
    return (
      <this.WrapperView
        style={[styles.container]}
        behavior='padding'>
        <Title
          text={this.state.textTitle}
          onChangeTextTitle={this.onChangeTextTitle}/>
        <Content
          style={styles.fill}
          text={this.state.textContent}
          onChangeTextContent={this.onChangeTextContent}/>
        <Footer
          textContentLength={this.state.textContent.length}
          onSaveButtonPress={this.onSaveButtonPress}/>
        {
          this.state.notes.length > 0 ? <NoteList data={this.state.notes} onItemPress={this.onNoteItemPress}/> : null
        }
        <Overlay visible={this.state.modalVisible}
          closeOnTouchOutside={true}
          animationType='zoomIn'
          containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
          childrenWrapperStyle={{backgroundColor: '#eee'}}
          animationDuration={500}
          onClose={this.onCloseOverlay}>
          <Text>{this.state.selectedNoteItem.title}</Text>
          <Text>{this.state.selectedNoteItem.content}</Text>
        </Overlay>
      </this.WrapperView>
    );
  }
}
