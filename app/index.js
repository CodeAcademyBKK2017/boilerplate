import Api from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.component';
import uuid from 'uuid';
import {
  Alert,
  AsyncStorage,
  Button,
  View
} from 'react-native';

export default class App extends Component {
  state = {
    title: '',
    content: '',
    notes: []
  }

  onLoadData = async () => {
    try {
      const notes = await Api.getNote();
      this.setState({notes: notes});
      
    } catch (err) {
      AsyncStorage.getItem('state').then((value) => {
        this.setState(JSON.parse(value));
      });
    }
  }

  componentDidMount () {
    this.onLoadData();
  }

  onSavePress = async () => {
    const newData = {
      title: this.state.title,
      content: this.state.content,
      key: uuid()
    };
    try {
      await Api.addNote(newData);
      const newNotes = [...this.state.notes, newData];
      this.setState({
        notes: newNotes,
        title: '',
        content: ''
      });
      AsyncStorage.setItem('notes', JSON.stringify(newNotes));
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
      const newNotes = [...this.state.notes];
      newNotes.splice(newNotes.indexOf(item), 1);
      this.setState({notes: newNotes}, () => {
        AsyncStorage.setItem('notes', JSON.stringify(this.state));
      });
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
       
        <NoteList notes={this.state.notes} onDeletePress={this.onDeletePress}/>
        <View style={styles.about}>
          <Button onPress={this.navigateTo('About')} title='Go to About' color='#841584'/>
        </View>
      </View>
    );
  }
}

App.propTypes = {
  navigation: PropTypes.object
};
App.defaultProps = {
  navigation: {}
};