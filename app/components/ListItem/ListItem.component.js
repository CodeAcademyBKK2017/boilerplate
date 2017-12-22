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
          <View style={style.flexStyle}>
            <Text style={style.textTitleStyle}>{item.title}</Text>
            <Text style={style.textContentStyle}>{item.content}</Text>
          </View>
          <TouchableOpacity 
            style={style.deleteButtonStyle}
            onPress={ this.props.onDelete(item)}>
            <Text style={style.textDeleteStyle}>X</Text>
          </TouchableOpacity>
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
  onDelete: PropTypes.func.isRequired,
  onShowModal: PropTypes.func.isRequired
};

ListItem.defaultProps = {
  dataNotes: [],
  onDelete: noop,
  onShowModal: noop
};