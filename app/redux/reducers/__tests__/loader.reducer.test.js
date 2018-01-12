import loaderReducer from '../loader.reducer';

describe('loaderReducer', () => {
  let previousState, action, result, expected;
  it('Case SHOW_LOADER', () => {
    action = {type: 'SHOW_LOADER', payload: 'xxxx'};
    expected = {'isVisible': true};
    result =  loaderReducer(previousState, action);
    expect(result).toEqual(expected);
  });
  it('Case HIDE_LOADER', () => {
    action = {type: 'HIDE_LOADER', payload: 'xxxx'};
    expected = {'isVisible': false};
    result =  loaderReducer(previousState, action);
    expect(result).toEqual(expected);
  });
  it('Case default', () => {
    previousState = {'isVisible': false};
    action = {type: '', payload: 'xxxx'};
    expected = {'isVisible': false};
    result =  loaderReducer(previousState, action);
    expect(result).toEqual(expected);
  });
});