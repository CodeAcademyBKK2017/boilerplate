
import AboutSection from './components/AboutSection/AboutSection.component';
import ApiNotes from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Loader from './components/Loader/Loader.component';
import noop from 'lodash/noop';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import storageUtil from './utility/storage.util';
import styles from './app.style';
import Title from './components/Title/Title.component';
import transformerutil from './utility/transformerutil';
import uuid from 'uuid';
import {
  Alert, KeyboardAvoidingView, Platform, View
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import * as actions from './redux/actions/index.actions';

const notesKey = 'notes';

class App extends Component {
  state = {
    textTitle: '',
    textContent: '',
    notes: []
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

  onSaveButtonPress = async () => {
    try {
      const note = {
        id: uuid(),
        title: this.state.textTitle,
        content: this.state.textContent
      };

      this.props.saveNote(note);

      const newState = {
        textTitle: '',
        textContent: ''
      };
      this.setState(newState);
    } catch (error) {
      Alert.alert(
        'Save Failed',
        String(error),
        [
          {text: 'OK'}
        ],
        {
          cancelable: false
        }
      );
    }
  }

  onDeleteButtonPress = (item) => async () => {
    try {

      this.props.removeNote(item);
    } catch (error) {
      Alert.alert(
        'Delete Failed',
        String(error),
        null,
        {
          cancelable: false
        }
      );
    }
  }

  componentDidMount () {
    // this.loadData();
    this.props.fetchNote();
  }

  render () {
    return (
      <this.WrapperView
        style={[styles.container]}
        behavior='padding'>
        <Loader showLoader={this.props.loader.visible}/>
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
        
        <AboutSection onAboutButtonPress={this.props.goToAbout}/>
      </this.WrapperView>
    );
  }
}

App.propTypes = {
  goToAbout: PropTypes.func,
  notes: PropTypes.array,
  loader: PropTypes.object
};

App.defaultProps = {
  navigation: null,
  notes: [],
  loader: {}
};

const mapStateToProps = (state) => ({notes: state.notes, loader: state.loader});
export const mapDispatchToProps = (dispatch) => ({ // named export
  saveNote: bindActionCreators(actions.addNoteRequest, dispatch),
  removeNote: bindActionCreators(actions.removeNoteRequest, dispatch),
  goToAbout: () => {
    dispatch(NavigationActions.navigate({routeName: 'About'}));
  },
  fetchNote: () => {
    dispatch({type: 'FETCH_NOTES'});
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);