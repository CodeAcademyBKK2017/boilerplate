import PropTypes from 'prop-types';
import React, {Component} from 'react';
import style from './ListItem.component.style';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class ListItem extends Component {

  onShowDetail = (item) => () => {
    Alert.alert(item.title, item.content);
  }

  renderItemList = ({item}) =>
    <TouchableOpacity 
      onPress={ this.onShowDetail(item)}>
      <View style={style.marginStyle}>
        <Text style={style.textTitleStyle}>{item.title}</Text>
        <Text style={style.textContentStyle}>{item.content}</Text>
      </View>
      <View style={style.divide}/>
    </TouchableOpacity>

  render () {
    return (
      <View>
        <FlatList 
          style={style.flatListStyle}
          data={this.props.dataNotes}
          renderItem={this.renderItemList}/>
      </View>
    );
  }
}

ListItem.propTypes = {
  dataNotes: PropTypes.array.isRequired
};

ListItem.defaultProps = {
  dataNotes: []
};