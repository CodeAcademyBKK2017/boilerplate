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
      await  Api.getNote().then((notes) => this.setState({notes: notes}));
      
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
      await Api.addNote(newData).then(() => {
        this.setState({
          notes: [...this.state.notes, newData],
          title: '',
          content: ''
        }, () => {
          AsyncStorage.setItem('state', JSON.stringify(this.state));
        });
      });
    } catch (err) {
      Alert.alert(
        'Error',
        err.message,
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')}
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
      await Api.deleteNote(item).then(() => {
        const newNotes = [...this.state.notes];
        newNotes.splice(newNotes.indexOf(item), 1);
        this.setState({notes: newNotes}, () => {
          AsyncStorage.setItem('state', JSON.stringify(this.state));
        });
      });
    } catch (err) {
      Alert.alert(
        'Error',
        err.message,
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')}
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