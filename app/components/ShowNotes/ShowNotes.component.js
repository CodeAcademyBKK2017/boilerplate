// import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ShowNotesStyle from './ShowNotes.style';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class ShowNotes extends Component {
    _keyExtractor = (item) => item.uuid;
    _renderItem = ({item}) => 
      <TouchableOpacity onPress={this.onShowAlert(item.title, item.content)}>
        <View style={ShowNotesStyle.boxShowNotes}>
          <Text>{item.title}</Text>
          <Text>{item.content}</Text>
        </View>
      </TouchableOpacity>;

    onShowAlert = (title, content) => () => Alert.alert(title, content);
    
    render () {
      return (
        
        <FlatList data={this.props.note} renderItem={this._renderItem} keyExtractor={this._keyExtractor}/>
       
      );
    }
}

ShowNotes.propTypes = {
  note: PropTypes.array.isRequired
};
ShowNotes.defaultProps = {
  note: []
};