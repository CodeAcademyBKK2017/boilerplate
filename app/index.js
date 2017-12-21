/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/contents/content.component';
import Footer from './components/footers/footer.component';
import globalStyle from './index.style';
import React, {Component} from 'react';
import Title from './components/titles/title.component';
import {View} from 'react-native';

export default class App extends Component {
  state = {
    currentContent: '',
    currentTitle: '',
    arrayContent: []
  }

  onContentChange =  (currentContent) => {
    this.setState({currentContent});
  }
  onTitleChange =  (currentTitle) => {
    this.setState({currentTitle});
  }
  addContent = () => {
    const newValue = {title: this.state.currentTitle, content: this.state.currentContent};
    const newContent = [...this.state.arrayContent, newValue];
    this.setState({currentContent: '',
      currentTitle: '',
      arrayContent: newContent});
  }

  render () {
    return (
      <View style={globalStyle.container}>
        <Title text={this.state.currentTitle} FTitle={this.onTitleChange} />  
        <Content FText={this.onContentChange} textState={this.state.currentContent}/>
        <Footer textState={this.state.currentContent.length} addContent={this.addContent}/>
      </View> 
    );
  }
}
