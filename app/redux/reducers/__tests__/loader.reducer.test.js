import loader from '../loader.reducer';

describe('loader', () => {
  let show, action, resule;
  it('SHOW_LOADER', () => {
    show = true;
    action = {
      type: 'SHOW_LOADER'
    };
    resule = loader(show, action);
    expect(resule).toEqual(show);
  });

  it('HIDE_LOADER', () => {
    show = false;
    action = {
      type: 'HIDE_LOADER'
    };
    resule = loader(show, action);
    expect(resule).toEqual(show);
  });

  it('default', () => {
    show = false;
    action = {
      type: 'default'
    };
    resule = loader(show, action);
    expect(resule).toEqual(show);
  });

});