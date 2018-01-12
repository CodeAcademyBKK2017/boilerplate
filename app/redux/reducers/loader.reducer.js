import {HIDE_LOADER, SHOW_LOADER} from '../actions/index.actions';

export default (previousState = {isVisible: false}, action) => {
  switch (action.type) {
  case SHOW_LOADER: {
    return {isVisible: true};
  }
  case HIDE_LOADER: {
    return {isVisible: false};
  }
  default:
    return previousState;
  }
};
  