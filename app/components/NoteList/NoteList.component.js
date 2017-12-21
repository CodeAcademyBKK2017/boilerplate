import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  FlatList, Text, View
} from 'react-native';

export default class NoteList extends Component {
  renderItem = ({item}) => (
    <View>
      <Text>{item.title}</Text>
    </View>
  );

  render () {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this.renderItem}/>
    );
  }
}

NoteList.propTypes = {
  data: PropTypes.array.isRequired
};

NoteList.defaultProps = {
  data: []
};
