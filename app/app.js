import API from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Icon from 'react-native-vector-icons/FontAwesome';
import NoteItem from './components/NoteItem/NoteItem.component';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import SnackBar from 'react-native-snackbar';
import styles from './app.styles';
import Title from './components/Title/Title.component';
import Touchable from 'react-native-platform-touchable';
import {
  AsyncStorage, FlatList, Text, View
} from 'react-native';

import {connect} from 'react-redux';

const warningBar = () => ({
  title: 'Network errors: Can\'t connect to server.',
  duration: 3000,
  backgroundColor: '#d9bf56'
});

class App extends Component {
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
    modalVisible: false,
    selectedNote: {id: '', title: '', content: ''}
  }

  componentDidMount () { 
    this.loadData();
  }

  loadData = async () => {
    let notes = [];

    try {
      notes = await API.getNotes();
    } catch (e) {
      notes = JSON.parse(await AsyncStorage.getItem('notes')) || [];
      SnackBar.show(warningBar());
    }

    this.props.populateNotes(notes);
  }

  onTitleChangeText = (currentTitle) => {
    this.setState({currentTitle});
  }

  onContentChangeText = (currentContent) => {
    this.setState({currentContent});
  }

  onSaveButtonPress = () => {
    const {currentTitle, currentContent} = this.state;
    
    const saveNote = {
      title: currentTitle,
      content: currentContent
    };
    
    return API.addNote(saveNote)
      .then((res) => res.json())
      .then((noteWithID) => {
        this.props.addNote(noteWithID);

        this.setState({
          currentTitle: '',
          currentContent: ''
        });

        return AsyncStorage.setItem('notes', JSON.stringify([...this.props.notes, noteWithID]));
      })
      .catch(() => {
        SnackBar.show(warningBar());
        throw new Error('API Error');
      });
  }

  _onPressItem = (item) => () => {
    this.setState({
      modalVisible: true,
      selectedNote: item
    });
  }

  _onDeleteItem = (note) => () => this._removeNoteItem(note)

  _removeNoteItem = (deleteNote) => {
    const newNotes = this.props.notes.filter((note) => note !== deleteNote);

    return API.deleteNote(deleteNote.id)
      .then(() => this.props.deleteNote(deleteNote))
      .then(() => AsyncStorage.setItem('notes', JSON.stringify(newNotes)))
      .catch(() => {
        SnackBar.show(warningBar());
        return new Error('API Error');
      });
  }

  _hideOverlay = () => {
    this.setState({modalVisible: false});
  }

  _goToAbout = () => {
    this.props.navigation.navigate('AboutTab');
  }

  _renderItem = ({item}) => (<NoteItem data={item} onPressItem={this._onPressItem} onDeleteItem={this._onDeleteItem} />)

  _keyExtractor = (item) => item.id

  render () {
    return (
      <View style={styles.container}>
        <Title onChangeText={this.onTitleChangeText} value={this.state.currentTitle} />
        <Content onChangeText={this.onContentChangeText} value={this.state.currentContent} />
        <Footer characterCount={this.state.currentContent.length} onSaveButtonPress={this.onSaveButtonPress} />
        <View style={styles.list}><FlatList data={this.props.notes} renderItem={this._renderItem} keyExtractor={this._keyExtractor} /></View>

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

App.propTypes = {
  navigation: PropTypes.any,
  notes: PropTypes.array,
  addNote: PropTypes.func,
  deleteNote: PropTypes.func,
  populateNotes: PropTypes.func
};

const mapStateToProps = (storeState) => ({notes: storeState.notes});

const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => {
    dispatch({
      type: 'ADD_NOTE',
      payload: note
    });
  },
  deleteNote: (note) => {
    dispatch({
      type: 'DELETE_NOTE',
      payload: note
    });
  },
  populateNotes: (notes) => {
    dispatch({
      type: 'POPULATE_NOTES',
      payload: notes
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);