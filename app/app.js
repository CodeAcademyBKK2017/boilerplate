import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Loader from './components/Loader/Loader.compoments';
import Lower from './components/Lower/Lower.component';
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
import * as actions from './redux/reducers/actions/index.actions';

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

  onSaveButtonPress = () => {
    const note = {
      title: this.state.textTitle,
      content: this.state.textContent
    };
    this.props.saveHandler(note);
  }

  onDeleteButtonPress = (item) => async () => {
    this.props.deleHandler(item);
  }
  
  componentDidMount () {
    this.props.fetchNote();
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
  showAboutUs: PropTypes.func,
  notes: PropTypes.array,
  modalIsVisibel: PropTypes.bool,
  saveHandler: PropTypes.func,
  fetchNote: PropTypes.func,
  deleHandler: PropTypes.func
};

App.defaultProps = {
  navigation: noop
};

const mapStateToProps = (state) => ({
  notes: state.notes,
  modalIsVisibel: state.loader
});

export const mapDispatchToProps = (dispatch) => ({
  fetchNote: bindActionCreators(actions.fetchNote, dispatch),
  saveHandler: bindActionCreators(actions.saveHandler, dispatch),
  deleHandler: bindActionCreators(actions.deleHandler, dispatch),
  addNote: bindActionCreators(actions.addNote, dispatch),
  showAboutUs: () => {
    dispatch(NavigationActions.navigate({routeName: 'About'}));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);