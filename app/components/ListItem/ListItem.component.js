import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import style from './ListItem.component.style';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class ListItem extends Component {

  renderItemList = ({item}) =>
    <View>
      <TouchableOpacity 
        onPress={ this.props.onShowModal(item)}>
        <View style={style.marginStyle}>
          <Text style={style.textTitleStyle}>{item.title}</Text>
          <Text style={style.textContentStyle}>{item.content}</Text>
        </View>
        <View style={style.divide}/>
      </TouchableOpacity>
    </View>
  render () {
    return (
      <View>
        <Text style={style.textNotesStyle}>Notes:</Text>
        <FlatList 
          style={style.flatListStyle}
          data={this.props.dataNotes}
          renderItem={this.renderItemList}/>
      </View>
    );
  }
}

ListItem.propTypes = {
  dataNotes: PropTypes.array.isRequired,
  onShowModal: PropTypes.func.isRequired
};

ListItem.defaultProps = {
  dataNotes: [],
  onShowModal: noop
};