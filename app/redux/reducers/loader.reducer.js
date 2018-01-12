import {HIDE_LOADER, SHOW_LOADER} from '../actions/index.action';

const loader = (previousState = {isVisible: false}, action) => {
  switch (action.type) {
  case HIDE_LOADER: {
    return {isVisible: false};
  }
  case SHOW_LOADER: {
    return {isVisible: true};
  }
  default: 
    return previousState;
  }
};

export default loader;