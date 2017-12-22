/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import noop from 'lodash/noop';
import Overlay from '../overlays/overlay.component';
import ProptTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './list.style';
import {
  // AsyncStorage,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class List extends Component {
    state = {
      modalVisible: false,
      currentItem: {}
    }

    _showPopup = (item) => () => {
      this.setState({modalVisible: true, currentItem: item}); 
      // AsyncStorage.setItem('theState', JSON.stringify({modalVisible: true, currentItem: item}));
      // AsyncStorage.getItem('theState').then((value) => JSON.parse(value)).then((alreadyParsed) => console.log(alreadyParsed));
    };

    _closeModal = () => {
      this.setState({modalVisible: false, currentItem: {}});
     
    }
      _renderItems = ({item}) =>
        (<TouchableOpacity onPress={this._showPopup(item)} style={styles.touchStyle}>
          <View style={styles.textView}>
            <Text style={styles.title}>
              {item.title}

            </Text>
            <Text>
              {item.content}
            </Text>
          </View>
          <View>
            <Button title='!' onPress={this.props.removeNote(item.key)}/>
          </View>
        </TouchableOpacity>)
    
      render () {
        const {arrayContent} = this.props;
        return (
          <View style={styles.container}>
            <Overlay item={this.state.currentItem} modalVisible={this.state.modalVisible} closeModal={this._closeModal}/>
            <FlatList data={arrayContent} renderItem={this._renderItems}/>
          </View>
        );

      }
}
List.propTypes = {
  arrayContent: ProptTypes.array.isRequired,
  removeNote: ProptTypes.func.isRequired
};
  
List.defaultProps = {
  arrayContent: [],
  removeNote: noop
};