/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import ContentBox from './components/ContentBox/ContentBox.component';
import Footer from './components/FooterBox/FooterBox.component';
import HeaderBox from './components/HeaderBox/HeaderBox.component';
import ListItem from './components/ListItem/ListItem.component';
import Overlay from 'react-native-modal-overlay';
import React, {Component} from 'react';
import style from './index.style';
import TitleBox from './components/TitleBox/TitleBox.component';
import {
  AsyncStorage,
  Text,
  View
} from 'react-native';

export default class App extends Component {

  state = {
    modalData: {},
    titleText: '',
    contentText: '',
    NOTES: []
  }

  componentDidMount () {
    AsyncStorage.getItem('state').then((value) => this.setState(JSON.parse(value)));
  }

  onTitleChange = (title) => this.setState({titleText: title});

  onContentChange = (content) => this.setState({contentText: content});

  onSave = () => {
    const newData = {
      title: this.state.titleText,
      content: this.state.contentText,
      key: this.state.NOTES.length
    };
    const newDataNOTES = [...this.state.NOTES, newData];
    const newStateData = {
      modalData: {},
      titleText: '',
      contentText: '',
      NOTES: newDataNOTES
    };
    
    AsyncStorage.setItem('state', JSON.stringify(newStateData));
    this.setState(newStateData);
  }

  onDelete = (item) => () => {
    const dataNOTES = [...this.state.NOTES];
    const deletePosition = dataNOTES.indexOf(item);
    dataNOTES.splice(deletePosition, 1);

    const newStateData = {
      modalData: {},
      titleText: '',
      contentText: '',
      NOTES: dataNOTES
    };
    AsyncStorage.setItem('state', JSON.stringify(newStateData));
    this.setState(newStateData);
  }

  onShowModal = (note) => () => this.setState({modalData: note});

  onCloseModal = () => this.setState({modalData: {}});

  showFlatList = () => (this.state.NOTES.length > 0) ? 
    <ListItem 
      dataNotes={this.state.NOTES}
      onShowModal={this.onShowModal}
      onDelete={this.onDelete}
    /> : null

  viewOverlay = () => <Overlay 
    visible={!!(this.state.modalData.title)}
    onClose={this.onCloseModal} closeOnTouchOutside={true}>
    <Text style={style.textTitleStyle}>{this.state.modalData.title}</Text>
    <Text style={style.textContentStyle}>{this.state.modalData.content}</Text>
  </Overlay>

  render () {
    return (
      <View style={style.container}>
        <HeaderBox />
        <TitleBox titleValueText={this.state.titleText} onTitleChange={this.onTitleChange}/>
        <ContentBox count={this.state.contentText.length} contentValueText={this.state.contentText} onContentChange={this.onContentChange} onSave={this.onSave} onDelete={this.onDelete}/>
        {this.showFlatList()}
        {this.viewOverlay()}
        <Footer />
      </View>
    );
  }
}