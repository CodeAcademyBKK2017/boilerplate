import notes from '../note.saga';
import sagaHelper from 'redux-saga-testing';
import sagas from '../index';
import {fork} from 'redux-saga/effects';

describe('index saga: shuold fork all the saga', () => {
  const it = sagaHelper(sagas());

  it('sagas call fork', (result) => {
    expect(result).toEqual(fork(notes));
  });

  it('and then notting', (result) => {
    expect(result).toBeUndefined();
  });
  
});