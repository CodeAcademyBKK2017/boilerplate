/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import AboutSection from './components/AboutSection/AboutSection.component';
import ApiNotes from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Loader from './components/loaders/loader.component';
import NoteList from './components/NoteList/NoteList.component';
import notesUtil from './utils/transfromer.util';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import storage from './utils/storage.util';
import styles from './index.style';
import Title from './components/Title/Title.component';
import {
  Alert, KeyboardAvoidingView, Platform, View
} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

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
  onSaveButtonPress = () => {
    try {
      const note = {
        title: this.state.textTitle,
        content: this.state.textContent
      };
      this.props.saveNotes(note);
    } catch (err) {
      console.log(err);
    }
  }

  onDeleteButtonPress = (item) => () => {
    try {
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

  onAboutButtonPress = () => {
    // this.props.navigation.navigate('About');
    // this.props.navigation('About');
  }

  loadData = async () => {
    try {
      const response = await ApiNotes.getNotes();
      this.props.populateNotes(response);
      storage.setItem('notes', response);
    } catch (error) {
      const value = await storage.getItem(notesKey);
      this.props.populateNotes(value);
      
    }
    this.props.fetchNotes();
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
          <Loader isVisible={this.props.loader}/>
        </View>
        <AboutSection onAboutButtonPress={this.props.navigationAbout}/>
      </this.WrapperView>
    );
  }
}

App.propTypes = {
  fetchNotes: PropTypes.func,
  navigationAbout: PropTypes.func,
  saveNotes: PropTypes.func,
  deleteNote: PropTypes.func,
  populateNotes: PropTypes.func,
  notes: PropTypes.array
};

App.defaultProps = {
  navigation: null,
  notes: []
};
const mapStateToProps = (storeState) => ({
  notes: storeState.notes,
  loader: storeState.loader
});

export const mapDispatchToProps = (dispatch) => ({
  // addNote: (note) => {
  //   dispatch({
  //     type: 'ADD_NOTE',
  //     payload: note
  //   });
  // },
  deleteNote: (id) => {
    dispatch({
      type: 'DELETE_NOTE',
      payload: {
        id
      }
    });
  },
  populateNotes: (response) => {
    dispatch({
      type: 'POPULATE_NOTES',
      payload: response
    });
  },
  fetchNotes: () => {
    dispatch({
      type: 'FETCH_NOTES'
    });
  },
  saveNotes: (note) => {
    dispatch({
      type: 'ADD_NOTE_REQUEST',
      payload: note
    });
  },
  navigationAbout: () => {
    dispatch(NavigationActions.navigate({routeName: 'About'}));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
