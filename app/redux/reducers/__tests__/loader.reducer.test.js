import loader from '../loader.reducer';

it('loader showLoader', () => {
  const action = {
    type: 'SHOW_LOADER'
  };
  const result = loader(false, action);
  expect(result).toEqual(true);
});
it('loader hideLoader', () => {
  const action = {
    type: 'HIDE_LOADER'
  };
  const result = loader(false, action);
  expect(result).toEqual(false);
});
it('default', () => {
  const action = {
    type: ''
  };
  const result = loader(false, action);
  expect(result).toEqual(false);
});