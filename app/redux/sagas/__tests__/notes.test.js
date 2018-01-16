import notes from '../notes.sagas';
import sagaHelper from 'redux-saga-testing';
import {fork} from 'redux-saga/effects';

describe('notes saga', () => {
  const it = sagaHelper(notes());
  it('', (result) => {
    
  });
});