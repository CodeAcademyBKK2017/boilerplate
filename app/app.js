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
import ProptTypes from 'prop-types';
import React, {
  Component
} from 'react';
import Title from './components/titles/title.component';
import uuid from 'uuid';
import {Alert, 
  AsyncStorage,
  Text,
  TouchableOpacity, View} from 'react-native';

export default class App extends Component {
  state = {
    currentContent: '',
    currentTitle: '',
    arrayContent: []
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
      this.setState({
        arrayContent: response
      });
      
    } catch (e) {
      const value = await AsyncStorage.getItem('theState');
      let arrayContent;
      if (value) {
        arrayContent = JSON.parse(value);
      } else {
        arrayContent = [];
      }

      this.setState({
        arrayContent
      });
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
      const newValue = {title: this.state.currentTitle, content: this.state.currentContent, key: uuid()};
      await ApiNotes.addNote(newValue);
      await this._setStroage();
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
      console.log(this.state);
      await ApiNotes.deleteNote(content.id);
      const newArray = this.state.arrayContent.filter((item) => item.key !== content.key);
      const newState = {
        currentContent: '',
        currentTitle: '',
        arrayContent: newArray
      };
      await AsyncStorage.setItem('theState', JSON.stringify(newState));
      this.setState({arrayContent: newArray});
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
        <List arrayContent={this.state.arrayContent} removeNote={this._removeContent}/>
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
  navigation: ProptTypes.object.isRequired
};
  
App.defaultProps = {
  navigation: {}
};
