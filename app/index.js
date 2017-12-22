import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import NoteItem from './components/NoteItem/NoteItem.component';
import Overlay from 'react-native-modal-overlay';
import React, {Component} from 'react';
import shortid from 'shortid';
import styles from './index.styles';
import Title from './components/Title/Title.component';

import {
  Alert, AsyncStorage, FlatList, Text, View
} from 'react-native';

export default class App extends Component {
  state = {
    currentTitle: '',
    currentContent: '',
    notes: [],
    modalVisible: false,
    selectedNote: {key: '', title: '', content: ''}
  }

  componentDidMount () {
    AsyncStorage.getItem('notes').then((notes) => JSON.parse(notes)).then((notes) => {
      this.setState({notes});
    });
  }

  onTitleChangeText = (currentTitle) => {
    this.setState({currentTitle});
  }

  onContentChangeText = (currentContent) => {
    this.setState({currentContent});
  }

  onSaveButtonPress = () => {
    const {notes, currentTitle, currentContent} = this.state;
    const newNotes = [...notes];

    newNotes.push({
      key: shortid(),
      title: currentTitle,
      content: currentContent
    });

    AsyncStorage.setItem('notes', JSON.stringify(newNotes));

    this.setState({
      notes: newNotes,
      currentTitle: '',
      currentContent: ''
    });
  }

  _onPressItem = (item) => () => {
    this.setState({
      modalVisible: true,
      selectedNote: item
    });
  }

  _onLongPressItem = (note) => () => {
    Alert.alert(
      'Confirm',
      'Are you want to delete this note item?',
      [
        {text: 'Cancel'},
        {text: 'Delete', style: 'destructive', onPress: () => this._removeNoteItem(note)}
      ]
    );
    
  }

  _removeNoteItem = (deleteNote) => {
    const newNotes = this.state.notes.filter((note) => note !== deleteNote);

    AsyncStorage.setItem('notes', JSON.stringify(newNotes));

    this.setState({
      notes: newNotes
    });
  }

  _hideOverlay = () => {
    this.setState({modalVisible: false});
  }

  _renderItem = ({item}) => (<NoteItem data={item} onPressItem={this._onPressItem} onLongPressItem={this._onLongPressItem} />)

  render () {
    return (
      <View style={styles.container}>
        <Title onChangeText={this.onTitleChangeText} value={this.state.currentTitle} />
        <Content onChangeText={this.onContentChangeText} value={this.state.currentContent} />
        <Footer characterCount={this.state.currentContent.length} onSaveButtonPress={this.onSaveButtonPress} />
        <View style={styles.list}>
          <FlatList data={this.state.notes} renderItem={this._renderItem}  />
        </View> 
        
        <Overlay visible={this.state.modalVisible}
          onClose={this._hideOverlay}
          closeOnTouchOutside animationType='zoomInUp'
          animationDuration={500}>
          <Text>{this.state.selectedNote.title}</Text>
          <Text>{this.state.selectedNote.content}</Text>
        </Overlay>
      </View>
    );
  }
}