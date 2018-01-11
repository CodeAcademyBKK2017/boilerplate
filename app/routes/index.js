import PropTypes from 'prop-types';

import React, {Component} from 'react';
import Router from './main';
import {addNavigationHelpers} from 'react-navigation';

import {connect} from 'react-redux';

class ReduxRouter extends Component {
  render () {
    const {dispatch, nav} = this.props;

    return (
      <Router navigation={addNavigationHelpers({dispatch, state: nav})} />
    );
  }
}

const mapStateToProps = ({nav}) => ({
  nav
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

ReduxRouter.propTypes = {
  dispatch: PropTypes.func,
  nav: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxRouter);