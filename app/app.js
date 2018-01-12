/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import ApiNotes from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Loader from './components/Loader/Loader.component';
import Note from './components/Note/Note.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './index.style';
import Title from './components/Title/Title.component';
import {Alert, KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {filterNote} from './utils/transformerutil';
import {NavigationActions} from 'react-navigation';
import {setItemToStorage} from './utils/storageutil';
import * as actions from './redux/actions/index.actions';

class App extends Component {
  initialstate = {
    content: '',
    title: '',
    note: []
  }
  state = this.initialstate
  
  //  init = async () => {
  //    try {
  //      const response = await ApiNotes.getNotes();
  //      this.props.populateNote(response);
  //    } catch (error) {
  //      const note = await getItemToStorage('storageNote');
  //      this.props.populateNote(note ? note : []);
  //    }
   
  //  }
  componentDidMount () {
    //  this.init();
    this.props.fetchNotes();
  }

  WrapperView = Platform.select(
    {ios: KeyboardAvoidingView,
      android: View
    }
  )
  changeTitle  = (text) => {
    this.setState({title: text});
  }
  changeContent  = (text) => {
    this.setState({content: text});
  }
  onSave = async () => {
    try {
      const note =   {
        title: this.state.title,
        content: this.state.content
      };
      const noteWithId = await  ApiNotes.addNote(note);
      const newNote = [...this.props.noteList, noteWithId];
      this.props.addNote(noteWithId);      
      await setItemToStorage('storageNote', newNote);
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

  onDelete = (item) => async () => {
    try {
      await  ApiNotes.deleteNote(item.id);
      this.props.deleteNote(item.id);
      const remainNote = filterNote(this.props.noteList, item.id);
      await setItemToStorage('storageNote', remainNote);
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
  
  render () {
    return (
      <this.WrapperView style={styles.container} behavior={'padding'} >
        <Title onTitleChange={this.changeTitle}/>
        <Content  onContentChange={this.changeContent} />
        <Footer characterCount={this.state.content.length} onPressSave={this.onSave} />
        {this.props.noteList.length > 0 ? <Note noteList={this.props.noteList} onDelete={this.onDelete}/> : null}
        <View><Text onPress={this.props.goToAbout}>about us</Text></View>
        <Loader visibility={this.props.isVisible}/>
      </this.WrapperView>
    );
  }
}

App.propTypes = {
  noteList: PropTypes.array,
  addNote: PropTypes.func,
  deleteNote: PropTypes.func,
  fetchNotes: PropTypes.func,
  goToAbout: PropTypes.func,
  isVisible: PropTypes.object
};

App.defaultProps = {
  noteList: []
};
const mapStateToProps = (storeState) => (
  {noteList: storeState.notes, 
    isVisible: result(storeState, 'loader', {})}
);
export const mapDispatchToProps = (dispatch) => ({
  addNote: bindActionCreators(actions.addNote, dispatch),
  deleteNote: bindActionCreators(actions.deleteNote, dispatch),
  // populateNote: bindActionCreators(actions.populateNotes, dispatch),
  goToAbout: () => dispatch(NavigationActions.navigate({routeName: 'About'})),
  fetchNotes: () => dispatch({type: 'FETCH_NOTES'})
  // populateNote: (note) => {
  //   const action = actions.populateNotes(note);
  //   dispatch(action);
  // }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);