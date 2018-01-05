import API from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Icon from 'react-native-vector-icons/FontAwesome';
import NoteItem from './components/NoteItem/NoteItem.component';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import shortid from 'shortid';
import Snackbar from 'react-native-snackbar';
import styles from './index.styles';
import Title from './components/Title/Title.component';

import Touchable from 'react-native-platform-touchable';

import {
  AsyncStorage, FlatList, Text, View
} from 'react-native';

const warningBar = {
  title: 'Offline Mode: Can\'t connect to server.',
  duration: 3000,
  backgroundColor: '#d9bf56'
};

export default class Main extends Component {
  static navigationOptions = ({navigation}) => {
    const toggleDrawer = (navigation) => () => navigation.navigate('DrawerToggle');
    return {
      title: 'Start taking notes',
      headerLeft: <Touchable onPress={toggleDrawer(navigation)}><Icon name='bars' size={24} /></Touchable>
    };
  }

  state = {
    currentTitle: '',
    currentContent: '',
    notes: [],
    modalVisible: false,
    selectedNote: {key: '', title: '', content: ''}
  }

  componentDidMount () {
    this.loadData();
  }

  loadData = async () => {
    let notes = null;

    try {
      notes = await API.getNotes();
    } catch ($e) {
      notes = JSON.parse(await AsyncStorage.getItem('notes') || []);
      Snackbar.show(warningBar);
    }  

    this.setState({notes});
  }

  onTitleChangeText = (currentTitle) => {
    this.setState({currentTitle});
  }

  onContentChangeText = (currentContent) => {
    this.setState({currentContent});
  }

  onSaveButtonPress = () => {
    const {notes, currentTitle, currentContent} = this.state;
    
    const saveNote = {
      key: shortid(),
      title: currentTitle,
      content: currentContent
    };
    
    API.addNote(saveNote).then(() => {
      const newNotes = [...notes, saveNote];
      
      AsyncStorage.setItem('notes', JSON.stringify(newNotes));

      this.setState({
        notes: newNotes,
        currentTitle: '',
        currentContent: ''
      });
    }).catch(() => {
      Snackbar.show(warningBar);
    });
  }

  _onPressItem = (item) => () => {
    this.setState({
      modalVisible: true,
      selectedNote: item
    });
  }

  _onDeleteItem = (note) => () => {
    this._removeNoteItem(note);
  }

  _removeNoteItem = (deleteNote) => {
    API.deleteNote(deleteNote.id).then(() => {
      const newNotes = this.state.notes.filter((note) => note !== deleteNote);
      
      AsyncStorage.setItem('notes', JSON.stringify(newNotes));

      this.setState({
        notes: newNotes
      });
    }).catch(() => {
      Snackbar.show(warningBar);
    });
  }

  _hideOverlay = () => {
    this.setState({modalVisible: false});
  }

  _goToAbout = () => {
    this.props.navigation.navigate('AboutTab');
  }

  _renderItem = ({item}) => (<NoteItem data={item} onPressItem={this._onPressItem} onDeleteItem={this._onDeleteItem} />)

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
        
        <Touchable onPress={this._goToAbout}><Text>Go to About</Text></Touchable>
      </View>
    );
  }
}

Main.propTypes = {
  navigation: PropTypes.any
};