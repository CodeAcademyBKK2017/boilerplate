/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Api from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Loader from './components/Loader/Loader.compoments';
import Lower from './components/Lower/Lower.component';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import storageutil from './utils/storageutil';
import styles from './index.style';
import Title from './components/Title/Title.component';
import Tranformerutil from './utils/tranformerutil';
import {
  Alert, KeyboardAvoidingView, Platform, View
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import * as actions from './redux/reducers/actions/index.actions';

//
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
    this.props.showLoader();
    const newNotes = [...this.props.notes];
    const note = {
      title: this.state.textTitle,
      content: this.state.textContent
    };
    
    try {
      const addedNote =  await Api.onAddNote(note);
      const newData = {
        title: this.state.textTitle,
        content: this.state.textContent,
        id: addedNote.id
      };
      newNotes.push(newData);
      this.props.addNote(newData);
      const newState = {
        textTitle: '',
        textContent: '',
        notes: newNotes
      };
      await storageutil.setItem(newNotes);
      this.setState(newState);
      this.props.hideLoader();
    } catch (e) {
      this.props.hideLoader();
      Alert.alert(
        'Error',
        'Internet error',
        {cancelable: true}
      );
    }
  }

  onShowAboutUs = () => {
    // this.props.navigation.navigate('About');
    // this.props.showAboutUs();
  }

  onDeleteButtonPress = (item) => async () => {
    this.props.showLoader();
    try {
      await new Api.onDelete(item.id);
      this.props.deleNote(item);
      await storageutil.setItem(Tranformerutil.removeNote(this.props.notes, item.id));
      this.props.hideLoader();
    } catch (e) {
      this.props.hideLoader();
      Alert.alert(
        'Error',
        'Internet error',
        {cancelable: true}
      );
    }
  }

  onLoad = async () => {
    this.props.showLoader();
    try {
      const notes = await new Api.onGetNote();
      this.props.loadServer(notes);
      this.props.hideLoader();
    } catch (e) {
      this.props.loadServer(await storageutil.getItem());
      this.props.hideLoader();
    }
  }

  componentDidMount () {
    this.onLoad();
  }

  render () {
    return (
      <this.WrapperView
        style={[styles.container]}
        behavior='padding'>
        <Loader show={this.props.modalIsVisibel} />
        <Title
          text={this.state.textTitle}
          onChangeTextTitle={this.onChangeTextTitle}/>
        <Content
          style={styles.fill}
          text={this.state.textContent}
          onChangeTextContent={this.onChangeTextContent}/>
        <Footer
          textContentLength={this.state.textContent.length}
          onSaveButtonPress={this.onSaveButtonPress}
        />
        {
          this.props.notes.length > 0 ? <NoteList data={this.props.notes} onDeleteButtonPress={this.onDeleteButtonPress}/> : null
        }
        <Lower
          onShowAboutUs={this.props.showAboutUs} />
      </this.WrapperView>
    );
  }
}

App.propTypes = {
  // navigation: PropTypes.func,
  showAboutUs: PropTypes.func,
  notes: PropTypes.array,
  modalIsVisibel: PropTypes.bool,
  loadServer: PropTypes.func,
  deleNote: PropTypes.func,
  addNote: PropTypes.func,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func
};

App.defaultProps = {
  navigation: () => {}
};

const mapStateToProps = (state) => ({
  notes: state.notes,
  modalIsVisibel: state.loader
});

export const mapDispatchToProps = (dispatch) => ({
  addNote: bindActionCreators(actions.addNote, dispatch),
  // addNote: (note) => {
  //   dispatch(actions.addNote(note));
  // },
  deleNote: (note) => {
    dispatch(actions.deleNote(note));
  },
  loadServer: (note) => {
    dispatch(actions.loadServer(note));
  },
  showAboutUs: () => {
    // dispatch({
    //   type: 'Navigation/NAVIGATE',
    //   routeName: 'About'
    // });
    dispatch(NavigationActions.navigate({routeName: 'About'}));
  },
  showLoader: () => {
    dispatch(actions.showLoader());
  },
  hideLoader: () => {
    dispatch(actions.hideLoader());
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);