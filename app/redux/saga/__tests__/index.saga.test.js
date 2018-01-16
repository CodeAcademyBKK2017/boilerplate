import indexSaga from '../index.saga';
import notes from '../notes.saga';
import sagaHelper from 'redux-saga-testing';
import {fork} from 'redux-saga/effects';

describe('index saga: should be fork the notes', () => {
  const it = sagaHelper(indexSaga());
  it('sagas func be fork a notes func', (result) => {
    expect(result).toEqual(fork(notes));
  });
  it('And then nothing happen', (result) => {
    expect(result).toBeUndefined();
  });
});