import AboutSection from './components/AboutSection/AboutSection.component';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Loader from './components/Loader/Loader.component';
import noop from 'lodash/noop';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import result from 'lodash/result';
import styles from './app.style';
import Title from './components/Title/Title.component';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import * as actions from './redux/actions/index.actions';

class App extends Component {
  state = {
    textTitle: '',
    textContent: ''
  };
  
  WrapperView = Platform.select({
    ios: KeyboardAvoidingView,
    android: View
  });

  onChangeTextTitle = (textTitle) => {
    this.setState({textTitle});
  }

  onChangeTextContent = (textContent) => {
    this.setState({textContent});
  }

  onSaveButtonPress = () => {
    const note = {
      title: this.state.textTitle,
      content: this.state.textContent
    };
    this.props.saveNote(note);
  }

  onDeleteButtonPress = (item) => async () => {
    this.props.deleteRequestNote(item.id);
  }

  componentDidMount () {
    this.props.fetchNotes();
  }

  render () {
    return (
      <this.WrapperView
        style={[styles.container]}
        behavior='padding'>
        <View style={styles.spacingContainer}>
          <Title
            text={this.state.textTitle}
            onChangeTextTitle={this.onChangeTextTitle}/>
          <Content
            style={styles.fill}
            text={this.state.textContent}
            onChangeTextContent={this.onChangeTextContent}/>
          <Footer
            textContentLength={this.state.textContent.length}
            onSaveButtonPress={this.onSaveButtonPress}/>
          {
            this.props.notes.length > 0 ? <NoteList data={this.props.notes} onDeleteButtonPress={this.onDeleteButtonPress}/> : null
          }
        </View>
        
        <AboutSection onAboutButtonPress={this.props.navigateToAbout}/>

        <Loader visible={this.props.modalVisible}/>
      </this.WrapperView>
    );
  }
}

App.propTypes = {
  notes: PropTypes.array.isRequired,
  modalVisible: PropTypes.bool.isRequired,

  fetchNotes: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired,
  deleteRequestNote: PropTypes.func.isRequired,

  navigateToAbout: PropTypes.func.isRequired
};

App.defaultProps = {
  navigation: null,
  
  notes: [],
  modalVisible: false,

  fetchNote: noop,
  saveNote: noop,
  deleteRequestNote: noop,

  navigateToAbout: noop
};

const mapStateToProps = (storeState) => ({
  notes: storeState.notes,
  modalVisible: result(storeState, 'loader.isVisible', false)
});

export const mapDisplatchToProps = (dispatch) => ({
  fetchNotes: bindActionCreators(actions.fetchNotes, dispatch),
  saveNote: bindActionCreators(actions.saveNote, dispatch),
  deleteRequestNote: bindActionCreators(actions.deleteRequestNote, dispatch),
  
  navigateToAbout: () => dispatch(NavigationActions.navigate({routeName: 'About'}))
});

export default connect(mapStateToProps, mapDisplatchToProps)(App);
