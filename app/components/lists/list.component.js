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
import Swipeout from 'react-native-swipeout';
import {
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
    };

    _closeModal = () => {
      this.setState({modalVisible: false, currentItem: {}});
     
    }
      _renderItems = ({item}) =>
        (
          <Swipeout  right={[
            {
              text: 'Delete!',
              onPress: this.props.removeNote(item),
              type: 'delete'
            }
          ]} style={styles.swipoutStyle}>
            <TouchableOpacity onPress={this._showPopup(item)} style={styles.touchStyle}>
              <View style={styles.textView}>
                <Text style={styles.title}>
                  {item.title}
                </Text>
                <Text>
                  {item.content}
                </Text>
              </View>
              <View style={styles.deleteBTN}>
                <Text>
                Swipe Me...
                </Text>
              </View>
            </TouchableOpacity>
          </Swipeout>)
    
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