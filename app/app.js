/* importantce git : reference fe473c85516dd4bc41a14d2f5711290a82ddbd17 */
import Content from './components/Content/Content.component';
import firebase from 'react-native-firebase';
import Footer from './components/Footer/Footer.component';
import Loader from './components/Loader/Loader.component';
import Note from './components/Note/Note.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './index.style';
import Title from './components/Title/Title.component';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import * as actions from './redux/actions/index.actions';

class App extends Component {
  initialstate = {
    content: '',
    title: ''}
  state = this.initialstate
  componentDidMount () { 
    firebase.messaging().requestPermissions();
    
    this.props.fetchNotes(); 
  }
  WrapperView = Platform.select(
    {ios: KeyboardAvoidingView,
      android: View}
  )
  changeTitle  = (text) => {
    this.setState({title: text});
  }
  changeContent  = (text) => {
    this.setState({content: text});
  }
  onSave =  () => {
    const note =   {
      title: this.state.title,
      content: this.state.content
    };
    this.props.addNoteRequest(note);
    this.setState(this.initialstate);
  }
  onDelete = (item) =>  () => {
    this.props.deleteNoteRequest(item.id);
  }
  render () {
    return (
      <this.WrapperView style={styles.container} behavior={'padding'} >
        <Title onTitleChange={this.changeTitle} value={this.state.title}/>
        <Content  onContentChange={this.changeContent} value={this.state.content}/>
        <Footer characterCount={this.state.content.length} onPressSave={this.onSave} />
        {this.props.noteList.length > 0 ? <Note noteList={this.props.noteList} onDelete={this.onDelete}/> : null}
        <View><Text onPress={this.props.goToAbout}>about us</Text></View>
        <Loader visibility={this.props.isVisible}/>
      </this.WrapperView>
    );
  }
}

App.propTypes = {
  noteList: PropTypes.array,
  addNoteRequest: PropTypes.func,
  deleteNoteRequest: PropTypes.func,
  fetchNotes: PropTypes.func,
  goToAbout: PropTypes.func,
  isVisible: PropTypes.object

};

App.defaultProps = {
  noteList: []
};
const mapStateToProps = (storeState) => (
  {noteList: storeState.notes, 
    isVisible: result(storeState, 'loader', {})}
);
export const mapDispatchToProps = (dispatch) => ({
  addNoteRequest: bindActionCreators(actions.addNoteRequest, dispatch),
  deleteNoteRequest: bindActionCreators(actions.deleteNoteRequest, dispatch),
  fetchNotes: bindActionCreators(actions.fetchNotes, dispatch),
  goToAbout: () => dispatch(NavigationActions.navigate({routeName: 'About'}))
  // fetchNotes: () => dispatch({type: 'FETCH_NOTES'})
  
});
export default connect(mapStateToProps, mapDispatchToProps)(App);