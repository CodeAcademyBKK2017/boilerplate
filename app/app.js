import apiNotes from './api';
import ContentBox from './components/ContentBox/ContentBox.component';
import Footer from './components/FooterBox/FooterBox.component';
import ListItem from './components/ListItem/ListItem.component';
import noop from 'lodash/noop';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import storageUtil from './utility/storage.util';
import style from './app.style';
import TitleBox from './components/TitleBox/TitleBox.component';
import transformerUtil from './utility/transformer.util';
import {
  Alert,
  Text,
  View
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import * as actions from './redux/actions/index.action';

class App extends Component {

  static navigationOptions = {
    drawerLabel: 'Home',
    title: 'Home'
  }

  state = {
    modalData: {},
    titleText: '',
    contentText: ''
  }

  componentDidMount () {
    this.onLoadDataState();
  }

  onLoadDataState = async () => {
    try {
      const notes = await apiNotes.getNotes();
      this.props.populateNotes(notes);
    } catch (err) {
      this.props.populateNotes(await storageUtil.getItemFromAsyncStorage('state') || []);
    }
  }

  onTitleChange = (title) => this.setState({titleText: title});

  onContentChange = (content) => this.setState({contentText: content});
  
  onSave = async () => {
    try {
      const newNote = await apiNotes.addNotes({
        title: this.state.titleText,
        content: this.state.contentText
      });
      const newDataNOTES = [...this.props.notes, newNote];
      this.props.addNotes(newNote);
      await storageUtil.setItemFromAsyncStorage('state', newDataNOTES);
      this.setState({titleText: '', contentText: ''});
    } catch (err) {
      this.onShowAlert(err);
    }
  }

  onDelete = (item) => async () => {
    try {
      await apiNotes.deleteNotes(item);
      const dataNOTES = transformerUtil.deleteItem(this.props.notes, item);
      await storageUtil.setItemFromAsyncStorage('state', dataNOTES);
      this.props.deleteNotes(item);
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

  showFlatList = () => (this.props.notes.length > 0) ? 
    <ListItem 
      dataNotes={this.props.notes}
      onShowModal={this.onShowModal}
      onDelete={this.onDelete}
    /> : null ;

  viewOverlay = () => <Overlay 
    visible={!!(this.state.modalData.title)}
    onClose={this.onCloseModal} closeOnTouchOutside={true}>
    <Text style={style.textTitleStyle}>{this.state.modalData.title}</Text>
    <Text style={style.textContentStyle}>{this.state.modalData.content}</Text>
  </Overlay>

  render () {
    return (
      <View style={style.container}>
        <TitleBox titleValueText={this.state.titleText} onTitleChange={this.onTitleChange}/>
        <ContentBox count={this.state.contentText.length} contentValueText={this.state.contentText} onContentChange={this.onContentChange} onSave={this.onSave} onDelete={this.onDelete}/>
        {this.showFlatList()}
        {this.viewOverlay()}
        <Footer openAbout={this.props.navigateToAbout}/>
      </View>
    );
  }
}

App.propTypes = {
  navigateToAbout: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
  addNotes: PropTypes.func.isRequired,
  deleteNotes: PropTypes.func.isRequired,
  populateNotes: PropTypes.func.isRequired
};

App.defaultProps = {
  navigateToAbout: noop,
  notes: [],
  addNotes: noop,
  deleteNotes: noop,
  populateNotes: noop
};

const mapStateToProps = (state) => ({notes: state.notes});

export const mapDispatchToProps = (dispatch) => ({
  addNotes: bindActionCreators(actions.addNotes, dispatch),
  deleteNotes: bindActionCreators(actions.deleteNotes, dispatch),
  populateNotes: bindActionCreators(actions.populateNotes, dispatch),
  navigateToAbout: () => dispatch(NavigationActions.navigate({routeName: 'About'}))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);