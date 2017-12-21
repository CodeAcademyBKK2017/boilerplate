/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import ProptTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './list.style';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class List extends Component {
    _showPopup =(item) => () => Alert.alert(item.title, item.content);

      _renderItems = ({item}) =>
        <TouchableOpacity onPress={this._showPopup(item)} style={styles.touchStyle}>
          <View>
            <Text style={styles.title}>
              {item.title}
            </Text>
            <Text>
              {item.content}
            </Text>
          </View>
        </TouchableOpacity>
    
      render () {
        const {arrayContent} = this.props;
        return (
          <FlatList style={styles.container} data={arrayContent} renderItem={this._renderItems}/>
        );
      }
}
List.propTypes = {
  arrayContent: ProptTypes.array.isRequired
};
  
List.defaultProps = {
  arrayContent: []
};