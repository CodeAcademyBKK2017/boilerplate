import notes from '../notes.sagas';
import saga from '../index.sagas';
import sagaHelper from 'redux-saga-testing';
import {fork} from 'redux-saga/effects';

describe('index saga: should fork all the saga', () => {
  const it = sagaHelper(saga());
  it('should fork notes saga', (result) => {
    expect(result).toEqual(fork(notes));
  });
});