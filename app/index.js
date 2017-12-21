/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import ContentBox from './components/ContentBox/ContentBox.component';
import Footer from './components/FooterBox/FooterBox.component';
import HeaderBox from './components/HeaderBox/HeaderBox.component';
import React, {Component} from 'react';
import style from './index.style';
import TitleBox from './components/TitleBox/TitleBox.component';
import {View} from 'react-native';

export default class App extends Component {

  state = {
    titleText: '',
    contentText: '',
    NOTES: []
  }

  onTitleChange = (v) => {
    const newState = {...this.state};
    newState.titleText = v;
    this.setState(newState);
  }

  onContentChange = (v) => {
    const newState = {...this.state};
    newState.contentText = v;
    this.setState(newState);
  }

  onSave = () => {
    const newData = {
      title: this.state.titleText,
      content: this.state.contentText
    };
    const newDataNOTES = [...this.state.NOTES , newData];
    console.log(newDataNOTES);

    this.setState({
      titleText: '',
      contentText: '',
      NOTES: newDataNOTES
    }, () => console.log(this.state));
  }

  render () {
    return (
      <View style={style.container}>
        <HeaderBox />
        <TitleBox titleValueText={this.state.titleText} onTitleChange={this.onTitleChange}/>
        <ContentBox count={this.state.contentText.length} contentValueText={this.state.contentText} onContentChange={this.onContentChange} onSave={this.onSave}/>
        <Footer />
      </View>
    );
  }
}