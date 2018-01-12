import Loader from '../../../components/Loader/Loader.component';
import LoaderReducer from '../loader.reducer';
import React from 'react';
import renderer from 'react-test-renderer';

import * as actions from '../../actions/index.actions';

describe('Loader', () => {
  it('Snapshot', () => {
    const snapshot = renderer.create(<Loader visible={true} transparent={true} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Reducer Show', () => {
    const showLoaderAction = {
      type: actions.SHOW_LOADER
    };
    expect(LoaderReducer({}, showLoaderAction)).toEqual(true);
  });

  it('Reducer Hide', () => {
    const hideLoaderAction = {
      type: actions.HIDE_LOADER
    };
    expect(LoaderReducer({}, hideLoaderAction)).toEqual(false);
  });

  it('Reducer Default', () => {
    const defaultLoaderAction = {
      type: {}
    };
    expect(LoaderReducer(false, defaultLoaderAction)).toEqual(false);
  });

  it('Reducer Undefined', () => {
    const undefinedLoaderAction = {
      type: {}
    };
    expect(LoaderReducer(undefined, undefinedLoaderAction)).toEqual(false);
  });
});
