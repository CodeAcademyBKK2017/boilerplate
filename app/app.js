/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Api from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Lower from './components/Lower/Lower.component';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import storageutil from './utils/storageutil';
import styles from './index.style';
import Title from './components/Title/Title.component';
import Tranformerutil from './utils/tranformerutil';
import {
  Alert, KeyboardAvoidingView, Platform, View
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from './redux/actions/index.actions';

// const notesKey = 'notes';
//
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

  // onSaveButtonPress = () => {
  //   const newNotes = [...this.state.notes];
  //   const note = {
  //     key: uuid(),
  //     title: this.state.textTitle,
  //     content: this.state.textContent
  //   };
  //   newNotes.push(note);

  //   const newState = {
  //     textTitle: '',
  //     textContent: '',
  //     notes: newNotes
  //   };
  //   this.setState(newState);

  //   AsyncStorage.setItem(notesKey, JSON.stringify(newNotes));
    
  // }

  onSaveButtonPress = async () => {
    const newNotes = [...this.props.notes];
    const note = {
      title: this.state.textTitle,
      content: this.state.textContent
    };
    
    try {
      const api =  await Api.onAddNote(note);
      const newData = {
        title: this.state.textTitle,
        content: this.state.textContent,
        id: (JSON.parse(api._bodyText)).id
      };
      newNotes.push(newData);
      this.props.addNote(newData);
      const newState = {
        textTitle: '',
        textContent: '',
        notes: newNotes
      };
      console.log(newNotes);
      await storageutil.setItem(newNotes);
      this.setState(newState);

    } catch (e) {
      Alert.alert(
        'Error',
        'Internet error',
        {cancelable: true}
      );
    }
    
    // await AsyncStorage.setItem(notesKey, JSON.stringify(newNotes));
    // await fetch('http://localhost:3000/posts', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(note)
    // });
    
  }

  onShowAboutUs = () => {
    this.props.navigation.navigate('About');
  }

  onDeleteButtonPress = (item) => async () => {
    try {
      await new Api.onDelete(item.id, Tranformerutil.removeNote(this.props.notes, item.id));
      this.props.deleNote(item);
    } catch (e) {
      Alert.alert(
        'Error',
        'Internet error',
        {cancelable: true}
      );
    }
    
    // await AsyncStorage.setItem(notesKey, JSON.stringify(filteredNotes));
    // await fetch('http://localhost:3000/posts/' + `${item.id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(filteredNotes)
    // });
    
  }

  onLoad = async () => {
    // const value = await AsyncStorage.getItem(notesKey);
    try {
      const notes = await new Api.onGetNote();
      // this.setState({
      //   notes: notes
      // });
      this.props.loadServer(notes);
      // this.props.addNote(JSON.parse(notes));
    } catch (e) {
      // const notes =  storageutil.getItem();
      // this.setState({
      //   notes: notes
      // });
      this.props.loadServer(await storageutil.getItem());
    }
  }

  componentDidMount () {
    this.onLoad();
  }

  render () {
    return (
      <this.WrapperView
        style={[styles.container]}
        behavior='padding'>
        <Title
          text={this.state.textTitle}
          onChangeTextTitle={this.onChangeTextTitle}/>
        <Content
          style={styles.fill}
          text={this.state.textContent}
          onChangeTextContent={this.onChangeTextContent}/>
        <Footer
          textContentLength={this.state.textContent.length}
          onSaveButtonPress={this.onSaveButtonPress}
        />
        {
          this.props.notes.length > 0 ? <NoteList data={this.props.notes} onDeleteButtonPress={this.onDeleteButtonPress}/> : null
        }
        <Lower
          onShowAboutUs={this.onShowAboutUs} />
      </this.WrapperView>
    );
  }
}

App.propTypes = {
  navigation: PropTypes.object
};

App.defaultProps = {
  navigation: () => {}
};

const mapStateToProps = (state) => ({notes: state.notes});
const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => {
    dispatch(actions.addNote(note));
  },
  deleNote: (note) => {
    dispatch(actions.deleNote(note));
  },
  loadServer: (note) => {
    dispatch(actions.loadServer(note));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);