import notes from '../notes.saga';
import saga from '../index';
import sagaHelper from 'redux-saga-testing';
import {fork} from 'redux-saga/effects';

// test case
describe('index saga', () => {
  const it = sagaHelper(saga());

  it('should fork notes', (result) => {
    expect(result).toEqual(fork(notes));
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
