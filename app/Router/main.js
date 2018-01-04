/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from '../components/Content/Content.component.js';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './main.style';
import Swipeout from 'react-native-swipeout';
import Title from '../components/Title/Title.component';
import uuid from 'uuid';
import {
  AsyncStorage,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class App extends Component {

  state = {
    title: '',
    text: '',
    NOTES: [],
    modalVisible: false,
    modalText: []
  }
  componentDidMount () {
    this.onLoadState();
  }
  onLoadState = async () => {
    const data = await AsyncStorage.getItem('NOTES');
    this.setState(JSON.parse(data));
  }
  onCount = (v) => this.setState({text: v});
  onTitle = (v) => this.setState({title: v});
  saveNote = () => {
    const data = {'title': this.state.title, 'content': this.state.text, 'unique': uuid()};
    const newNotes = [...this.state.NOTES, data];
    this.setState(
      {title: '', text: '', 'NOTES': newNotes}, () => {
        AsyncStorage.setItem('NOTES', JSON.stringify(this.state));
      }
    );
  }
  delNote = (uuid) => () => {
    const res = this.state.NOTES.filter((element) => element.unique !== uuid);
    this.setState(
      {title: '', text: '', 'NOTES': res}, () => {
        AsyncStorage.setItem('NOTES', JSON.stringify(this.state));
      }
    );
  }
  openModal = (arg) => () => {
    const data = {'title': arg.item.title, 'content': arg.item.content, 'unique': uuid()};
    this.setState({
      modalVisible: true,
      modalText: data
    });
  }
  closeModal = () => {
    this.setState({
      modalVisible: false

    });
  }
  pageAbout = () => {
    this.props.navigation.navigate('About');
  }
  _keyExtractor = (item) => item.unique;
  _renderItem = (args) =>
    <View style={styles.row}>
      <Swipeout
        style={styles.swipe}
        right={
          [{
            text: 'Edit',
            color: '#fff',
            backgroundColor: '#49ba88'
          },
          {
            text: 'Delete',
            onPress: this.delNote(args.item.unique),
            color: '#fff',
            backgroundColor: 'red'
          }]
        }>
        <TouchableOpacity
          onPress={this.openModal(args)}>
          <View>
            <Text>{args.item.title}</Text>
            <Text>{args.item.content}</Text>
          </View>
        </TouchableOpacity>
      </Swipeout>
    </View>
  render () {
    return (
      <View style={styles.container}>
        <Overlay visible={this.state.modalVisible}
          onClose={this.closeModal}
          closeOnTouchOutside animationType='zoomIn'
          animationDuration={500}>
          <Text>{this.state.modalText.title}</Text>
          <Text>{this.state.modalText.content}</Text>
        </Overlay>
        <Title titles={this.onTitle} textTitle={this.state.title}/>
        <Content texts={this.state.text} Fn={this.onCount}
          FnSave={this.saveNote}/>
        <View style={styles.conFlat}>
          <FlatList
            style={styles.flat}
            data={this.state.NOTES}
            extraData={this.state}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        </View>
        <Button
          onPress={this.pageAbout}
          title='About'
        />
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

