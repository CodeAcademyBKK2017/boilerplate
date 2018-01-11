
import AboutSection from './components/AboutSection/AboutSection.component';
import ApiNotes from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import noop from 'lodash/noop';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import storageUtil from './utility/storage.util';
import styles from './app.style';
import Title from './components/Title/Title.component';
import transformerutil from './utility/transformerutil';
import uuid from 'uuid';
import {
  Alert, KeyboardAvoidingView, Platform, View
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import * as actions from './redux/actions/index.actions';

const notesKey = 'notes';

class App extends Component {
  state = {
    textTitle: '',
    textContent: '',
    notes: []
  };
  
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

  onSaveButtonPress = async () => {
    try {
      const note = {
        id: uuid(),
        title: this.state.textTitle,
        content: this.state.textContent
      };
      await ApiNotes.addNote(note);
      const newNotes = [...this.props.notes];
      newNotes.push(note);
      await storageUtil.setItemsFromAsyncStorage(notesKey, JSON.stringify(newNotes));

      this.props.addNote(note);

      const newState = {
        textTitle: '',
        textContent: ''
      };
      this.setState(newState);
    } catch (error) {
      Alert.alert(
        'Save Failed',
        String(error),
        [
          {text: 'OK'}
        ],
        {
          cancelable: false
        }
      );
    }
  }

  onDeleteButtonPress = (item) => async () => {
    try {
      await ApiNotes.deleteNote(item.id);
      const filteredNotes = transformerutil.deleteNote(this.props.notes, item.id);
      await storageUtil.setItemsFromAsyncStorage(notesKey, JSON.stringify(filteredNotes));

      this.props.deleteNote(item);
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

  loadData = async () => {
    try {
      const response = await ApiNotes.getNotes();

      this.props.getNotes(response);
    } catch (error) {
      const value = await storageUtil.getItemsFromAsyncStorage(notesKey);
      let notes;
      if (value) {
        notes = JSON.parse(value);
      } else {
        notes = [];
      }
      this.props.getNotes(notes);
    }
  }

  componentDidMount () {
    this.loadData();
  }

  render () {
    return (
      <this.WrapperView
        style={[styles.container]}
        behavior='padding'>
        <View style={styles.spacingContainer}>
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
            this.props.notes.length > 0 ? <NoteList data={this.props.notes} onDeleteButtonPress={this.onDeleteButtonPress}/> : null
          }
        </View>
        
        <AboutSection onAboutButtonPress={this.props.goToAbout}/>
      </this.WrapperView>
    );
  }
}

App.propTypes = {
  goToAbout: PropTypes.func,
  notes: PropTypes.array,
  getNotes: PropTypes.func,
  deleteNote: PropTypes.func,
  addNote: PropTypes.func
};

App.defaultProps = {
  navigation: null,
  notes: [],
  getNotes: noop,
  deleteNote: noop,
  addNote: noop
};

const mapStateToProps = (state) => ({notes: state.notes});
// const mapDispatchToProps = (dispatch) => ({
//   addNote: (dataNote) => {
//     dispatch(actions.addNote(dataNote));
//   },
//   deleteNote: (item) => {
//     dispatch(actions.deleteNote(item));
//   },
//   getNotes: (items) => {
//     dispatch(actions.getNotes(items));
//   }
// });
export const mapDispatchToProps = (dispatch) => ({ // named export
  addNote: bindActionCreators(actions.addNote, dispatch),
  deleteNote: bindActionCreators(actions.deleteNote, dispatch),
  getNotes: bindActionCreators(actions.getNotes, dispatch),
  goToAbout: () => {
    dispatch(NavigationActions.navigate({routeName: 'About'}));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);