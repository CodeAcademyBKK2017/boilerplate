import apiNotes from './api';
import ContentBox from './components/ContentBox/ContentBox.component';
import Footer from './components/FooterBox/FooterBox.component';
import ListItem from './components/ListItem/ListItem.component';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import style from './app.style';
import TitleBox from './components/TitleBox/TitleBox.component';
import {
  Alert,
  AsyncStorage,
  Text,
  View
} from 'react-native';

export default class App extends Component {

  static navigationOptions = {
    drawerLabel: 'Home',
    title: 'Home'
  }

  state = {
    modalData: {},
    titleText: '',
    contentText: '',
    NOTES: []
  }

  componentDidMount () {
    this.onLoadDataState();
  }

  onLoadDataState = async () => {
    try {
      const notes = await apiNotes.getNotes();
      this.setState({NOTES: notes});
    } catch (err) {
      const dataState = await AsyncStorage.getItem('state');
      this.setState(JSON.parse(dataState));
    }
  }

  onTitleChange = (title) => this.setState({titleText: title});

  onContentChange = (content) => this.setState({contentText: content});

  newStateData = (dataNOTES) => ({
    modalData: {},
    titleText: '',
    contentText: '',
    NOTES: dataNOTES
  });
  
  onSave = async () => {
    try {
      const aa = await apiNotes.addNotes({
        title: this.state.titleText,
        content: this.state.contentText,
        key: this.state.NOTES.length
      });
      const newData = {
        title: this.state.titleText,
        content: this.state.contentText,
        key: this.state.NOTES.length,
        id: (JSON.parse(aa._bodyText)).id
      };
      const newDataNOTES = [...this.state.NOTES, newData];
      AsyncStorage.setItem('state', JSON.stringify(this.newStateData(newDataNOTES)));
      this.setState(this.newStateData(newDataNOTES));
    } catch (err) {
      this.onShowAlert(err);
    }
  }

  onDelete = (item) => async () => {
    try {
      await apiNotes.deleteNotes(item);
      const dataNOTES = [...this.state.NOTES];
      const deletePosition = dataNOTES.indexOf(item);
      dataNOTES.splice(deletePosition, 1);
      AsyncStorage.setItem('state', JSON.stringify(this.newStateData(dataNOTES)));
      this.setState(this.newStateData(dataNOTES));
    } catch (err) {
      this.onShowAlert(err);
    }
  }

  onShowModal = (note) => () => this.setState({modalData: note});

  onCloseModal = () => this.setState({modalData: {}});

  onShowAlert = (err) => {
    Alert.alert(
      'Error',
      err.message,
      [
        {text: 'OK'}
      ],
      {cancelable: false}
    );
  }

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

  openAbout = () => this.props.navigation.navigate('About');

  render () {
    return (
      <View style={style.container}>
        <TitleBox titleValueText={this.state.titleText} onTitleChange={this.onTitleChange}/>
        <ContentBox count={this.state.contentText.length} contentValueText={this.state.contentText} onContentChange={this.onContentChange} onSave={this.onSave} onDelete={this.onDelete}/>
        {this.showFlatList()}
        {this.viewOverlay()}
        <Footer openAbout={this.openAbout}/>
      </View>
    );
  }
}

App.propTypes = {
  navigation: PropTypes.object.isRequired
};

App.defaultProps = {
  navigation: {}
};