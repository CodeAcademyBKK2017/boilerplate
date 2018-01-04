import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.component';
import uuid from 'uuid';
import {
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
    const data = await AsyncStorage.getItem('state');
    this.setState(JSON.parse(data));
  }

  componentDidMount () {
    this.onLoadData();
  }

  onSavePress = () => {
    const newData = {
      title: this.state.title,
      content: this.state.content,
      key: uuid()
    };

    this.setState({
      notes: [...this.state.notes, newData],
      title: '',
      content: ''
    }, () => {
      AsyncStorage.setItem('state', JSON.stringify(this.state)).then(() => {
        AsyncStorage.getItem('state');
      });
    }
    );
  }

  onDeletePress = (item) => () => {
    const newNotes = [...this.state.notes];
    newNotes.splice(newNotes.indexOf(item), 1);
    this.setState({notes: newNotes}, () => {
      AsyncStorage.setItem('state', JSON.stringify(this.state));
    });
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
        <Button onPress={this.navigateTo('About')} title='Go to About'/>
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