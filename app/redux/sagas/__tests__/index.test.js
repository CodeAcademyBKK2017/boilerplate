import notes from '../notes.sagas';
import sagaHelper from 'redux-saga-testing';
import sagas from '../index.sagas';
import {fork} from 'redux-saga/effects';

describe('index saga: sould fork all the sagas', () => {
  const it = sagaHelper(sagas());
  it('should fork notes saga', (result) => {
    expect(result).toEqual(fork(notes));
  });

  it('should fork notes saga', (result) => {
    expect(result).toBeUndefined();
  });
});