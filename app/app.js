/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import ApiNotes from './api';
import Content from './components/contents/content.component';
import Footer from './components/footers/footer.component';
import globalStyle from './app.style';
import List from './components/lists/list.component';
import noop from 'lodash/noop';
import ProptTypes from 'prop-types';
import React, {
  Component
} from 'react';
import Title from './components/titles/title.component';
import Utility from './util/utility';
import {addnote, deletenote, populatenote} from '../app/redux/actions/index.action';
import {Alert,
  Text,
  TouchableOpacity, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

class App extends Component {
  state = {
    currentContent: '',
    currentTitle: ''
  }

  componentDidMount () {
    this._setStroage();
  }

  _setStroage = async () => {
    try {
      const response = await ApiNotes.getNotes();
      (response.length !== 0) && this.props.populateFromReducer(response);
      Utility.setItemToStroage('theState', this.props.arrayContent);
      await Utility.getItemToStroage('theState');
    } catch (e) {
      const value = await Utility.getItemToStroage('theState');
      const arrayContent = value; 
      this.props.populateFromReducer(arrayContent);
    }
   
  }
  _onContentChange =  (currentContent) => {
    this.setState({currentContent});
  }
  _onTitleChange =  (currentTitle) => {
    this.setState({currentTitle});
  }
  _addContent = async () => {
    try {
      const newnote = {title: this.state.currentTitle, content: this.state.currentContent};
      if (newnote.title === '' || newnote.content === '') {
        throw 'must not empty';
      }
      const noteWithID = await ApiNotes.addNote(newnote);
      this.props.addNoteToReducer(noteWithID);
      this.setState({currentContent: '', currentTitle: ''});
      Utility.setItemToStroage('theState', this.props.arrayContent);
    } catch (e) {
      Alert.alert(
        'Save Failed',
        String(e),
        [
          {text: 'OK'}
        ],
        {
          cancelable: false
        }
      );
    }
  }

  _removeContent = (content) => async () => { 
    try {
      await ApiNotes.deleteNote(content.id);
      this.props.deleteNoteFromReducer(content.id);
      Utility.setItemToStroage('theState', this.props.arrayContent);
    } catch (e) {
      Alert.alert(
        'Delete Failed',
        String(e),
        null,
        {
          cancelable: false
        }
      );
    }
   
  }
  
  // console.log(this.props);
  // return this.props.navigation.navigate('About');

  render () {
    return (
      <View style={globalStyle.container}>
        <Title text={this.state.currentTitle} FTitle={this._onTitleChange} />  
        <Content FText={this._onContentChange} textState={this.state.currentContent}/>
        <Footer textState={this.state.currentContent.length} addContent={this._addContent}/>
        <List arrayContent={this.props.arrayContent} removeNote={this._removeContent}/>
        <TouchableOpacity style={globalStyle.touchStyle} onPress={this.props.gotoAbout}>
          <View>
            <Text style={globalStyle.TextS}>
              About Us
            </Text>
          </View>
        </TouchableOpacity>
      </View> 
    );
  }
}

App.propTypes = {
  gotoAbout: ProptTypes.func.isRequired,
  addNoteToReducer: ProptTypes.func.isRequired,
  arrayContent: ProptTypes.array.isRequired,
  deleteNoteFromReducer: ProptTypes.func.isRequired,
  populateFromReducer: ProptTypes.func.isRequired
};
  
App.defaultProps = {
  gotoAbout: noop,
  addNoteToReducer: noop,
  deleteNoteFromReducer: noop,
  arrayContent: [],
  populateFromReducer: noop
};

export const mapDispatchToProps = (dispatch) => ({
  addNoteToReducer: bindActionCreators(addnote, dispatch),
  deleteNoteFromReducer: bindActionCreators(deletenote, dispatch),
  populateFromReducer: bindActionCreators(populatenote, dispatch),
  gotoAbout: () => dispatch(NavigationActions.navigate({routeName: 'About'}))
});
const mapStateToProps = (stateStore) => ({
  arrayContent: stateStore.notes
});
export default connect(mapStateToProps, mapDispatchToProps)(App);