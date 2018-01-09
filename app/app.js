/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import ApiNotes from './api';
import Content from './components/contents/content.component';
import Footer from './components/footers/footer.component';
import globalStyle from './app.style';
import Icon from 'react-native-vector-icons/Foundation';
import List from './components/lists/list.component';
import noop from 'lodash/noop';
import ProptTypes from 'prop-types';
import React, {
  Component
} from 'react';
import Title from './components/titles/title.component';
import {Alert, 
  AsyncStorage,
  Text,
  TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';

class App extends Component {
  state = {
    currentContent: '',
    currentTitle: ''
  }
  
  static navigationOptions = ({navigation}) => {
    const _toggleNavigate = () => navigation.navigate('DrawerToggle');
    return {
      title: 'Home',
      headerLeft: (<TouchableOpacity style={{marginLeft: 10}} onPress={_toggleNavigate}><Icon name='list' size={30}/></TouchableOpacity>)
    };
  }
  
  componentDidMount () {
    this._setStroage();
  }

  _setStroage = async () => {
    try {
      const response = await ApiNotes.getNotes();
      (response.length !== 0) && this.props.populateFromReducer(response);
    } catch (e) {
      const value = await AsyncStorage.getItem('theState');
      let arrayContent;
      if (value) {
        arrayContent = JSON.parse(value);
      } else {
        arrayContent = [];
      }
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
      const noteWithID = await ApiNotes.addNote(newnote);  
      this.props.addNoteToReducer(noteWithID);
      this.setState({currentContent: '', currentTitle: ''});
      await AsyncStorage.setItem('theState', JSON.stringify(this.props.arrayContent));
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
  
  _gotoAbout = () => this.props.navigation.navigate('About');

  render () {
    return (
      <View style={globalStyle.container}>
        <Title text={this.state.currentTitle} FTitle={this._onTitleChange} />  
        <Content FText={this._onContentChange} textState={this.state.currentContent}/>
        <Footer textState={this.state.currentContent.length} addContent={this._addContent}/>
        <List arrayContent={this.props.arrayContent} removeNote={this._removeContent}/>
        <TouchableOpacity style={globalStyle.touchStyle} onPress={this._gotoAbout}>
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
  navigation: ProptTypes.object.isRequired,
  addNoteToReducer: ProptTypes.func.isRequired,
  arrayContent: ProptTypes.array.isRequired,
  deleteNoteFromReducer: ProptTypes.func.isRequired,
  populateFromReducer: ProptTypes.func.isRequired
};
  
App.defaultProps = {
  navigation: {},
  addNoteToReducer: noop,
  deleteNoteFromReducer: noop,
  arrayContent: [],
  populateFromReducer: noop
};

const mapDispatchToProps = (dispatch) => ({
  addNoteToReducer: (noteWithID) => {
    dispatch({
      type: 'ADD_NOTE',
      payload: noteWithID
    });
  },
  deleteNoteFromReducer: (id) => {
    dispatch({
      type: 'DELETE_NOTE',
      payload: id
    });
  },
  populateFromReducer: (allNote) => {
    dispatch({
      type: 'POPULATE_NOTE',
      payload: allNote
    });
  }
});
const mapStateToProps = (stateStore) => ({
  arrayContent: stateStore.notes
});
export default connect(mapStateToProps, mapDispatchToProps)(App);