// import noop from 'lodash/noop';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ShowNotesStyle from './ShowNotes.style';
import {
//   Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class ShowNotes extends Component {
    state = {
      title: '',
      content: '',
      setVisible: false
    }
    _keyExtractor = (item) => item.uuid;
    _renderItem = ({item}) => 
      <TouchableOpacity onPress={this.onShowAlert(item)}>
        <View style={ShowNotesStyle.boxShowNotes}>
          <Text>{item.title}</Text>
          <Text>{item.content}</Text>
        </View>
      </TouchableOpacity>;

    onShowAlert = (item) => () => this.setState({title: item.title, content: item.content, setVisible: !this.state.setVisible});
    onCloseModal = () => this.setState({title: '', content: '', setVisible: !this.state.setVisible});

    render () {
      return (
        <View style={ShowNotesStyle.boxMain}>
          <FlatList data={this.props.note} renderItem={this._renderItem} keyExtractor={this._keyExtractor}/>
          
          <Overlay visible={this.state.setVisible}
            closeOnTouchOutside animationType='zoomIn'
            containerStyle={ShowNotesStyle.containerStyle}
            childrenWrapperStyle={ShowNotesStyle.childrenWrapperStyle}
            animationDuration={500}
            onClose={this.onCloseModal}>

            <Text>{this.state.title}</Text>
            <Text>{this.state.content}</Text>
          </Overlay>
        </View>
      );
    }
}

ShowNotes.propTypes = {
  note: PropTypes.array.isRequired
};
ShowNotes.defaultProps = {
  note: []
};