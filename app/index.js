/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import AboutSection from './components/AboutSection/AboutSection.component';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.component';
import uuid from 'uuid';
import {
  AsyncStorage, KeyboardAvoidingView, Platform, View
} from 'react-native';

const notesKey = 'notes';
const API_NOTES = 'http://localhost:3000/notes';

export default class App extends Component {
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
    const newNotes = [...this.state.notes];
    const note = {
      key: uuid(),
      title: this.state.textTitle,
      content: this.state.textContent
    };
    newNotes.push(note);

    const newState = {
      textTitle: '',
      textContent: '',
      notes: newNotes
    };
    this.setState(newState);

    // ----------

    try {
      const option = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      };
      const response = await fetch(API_NOTES, option);
      // const responseJson = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  onDeleteButtonPress = (item) => async () => {
    const filteredNotes = this.state.notes.filter((note) => note !== item);
    this.setState({notes: filteredNotes});

    // ----------
    
    try {
      const option = {
        method: 'DELETE'
      };
      const response = await fetch(`${API_NOTES}/${item.id}`, option);
      // const responseJson = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  onAboutButtonPress = () => {
    this.props.navigation.navigate('About');
  }

  loadData = async () => {
    try {
      const option = {
        method: 'GET'
      };
      const response = await fetch(API_NOTES, option);
      const responseJson = await response.json();
    
      // ----------

      this.setState({
        notes: responseJson
      });
    } catch (error) {
      console.error(error);
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
            this.state.notes.length > 0 ? <NoteList data={this.state.notes} onDeleteButtonPress={this.onDeleteButtonPress}/> : null
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
