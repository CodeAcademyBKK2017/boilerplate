import Loader from '../loader.reducer';
import {HIDE_LOADER, SHOW_LOADER} from '../../actions/index.actions';

describe('Loader Reducer Testing', () => {
  it('renders correctly SHOW_LOADER', () => {

    const result = Loader({}, {type: SHOW_LOADER});
    expect(result).toEqual({visible: true});
  });
  it('renders correctly HIDE_LOADER', () => {

    const result = Loader({}, {type: HIDE_LOADER});
    expect(result).toEqual({visible: false});
  });
  it('renders correctly Other', () => {

    const result = Loader({visible: false}, {type: 'other'});
    expect(result).toEqual({visible: false});
  });
});
