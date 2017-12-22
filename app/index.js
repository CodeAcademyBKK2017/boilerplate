/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/contents/content.component';
import Footer from './components/footers/footer.component';
import globalStyle from './index.style';
import List from './components/lists/list.component';
import React, {Component} from 'react';
import Title from './components/titles/title.component';
import uuid from 'uuid';
import {View} from 'react-native';

export default class App extends Component {
  state = {
    currentContent: '',
    currentTitle: '',
    arrayContent: []
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
  }

  _removeContent = (key) => () => { 
    const newArray = this.state.arrayContent.filter((item) => item.key !== key);
    this.setState({arrayContent: newArray});
  }

  render () {
    return (
      <View style={globalStyle.container}>
        <Title text={this.state.currentTitle} FTitle={this._onTitleChange} />  
        <Content FText={this._onContentChange} textState={this.state.currentContent}/>
        <Footer textState={this.state.currentContent.length} addContent={this._addContent}/>
        <List arrayContent={this.state.arrayContent} removeNote={this._removeContent}/>
      </View> 
    );
  }
}
