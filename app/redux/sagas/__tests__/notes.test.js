import notes, {addNote, deleteNote, newFun} from '../notes.sagas';
import sagaHelper from 'redux-saga-testing';
import {call, take, takeEvery} from 'redux-saga/effects';
import * as actions from '../../actions/index.actions';

describe('notessaga: should all the saga', () => {
  const it = sagaHelper(notes());
  it('should take notes saga', (result) => {
    expect(result).toEqual(take(actions.FETCH_NOTES));
  });
  it('should call notes saga', (result) => {
    expect(result).toEqual(call(newFun));
  });
  it('should takeEvery addNote saga', (result) => {
    expect(result).toEqual(takeEvery(actions.ADD_NOTE_REQUEST, addNote));
  });
  it('should takeEvery deleteNote saga', (result) => {
    expect(result).toEqual(takeEvery(actions.DELETE_NOTE_SAGA, deleteNote));
  });
});