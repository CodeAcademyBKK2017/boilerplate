import Api from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Loader from './components/Loader/Loader.component';
import noop from 'lodash/noop';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import storageUtil from './utility/storage.util';
import styles from './app.style';
import Title from './components/Title/Title.component';
import transformerutil from './utility/transformer.util';
import {
  Alert,
  Button,
  View
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import * as indexAction from './redux/actions/index.actions';

class App extends Component {
  state = {
    title: '',
    content: ''
  }

  onLoadData = async () => {
    
    try {
      const notes = await Api.getNote();
      this.props.showNote(notes);
    } catch (err) {
      this.props.showNote(await storageUtil.getItem('notes') || []);
    }
  }

  componentDidMount () {
    this.onLoadData();
  }

  onSavePress = async () => {
    try {
      const newNote  = ({
        title: this.state.title,
        content: this.state.content
      });
      const noteWithID = await Api.addNote(newNote);
      const newNotes = [...this.props.notes, noteWithID];
      this.props.addNote(noteWithID);
      await storageUtil.setItem('notes', newNotes);
      this.setState({title: '', content: ''});
    } catch (err) {
      Alert.alert(
        'Error',
        err.message,
        [
          {text: 'Ask me later'},
          {text: 'Cancel', style: 'cancel'},
          {text: 'OK'}
        ],
        {cancelable: false}
      );
    }
  }

  onDeletePress = (item) => async () => {
    try {
      await Api.deleteNote(item);
      
      const newNotes = transformerutil.deleteItem(item);
      await storageUtil.setItem('notes', newNotes);

      this.props.deleteNote(item);
      
    } catch (err) {
      Alert.alert(
        'Error',
        err.message,
        [
          {text: 'Ask me later'},
          {text: 'Cancel', style: 'cancel'},
          {text: 'OK'}
        ],
        {cancelable: false}
      );
    }
  }

  onTypeContent = (textInput) => {
    this.setState({content: textInput});
  }

  onTypeTitle = (titleInput) => {
    this.setState({title: titleInput});
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Title onTypeTitle={this.onTypeTitle} text={this.state.title}/>
          <Content onTypeContent={this.onTypeContent} text={this.state.content}/>
          <Footer countContent={this.state.content.length} onSavePress={this.onSavePress} />
        </View>
        <Loader modalShow={this.props.modalShow}/>
        <NoteList notes={this.props.notes} onDeletePress={this.onDeletePress}/>
        <View style={styles.about}>
          <Button onPress={this.props.goToAbout} title='About' color='#841584'/>
        </View>
      </View>
    );
  }
}

App.propTypes = {
  goToAbout: PropTypes.func,
  addNote: PropTypes.func,
  deleteNote: PropTypes.func,
  showNote: PropTypes.func,
  notes: PropTypes.array,
  modalShow: PropTypes.object
};
App.defaultProps = {
  goToAbout: noop,
  addNote: noop,
  deleteNote: noop,
  showNote: PropTypes.func,
  notes: [],
  modalShow: {}
};

const mapStateToProps = (state) => ({notes: state.notes, modalShow: state.loader});
export const mapDispatchToProps = (dispatch) => ({
  addNote: bindActionCreators(indexAction.addNote, dispatch),
  deleteNote: bindActionCreators(indexAction.deleteNote, dispatch),
  showNote: bindActionCreators(indexAction.showNote, dispatch),
  showLoader: bindActionCreators(indexAction.showLoader, dispatch),
  hideLoader: bindActionCreators(indexAction.hideLoader, dispatch),
  goToAbout: () => { 
    dispatch(NavigationActions.navigate({routeName: 'About'})); 
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);