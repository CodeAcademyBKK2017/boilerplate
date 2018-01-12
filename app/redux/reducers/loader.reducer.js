import {HIDE_LOADER, SHOW_LOADER} from '../actions/index.actions';

const loader = (previousState = {isLoaderVisible: false}, action) => {
  switch (action.type) {
  case SHOW_LOADER: {
    return {...previousState, isLoaderVisible: true};
  }
  case HIDE_LOADER: {
    return {isLoaderVisible: false};
  }
  default:
    return {isLoaderVisible: false};
  }
};

export default loader;
