import {HIDE_LOADER, SHOW_LOADER} from '../actions/index.action';

const loaderReducer = (isVisible = false, action) => {
  switch (action.type) {
  case SHOW_LOADER:
    return true;
  case HIDE_LOADER:
    return false;
  default:
    return isVisible;
  }
};

export default loaderReducer;