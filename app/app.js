/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/contents/content.component';
import Footer from './components/footers/footer.component';
import globalStyle from './app.style';
import List from './components/lists/list.component';
import Loader from './components/loaders/loader.component';
import noop from 'lodash/noop';
import ProptTypes from 'prop-types';
import React, {
  Component
} from 'react';
import Title from './components/titles/title.component';
import {addnoterequest, deletenoterequest, FEACH_NOTE, hideloader, showloader} from '../app/redux/actions/index.action';
import {
  Alert,
  Text, 
  TouchableOpacity,
  View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

class App extends Component {
  state = {
    currentContent: '',
    currentTitle: ''
  }

  componentDidMount () {
    this.props.FetchData();
  }
  
  _onContentChange =  (currentContent) => {
    this.setState({currentContent});
  }

  _onTitleChange =  (currentTitle) => {
    this.setState({currentTitle});
  }

  _addContent = async () => {
    try {
      const newnote = {title: this.state.currentTitle, content: this.state.currentContent};
      if (newnote.title === '' || newnote.content === '') {
        throw 'must not empty';
      }
      this.props.addNoteToSaga(newnote);
      this.setState({currentContent: '', currentTitle: ''});
    } catch (e) {
      Alert.alert(
        'Save Failed',
        String(e),
        [
          {text: 'OK'}
        ],
        {
          cancelable: false
        }
      );
    }
  }

  _removeContent = (content) => () => { 
    
    try {
      this.props.deleteNoteToSaga(content.id);
    } catch (e) {
      Alert.alert(
        'Delete Failed',
        String(e),
        null,
        {
          cancelable: false
        }
      );
    }
   
  }
  
  // console.log(this.props);
  // return this.props.navigation.navigate('About');

  render () {
    return (
      <View style={globalStyle.container}>
        <Loader isModalVisible={this.props.isModalVisible}/>
        <Title text={this.state.currentTitle} FTitle={this._onTitleChange} />  
        <Content FText={this._onContentChange} textState={this.state.currentContent}/>
        <Footer textState={this.state.currentContent.length} addContent={this._addContent}/>
        <List arrayContent={this.props.arrayContent} removeNote={this._removeContent}/>
        <TouchableOpacity style={globalStyle.touchStyle} onPress={this.props.gotoAbout}>
          <View>
            <Text style={globalStyle.TextS}>
              About Us
            </Text>
          </View>
        </TouchableOpacity>
      </View> 
    );
  }
}

App.propTypes = {
  gotoAbout: ProptTypes.func.isRequired,
  addNoteToSaga: ProptTypes.func.isRequired,
  arrayContent: ProptTypes.array.isRequired,
  deleteNoteToSaga: ProptTypes.func.isRequired,
  isModalVisible: ProptTypes.bool.isRequired,
  FetchData: ProptTypes.func.isRequired
};
  
App.defaultProps = {
  gotoAbout: noop,
  addNoteToSaga: noop,
  deleteNoteToSaga: noop,
  arrayContent: [],
  isModalVisible: false,
  FetchData: noop
};
const mapStateToProps = (stateStore) => ({
  arrayContent: stateStore.notes,
  isModalVisible: stateStore.loader
});

export const mapDispatchToProps = (dispatch) => ({
  addNoteToSaga: bindActionCreators(addnoterequest, dispatch),
  deleteNoteToSaga: bindActionCreators(deletenoterequest, dispatch),
  showLoaderFromReducer: bindActionCreators(showloader, dispatch),
  hideLoaderFromReducer: bindActionCreators(hideloader, dispatch),
  gotoAbout: () => dispatch(NavigationActions.navigate({routeName: 'About'})),
  FetchData: () => {
    dispatch({type: FEACH_NOTE});
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);