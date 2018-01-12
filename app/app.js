/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import AboutSection from './components/AboutSection/AboutSection.component';
import ApiNotes from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Loader from './components/loaders/loader.components';
import NoteList from './components/NoteList/NoteList.component';
import notesUtil from './utils/transfromer.util';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import storage from './utils/storage.util';
import styles from './index.style';
import Title from './components/Title/Title.component';
import {
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform, View
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

  onSaveButtonPress = async () => {
    try {
      const note = {
        title: this.state.textTitle,
        content: this.state.textContent
      };
      const response = await ApiNotes.addNote(note);
      this.props.addNote(response);
      storage.setItem('notes', this.props.notes);
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

  onDeleteButtonPress = (item) => async () => {
    this.props.deleteNote(item.id);
    try {
      await ApiNotes.deleteNote(item.id);
      storage.setItem('notes', notesUtil.deleteNote(this.props.notes));
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
        <AboutSection onAboutButtonPress={this.props.navigationAbout}/>
        <Loader isVisible={this.props.loader}/>
        
      </this.WrapperView>
    );
  }
}

App.propTypes = {
  addNote: PropTypes.func,
  deleteNote: PropTypes.func,
  populateNotes: PropTypes.func,
  notes: PropTypes.object
};

App.defaultProps = {
  navigation: null,
  notes: []
};
const mapStateToProps = (storeState) => ({
  notes: storeState.notes,
  loader: storeState.loader
});
// const 
export const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => {
    dispatch({
      type: 'ADD_NOTE',
      payload: note
    });
  },
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
  gotoAbout: () => {
    dispatch(NavigationActions.navigate({routeName: 'About'}));
  },
  showloader: () => {
    dispatch({
      type: 'SHOW_LOADER'
    });
  },
  hideloader: () => {
    dispatch({
      type: 'HIDE_LOADER'
    });
  }
  
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
