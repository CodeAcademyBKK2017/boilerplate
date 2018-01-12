import {HIDE_LOADER, SHOW_LOADER} from './actions/index.actions';

const loader = (show, action) => {
  switch (action.type) {
  case SHOW_LOADER : {
    return show = true;
  }
  case HIDE_LOADER : {
    return show = false;
  }
  default:
    return show = false;
  }
};

export default loader;