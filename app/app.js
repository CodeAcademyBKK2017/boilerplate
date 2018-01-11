/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import AboutSection from './components/AboutSection/AboutSection.component';
import ApiNotes from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import noop from 'lodash/noop';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import StorageUtil from './utils/StorageUtil';
import styles from './index.style';
import Title from './components/Title/Title.component';
import TransformerUtil from './utils/TransformerUtil';
import {
  Alert, KeyboardAvoidingView, Platform, View
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './redux/actions/index.actions';

const notesKey = 'notes';

class App extends Component {
  state = {
    textTitle: '',
    textContent: ''
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
        title: this.state.textTitle,
        content: this.state.textContent
      };

      const response = await ApiNotes.addNote(note);

      const newNotes = [...this.props.notes];
      newNotes.push(response);

      await StorageUtil.setItem(notesKey, newNotes);

      this.props.addNote(response);
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

      const filteredNotes = TransformerUtil.removeNote(this.props.notes, item.id);
      await StorageUtil.setItem(notesKey, filteredNotes);

      this.props.deleteNote(item.id);
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
      this.props.populateNote(response);
    } catch (error) {
      const value = await StorageUtil.getItem(notesKey);
      const notes = value ? value : [];
      this.props.populateNote(notes);
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
        
        <AboutSection onAboutButtonPress={this.props.navigateToAbout}/>
      </this.WrapperView>
    );
  }
}

App.propTypes = {
  navigation: PropTypes.object,
  notes: PropTypes.array.isRequired,
  addNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  populateNote: PropTypes.func.isRequired
};

App.defaultProps = {
  navigation: null,
  notes: [],
  addNote: noop,
  deleteNote: noop,
  populateNote: noop
};

const mapStateToProps = (storeState) => ({
  notes: storeState.notes
});

const mapDisplatchToProps = (dispatch) => ({
  addNote: bindActionCreators(actions.addNote, dispatch),
  deleteNote: bindActionCreators(actions.deleteNote, dispatch),
  populateNote: bindActionCreators(actions.populateNotes, dispatch),
  navigateToAbout: () => {
    dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'About'
    });
  }
});

export default connect(mapStateToProps, mapDisplatchToProps)(App);
