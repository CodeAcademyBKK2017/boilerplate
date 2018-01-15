import AboutSection from './components/AboutSection/AboutSection.component';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Loader from './components/Loader/Loader.component';
import noop from 'lodash/noop';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './index.style';
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

  onSaveButtonPress = async () => {
    const note = {
      title: this.state.textTitle,
      content: this.state.textContent
    };
    this.props.addNoteRequest(note);
  }

  onDeleteButtonPress = (item) => async () => {
    this.props.deleteNoteRequest(item.id);
  }

  componentDidMount () {
    this.props.fetchNotes();
  }

  render () {
    return (
      <this.WrapperView
        style={[styles.container]}
        behavior='padding'>
        <Loader visible={false} transparent={true} />
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
      </this.WrapperView>
    );
  }
}

App.propTypes = {
  notes: PropTypes.array.isRequired,
  addNoteRequest: PropTypes.func.isRequired,
  deleteNoteRequest: PropTypes.func.isRequired,
  navigateToAbout: PropTypes.func.isRequired,
  fetchNotes: PropTypes.func.isRequired
};

App.defaultProps = {
  navigation: null,
  notes: [],
  addNoteRequest: noop,
  deleteNoteRequest: noop,
  navigateToAbout: noop,
  fetchNotes: noop
};

const mapStateToProps = (storeState) => ({
  notes: storeState.notes,
  loader: storeState.loader
});

export const mapDisplatchToProps = (dispatch) => ({
  addNoteRequest: bindActionCreators(actions.addNoteRequest, dispatch),
  deleteNoteRequest: bindActionCreators(actions.deleteNoteRequest, dispatch),
  fetchNotes: () => dispatch({type: 'FETCH_NOTES'}),
  navigateToAbout: () => dispatch(NavigationActions.navigate({routeName: 'About'}))
});

export default connect(mapStateToProps, mapDisplatchToProps)(App);