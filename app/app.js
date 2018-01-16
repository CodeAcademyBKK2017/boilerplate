import Content from './components/Content/Content.component';
import Dialog from './components/Dialog/Dialog.component';
import Footer from './components/Footer/Footer.component';
import Loader from './components/Loader/Loader.component';
import NoteItem from './components/NoteItem/NoteItem.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './app.styles';
import Title from './components/Title/Title.component';
import Touchable from 'react-native-platform-touchable';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {FlatList, Text, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import * as actions from './redux/actions/index.actions';

class App extends Component {
  state = {
    title: '',
    content: '',
    modalVisible: false,
    selectedNote: {id: '', title: '', content: ''}
  }
  
  componentDidMount () { 
    
    this.props.fetchNotes();
  }

  onTitleChangeText = (title) => this.setState({title});

  onContentChangeText = (content) => this.setState({content});

  onSaveButtonPress = () => {
    const {title, content} = this.state;
    this.props.addNoteRequest({title, content});
    this.setState({title: '', content: ''});
  }

  _onPressItem = (selectedNote) => () => this.setState({modalVisible: true, selectedNote});

  _onDeleteItem = (note) => () => this.props.deleteNoteRequest(note);

  _hideOverlay = () => this.setState({modalVisible: false});

  _renderItem = ({item}) => (<NoteItem data={item} onPressItem={this._onPressItem} onDeleteItem={this._onDeleteItem} />)

  _keyExtractor = (item) => item.id;

  render () {
    return (
      <View style={styles.container}>
        <Title onChangeText={this.onTitleChangeText} value={this.state.title} />
        <Content onChangeText={this.onContentChangeText} value={this.state.content} />
        <Footer characterCount={this.state.content.length} onSaveButtonPress={this.onSaveButtonPress} />
        <View style={styles.list}><FlatList data={this.props.notes} renderItem={this._renderItem} keyExtractor={this._keyExtractor} /></View>
        <Touchable onPress={this.props.navigateToAbout}><Text>Go to About</Text></Touchable>
        
        <Dialog visible={this.state.modalVisible} title={this.state.selectedNote.title} content={this.state.selectedNote.content} onClose={this._hideOverlay}/>
        <Loader visible={this.props.showLoader}/>
      </View>
    );
  }
}

App.propTypes = {
  notes: PropTypes.array,
  navigateToAbout: PropTypes.func,
  fetchNotes: PropTypes.func,
  addNoteRequest: PropTypes.func,
  deleteNoteRequest: PropTypes.func,
  showLoader: PropTypes.bool
};

const mapStateToProps = (storeState) => ({
  notes: storeState.notes,
  showLoader: result(storeState, 'loader.isVisible', false)
});

const bindNavigationActionCreators = (routeName, dispatch) => () => {
  dispatch(NavigationActions.navigate({routeName}));
};

export const mapDispatchToProps = (dispatch) => ({
  navigateToAbout: bindNavigationActionCreators(actions.ABOUT_APP, dispatch),
  fetchNotes: bindActionCreators(actions.fetchNotes, dispatch),
  addNoteRequest: bindActionCreators(actions.addNoteRequest, dispatch),
  deleteNoteRequest: bindActionCreators(actions.deleteNoteRequest, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);