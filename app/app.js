import ContentBox from './components/ContentBox/ContentBox.component';
import Footer from './components/FooterBox/FooterBox.component';
import ListItem from './components/ListItem/ListItem.component';
import LoaderView from './components/Loader/Loader.component';
import noop from 'lodash/noop';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import style from './app.style';
import TitleBox from './components/TitleBox/TitleBox.component';
import {bindActionCreators} from '../../../../Library/Caches/typescript/2.6/node_modules/redux';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {
  Text,
  View
} from 'react-native';
import * as actions from './redux/actions/index.action';

class App extends Component {

  static navigationOptions = {
    drawerLabel: 'Home',
    title: 'Home'
  }

  state = {
    modalData: {},
    titleText: '',
    contentText: ''
  }

  componentDidMount () {
    this.props.fetchNotes();
  }

  onTitleChange = (title) => this.setState({titleText: title});

  onContentChange = (content) => this.setState({contentText: content});
  
  onSave = () => {
    const newNote = ({
      title: this.state.titleText,
      content: this.state.contentText
    });
    this.props.addNotesRequest(newNote);
    this.setState({titleText: '', contentText: ''});
  }

  onDelete = (item) => () => this.props.deleteNotesRequest(item);

  onShowModal = (note) => () => this.setState({modalData: note});

  onCloseModal = () => this.setState({modalData: {}});

  showFlatList = () => (this.props.notes.length > 0) ? 
    (<ListItem 
      dataNotes={this.props.notes}
      onShowModal={this.onShowModal}
      onDelete={this.onDelete}
    />) : null ;

  viewOverlay = () => <Overlay 
    visible={!!(this.state.modalData.title)}
    onClose={this.onCloseModal} closeOnTouchOutside={true}>
    <Text style={style.textTitleStyle}>{this.state.modalData.title}</Text>
    <Text style={style.textContentStyle}>{this.state.modalData.content}</Text>
  </Overlay>

  render () {
    return (
      <View style={style.container}>
        <TitleBox titleValueText={this.state.titleText} onTitleChange={this.onTitleChange}/>
        <ContentBox count={this.state.contentText.length} contentValueText={this.state.contentText} onContentChange={this.onContentChange} onSave={this.onSave} onDelete={this.onDelete}/>
        {this.showFlatList()}
        {this.viewOverlay()}
        <LoaderView modalVisibility={this.props.modalShow.isVisible}/>
        <Footer openAbout={this.props.navigateToAbout}/>
      </View>
    );
  }
}

App.propTypes = {
  fetchNotes: PropTypes.func.isRequired,
  navigateToAbout: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
  modalShow: PropTypes.object.isRequired,
  addNotesRequest: PropTypes.func.isRequired,
  deleteNotesRequest: PropTypes.func.isRequired
};

App.defaultProps = {
  fetchNotes: noop,
  navigateToAbout: noop,
  notes: [],
  modalShow: {},
  addNotesRequest: noop,
  deleteNotesRequest: noop
};

export const mapStateToProps = (state) => ({
  notes: (state.notes !== null) ? state.notes : [], 
  modalShow: state.loader
});

export const mapDispatchToProps = (dispatch) => ({
  addNotesRequest: bindActionCreators(actions.addNotesRequest, dispatch),
  deleteNotesRequest: bindActionCreators(actions.deleteNotesRequest, dispatch),
  fetchNotes: () => bindActionCreators(actions.fetchNote, dispatch),
  navigateToAbout: () => {
    dispatch(NavigationActions.navigate({routeName: 'About'}));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);