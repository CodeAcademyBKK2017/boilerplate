import notes from '../notes.saga';
import sagaHelper from 'redux-saga-testing';
import sagas from '../index';
import {fork} from 'redux-saga/effects';

describe('index sags: should fork all the sagas', () => {
  const it = sagaHelper(sagas());
  it('notes', (result) => {
    expect(result).toEqual(fork(notes));
  });
  it('should fork notes saga', (result) => {
    expect(result).toBeUndefined();
  });
});