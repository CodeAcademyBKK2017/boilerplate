import noop from 'lodash/noop';
import ProptTypes from 'prop-types';
import React, {Component} from 'react';
import Router from '../app/Routes/index';
import {addNavigationHelpers} from 'react-navigation';
import {connect, Provider} from 'react-redux';
import {initStore} from './redux/store';

const store = initStore();

class NoteTaker extends Component {
  render () {

    return (
      <Provider store={store}>
        <ConnectedRouter />
      </Provider>
    );
  }
}

class ReduxRouter extends Component {
  render () {
    const {dispatch, nav} = this.props;
    const navigation = addNavigationHelpers({dispatch, state: nav});
    return <Router navigation={navigation} />;
  }
}

const mapStateToProps = (state) => ({nav: state.nav});

const ConnectedRouter = connect(mapStateToProps)(ReduxRouter);

ReduxRouter.propTypes = {
  dispatch: ProptTypes.func.isRequired,
  nav: ProptTypes.object.isRequired
};
  
ReduxRouter.defaultProps = {
  dispatch: noop,
  nav: {}
};

export default NoteTaker;