import Api from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
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
import {connect} from 'react-redux';
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
      await storageUtil.setItem('notes', notes);
    } catch (err) {
      const notes =  await storageUtil.getItem('notes') || [];
      this.props.showNote(notes);
    }
  }

  componentDidMount () {
    this.onLoadData();
  }

  onSavePress = async () => {
    
    const newData = {
      title: this.state.title,
      content: this.state.content
    };

    try {
      const response  = await Api.addNote(newData);
      const newNote = await response.json();
      const newNotes = [...this.props.notes, newNote];
      await storageUtil.setItem('notes', newNotes);
      this.props.addNote(newNote);
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
    this.setState({
      title: '',
      content: ''
    });
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

  navigateTo = (key) => () => this.props.navigation.navigate(key)

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Title onTypeTitle={this.onTypeTitle} text={this.state.title}/>
          <Content onTypeContent={this.onTypeContent} text={this.state.content}/>
          <Footer countContent={this.state.content.length} onSavePress={this.onSavePress} />
        </View>
       
        <NoteList notes={this.props.notes} onDeletePress={this.onDeletePress}/>
        <View style={styles.about}>
          <Button onPress={this.navigateTo('About')} title='Go to About' color='#841584'/>
        </View>
      </View>
    );
  }
}

App.propTypes = {
  navigation: PropTypes.object,
  addNote: PropTypes.func,
  deleteNote: PropTypes.func,
  showNote: PropTypes.func,
  notes: PropTypes.array
};
App.defaultProps = {
  navigation: {},
  addNote: noop,
  deleteNote: noop,
  showNote: PropTypes.func,
  notes: []
};

const mapStateToProps = (state) => ({notes: state.notes});
const mapDispatchToProps = (dispatch) => ({
  addNote: (newData) => {
    dispatch(indexAction.addNote(newData));
  },
  deleteNote: (newData) => {
    dispatch(indexAction.deleteNote(newData));
  },
  showNote: (notes) => {
    dispatch(indexAction.showNote(notes));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);