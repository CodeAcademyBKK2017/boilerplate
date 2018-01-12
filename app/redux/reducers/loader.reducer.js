import {HIDE_LOADER, SHOW_LOADER} from '../actions/index.actions';

const loader = (isVisible = false, action) => {
  switch (action.type) {
  case SHOW_LOADER:
    return true;
  case HIDE_LOADER:
    return false;
  default:
    return isVisible;
  }
};
export default loader;