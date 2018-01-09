import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import style from './ListItem.component.style';
import Swipeout from 'react-native-swipeout';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class ListItem extends Component {

  _keyExtractor = (item) => item.id;

  renderItemList = ({item}) => {
    const swipeoutBtns = [
      {
        text: 'Delete',
        type: 'delete',
        onPress: this.props.onDelete(item)
      }
    ];

    return <Swipeout backgroundColor= '#F5F5F5' right={swipeoutBtns}>
      <TouchableOpacity 
        onPress={ this.props.onShowModal(item)}>
        <View style={style.marginStyle}>
          <View style={style.flexStyle}>
            <Text style={style.textTitleStyle}>{item.title}</Text>
            <Text style={style.textContentStyle}>{item.content}</Text>
          </View>
        </View>
        <View style={style.divide}/>
      </TouchableOpacity>
    </Swipeout>;
  }
  render () {
    return (
      <View>
        <Text style={style.textNotesStyle}>Notes:</Text>
        <FlatList 
          style={style.flatListStyle}
          data={this.props.dataNotes}
          keyExtractor={this._keyExtractor}
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