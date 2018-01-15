import API from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Loader from './components/Loader/Loader.component';
import NoteItem from './components/NoteItem/NoteItem.component';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import SnackBar from 'react-native-snackbar';
import StorageUtil from './utils/storage.util';
import styles from './app.styles';
import Title from './components/Title/Title.component';
import Touchable from 'react-native-platform-touchable';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  FlatList, Text, View
} from 'react-native';
import {NavigationActions} from 'react-navigation';

import {removeNote} from './utils/transformer.util';
import * as actions from './redux/actions/index.actions';

const warningBar = () => ({
  title: 'Network errors: Can\'t connect to server.',
  duration: 3000,
  backgroundColor: '#d9bf56'
});

class App extends Component {
  state = {
    currentTitle: '',
    currentContent: '',
    modalVisible: false,
    selectedNote: {id: '', title: '', content: ''}
  }

  componentDidMount () { 
    // this.loadData();
    this.props.fetchNotes();
  }

  loadData = async () => {
    let notes = [];

    try {
      notes = await API.getNotes();
    } catch (e) {
      notes = await StorageUtil.getItem('notes') || [];
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
      .then((noteWithID) => {
        const newNotes = [...this.props.notes, noteWithID];
        this.props.addNote(noteWithID);
        return newNotes;
      })
      .then((newNotes) => StorageUtil.setItem('notes', newNotes))
      .then(() => this.setState({currentTitle: '', currentContent: ''}))
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

  _removeNoteItem = (deleteNote) => API.deleteNote(deleteNote.id)
    .then(() => {
      const newNotes = removeNote(this.props.notes, deleteNote.id);
      this.props.deleteNote(deleteNote);
      return newNotes;
    })
    .then((newNotes) => StorageUtil.setItem('notes', newNotes))
    .catch(() => {
      SnackBar.show(warningBar());
      return new Error('API Error');
    })

  _hideOverlay = () => {
    this.setState({modalVisible: false});
  }

  _renderItem = ({item}) => (<NoteItem data={item} onPressItem={this._onPressItem} onDeleteItem={this._onDeleteItem} />)

  _keyExtractor = (item) => item.id

  render () {
    return (
      <View style={styles.container}>
        <Title onChangeText={this.onTitleChangeText} value={this.state.currentTitle} />
        <Content onChangeText={this.onContentChangeText} value={this.state.currentContent} />
        <Footer characterCount={this.state.currentContent.length} onSaveButtonPress={this.onSaveButtonPress} />

        <View style={styles.list}>
          <FlatList data={this.props.notes} renderItem={this._renderItem} keyExtractor={this._keyExtractor} />
        </View>

        <Overlay visible={this.state.modalVisible}
          onClose={this._hideOverlay}
          closeOnTouchOutside animationType='zoomInUp'
          animationDuration={500}>
          <Text>{this.state.selectedNote.title}</Text>
          <Text>{this.state.selectedNote.content}</Text>
        </Overlay>
        
        <Touchable onPress={this.props.navigateToAbout}><Text>Go to About</Text></Touchable>
        <Loader visible={this.props.showLoader}/>
      </View>
    );
  }
}

App.propTypes = {
  notes: PropTypes.array,
  addNote: PropTypes.func,
  deleteNote: PropTypes.func,
  populateNotes: PropTypes.func,
  navigateToAbout: PropTypes.func,
  fetchNotes: PropTypes.func,
  showLoader: PropTypes.bool
};

const mapStateToProps = (storeState) => ({
  notes: storeState.notes,
  showLoader: result(storeState, 'loader.isVisible', false)
});

const bindNavigationActionCreators = (routeName, dispatch) => () => {
  dispatch(NavigationActions.navigate({routeName}));
};

export const mapDispatchToProps = (dispatch) => ({
  addNote: bindActionCreators(actions.addNote, dispatch),
  deleteNote: bindActionCreators(actions.deleteNote, dispatch),
  populateNotes: bindActionCreators(actions.populateNotes, dispatch),
  navigateToAbout: bindNavigationActionCreators('AboutApp', dispatch),
  fetchNotes: () => dispatch({type: 'FETCH_NOTES'})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);