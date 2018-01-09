/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import AboutSection from './components/AboutSection/AboutSection.component';
import ApiNotes from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './app.style';
import Title from './components/Title/Title.component';
import uuid from 'uuid';
import {
  Alert, AsyncStorage, KeyboardAvoidingView, Platform, View
} from 'react-native';
import {connect} from 'react-redux';

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
      const newNotes = [...this.state.notes];
      newNotes.push(note);
      await AsyncStorage.setItem(notesKey, JSON.stringify(newNotes));

      this.props.addNote(note);

      const newState = {
        textTitle: '',
        textContent: '',
        notes: newNotes
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

      const filteredNotes = this.state.notes.filter((note) => note.id !== item.id);
      this.setState({
        notes: filteredNotes
      });
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

  onAboutButtonPress = () => {
    this.props.navigation.navigate('About');
  }

  loadData = async () => {
    try {
      const response = await ApiNotes.getNotes();

      //   this.setState({
      //     notes: response
      //   });
      this.props.getNotes(response);
    } catch (error) {
      const value = await AsyncStorage.getItem(notesKey);
      let notes;
      if (value) {
        notes = JSON.parse(value);
      } else {
        notes = [];
      }
      this.props.getNotes(notes);
    //   this.setState({
    //     notes
    //   });
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
        
        <AboutSection onAboutButtonPress={this.onAboutButtonPress}/>
      </this.WrapperView>
    );
  }
}

App.propTypes = {
  navigation: PropTypes.object
};

App.defaultProps = {
  navigation: null
};

const mapStateToProps = (state) => ({notes: state.notes});
const mapDispatchToProps = (dispatch) => ({
  addNote: (dataNote) => {
    dispatch({
      type: 'ADD_NOTE',
      payload: dataNote
    });
  },
  deleteNote: (item) => {
    dispatch({
      type: 'DELETE_NOTE',
      payload: item
    });
  },
  getNotes: (items) => {
    dispatch({
      type: 'GET_NOTE',
      payload: items
    });
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);