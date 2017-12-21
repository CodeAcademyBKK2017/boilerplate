import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import NoteItem from './components/NoteItem/NoteItem.component';
import React, {Component} from 'react';
import shortid from 'shortid';
import styles from './index.styles';
import Title from './components/Title/Title.component';

import {
  FlatList, Text, View
} from 'react-native';

export default class App extends Component {
  state = {
    currentTitle: '',
    currentContent: '',
    notes: []
  }

  onTitleChangeText = (currentTitle) => {
    this.setState({currentTitle});
  }

  onContentChangeText = (currentContent) => {
    this.setState({currentContent});
  }

  onSaveButtonPress = () => {
    const {notes, currentTitle, currentContent} = this.state;
    const newNotes = [...notes];

    newNotes.push({
      key: shortid(),
      title: currentTitle,
      content: currentContent
    });

    this.setState({
      notes: newNotes,
      currentTitle: '',
      currentContent: ''
    });
  }

  _onPressItem = (item) => {
    console.log(item);
  }

  _renderItem = ({item}) => (<NoteItem data={item} onPressItem={this._onPressItem} />)

  render () {
    return (
      <View style={styles.container}>
        <Title onChangeText={this.onTitleChangeText} value={this.state.currentTitle} />
        <Content onChangeText={this.onContentChangeText} value={this.state.currentContent} />
        <Footer characterCount={this.state.currentContent.length} onSaveButtonPress={this.onSaveButtonPress} />
        <View style={styles.list}>
          <FlatList data={this.state.notes} renderItem={this._renderItem} onPressItem={this._onPressItem} />
        </View>
      </View>
    );
  }
}