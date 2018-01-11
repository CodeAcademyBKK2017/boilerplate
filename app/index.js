
import React, {Component} from 'react';
import ReduxRouter from './routes/index';

import {initStore} from './redux/store';
import {Provider} from 'react-redux';

const store = initStore();

class NoteTaker extends Component {
  render () {
    return (
      <Provider store={store}>
        <ReduxRouter />
      </Provider>
    );
  }
}

export default NoteTaker;