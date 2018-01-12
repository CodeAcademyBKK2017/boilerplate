import {HIDE_LOADER, SHOW_LOADER} from '../actions/index.actions';

const loader = (previousState = {visible: false}, action) => {
  switch (action.type) {
  case SHOW_LOADER: {
    return {visible: true};
  }
  case HIDE_LOADER: {
    return {visible: false};
  }
  default:
    return previousState;
  }
};

export default loader;

// loader({}, {type: 'SHOW_LOADER'}) // {visible: true}

// loader({}, {type: 'HIDE_LOADER'}) // {visible: false}

// loader() // previousState