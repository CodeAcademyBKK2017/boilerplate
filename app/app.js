import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Loader from './components/Loader/Loader.component';
import noop from 'lodash/noop';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './app.style';
import Title from './components/Title/Title.component';
import {
  Button,
  View
} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

class App extends Component {
  state = {
    title: '',
    content: ''
  }
  componentDidMount () {
    this.props.fetchNotes();
  }

  onSavePress = () => {
    const newNote  = ({
      title: this.state.title,
      content: this.state.content
    });

    this.props.addNoteRequest(newNote);
    this.setState({title: '', content: ''});
  }

  onDeletePress = (item) => () => {
    this.props.removeNotes(item);
  }

  onTypeContent = (textInput) => {
    this.setState({content: textInput});
  }

  onTypeTitle = (titleInput) => {
    this.setState({title: titleInput});
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Title onTypeTitle={this.onTypeTitle} text={this.state.title}/>
          <Content onTypeContent={this.onTypeContent} text={this.state.content}/>
          <Footer countContent={this.state.content.length} onSavePress={this.onSavePress} />
        </View>
        <Loader modalShow={this.props.modalShow}/>
        <NoteList notes={this.props.notes} onDeletePress={this.onDeletePress}/>
        <View style={styles.about}>
          <Button onPress={this.props.goToAbout} title='About' color='#841584'/>
        </View>
      </View>
    );
  }
}

App.propTypes = {
  goToAbout: PropTypes.func,
  notes: PropTypes.array,
  modalShow: PropTypes.object,
  fetchNotes: PropTypes.func,
  addNoteRequest: PropTypes.func,
  removeNotes: PropTypes.func
};
App.defaultProps = {
  goToAbout: noop,
  notes: [],
  modalShow: {},
  fetchNotes: noop,
  addNoteRequest: noop,
  removeNotes: noop
};

const mapStateToProps = (state) => ({notes: state.notes, modalShow: state.loader});
export const mapDispatchToProps = (dispatch) => ({
  addNoteRequest: (payload) => dispatch({type: 'ADD_NOTE_REQUEST', payload}),
  removeNotes: (payload) => dispatch({type: 'DELETE_NOTE_REQUEST', payload}),
  fetchNotes: () => dispatch({type: 'FETCH_NOTE'}),
  goToAbout: () => { 
    dispatch(NavigationActions.navigate({routeName: 'About'})); 
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);