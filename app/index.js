/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/contents/content.component';
import Footer from './components/footers/footer.component';
import globalStyle from './index.style';
import Icon from 'react-native-vector-icons/Foundation';
import List from './components/lists/list.component';
import ProptTypes from 'prop-types';
import React, {
  Component
} from 'react';
import Title from './components/titles/title.component';
import uuid from 'uuid';
import {AsyncStorage, 
  Text,
  TouchableOpacity,
  View} from 'react-native';

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
    const value = await AsyncStorage.getItem('theState');
    this.setState(JSON.parse(value));
  }
  _onContentChange =  (currentContent) => {
    this.setState({currentContent});
  }
  _onTitleChange =  (currentTitle) => {
    this.setState({currentTitle});
  }
  _addContent = () => {
    const newValue = {title: this.state.currentTitle, content: this.state.currentContent, key: uuid()};
    const newContent = [...this.state.arrayContent, newValue];
    const newState = {currentContent: '',
      currentTitle: '',
      arrayContent: newContent};
    this.setState(newState);
    AsyncStorage.setItem('theState', JSON.stringify(newState));
  }

  _removeContent = (key) => () => { 
    const newArray = this.state.arrayContent.filter((item) => item.key !== key);
    this.setState({arrayContent: newArray});
    AsyncStorage.setItem('theState', JSON.stringify({
      currentContent: '',
      currentTitle: '',
      arrayContent: newArray
    }));
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
