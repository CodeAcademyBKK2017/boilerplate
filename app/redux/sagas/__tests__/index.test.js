import notes from '../notes.saga';
import sagaHelper from 'redux-saga-testing';
import sagas from '../index.saga';
import {call, fork} from 'redux-saga/effects';

describe('index saga: should fork all the sagas', () => {
  const it = sagaHelper(sagas());
  it('should fork notes saga', (result) => {
    expect(result).toEqual(fork(notes));
  });
//   xit('should fork notes saga 2', (result) => {
//     expect(result).toEqual(call(console.log, 'index saga'));
//   });
//   xit('and then nothing', (result) => {
//     expect(result).toHaveBeenCalled();
//   });
});