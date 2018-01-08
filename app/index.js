import React, {Component} from 'react';
import Router from './routes/index';
import {initStore} from './redux/store';

import {Provider} from 'react-redux';

const store = initStore();

class NoteTaker extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default NoteTaker;
