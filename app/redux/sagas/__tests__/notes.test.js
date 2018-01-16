import ApiNotes from '../../../api';
import notes, {addNote, deleteNote, getData, newFun} from '../notes.sagas';
import notesUtil from '../../../utils/transfromer.util';
import sagaHelper from 'redux-saga-testing';
import storage from '../../../utils/storage.util';
import {call, put, take, takeEvery} from 'redux-saga/effects';
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
describe('getData', () => {
  const it = sagaHelper(getData());
  it('getData call api success', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));
    return new Error(['1111111']);
  });
  it('getData call api error', (result) => {
    expect(result).toEqual(call(storage.getItem, 'notes'));
    return (['1111111']);
  });
});
describe('newFun', () => {
  const notes = {};
  const it = sagaHelper(newFun());
  it('newFun showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('newFun getData', (result) => {
    expect(result).toEqual(call(getData));
    return notes; 
  });
  it('newFun put action addNote', (result) => {
    expect(result).toEqual(put(actions.populateNotes(notes)));
  });
  it('newFun put action hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
});
describe('addNote', () => {
  const action = {
    type: 'ADD_NOTE_REQUEST',
    payload: 1
  };        
  const it = sagaHelper(addNote(action));
  const response = {};
  it('addNote showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('addNote call api addNote', (result) => {
    expect(result).toEqual(call(ApiNotes.addNote, action.payload));
    return response;
  });
  it('addNote call put addNote', (result) => {
    expect(result).toEqual(put(actions.addNote(response)));
  });
  it('addNote call storage', (result) => {
    expect(result).toEqual(call(storage.setItem, 'notes', response));
  });
  it('addNote hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
});
describe('addNote', () => {
  const action = {
    type: 'ADD_NOTE_REQUEST',
    payload: 1
  };        
  const it = sagaHelper(deleteNote(action));
  const response = {};
  it('deleteNote showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('deleteNote call api', (result) => {
    expect(result).toEqual(call(ApiNotes.deleteNote, action.payload.id));
    return response;
  });
  it('deleteNote call storage', (result) => {
    expect(result).toEqual(call(storage.setItem, 'notes', response));
  });
  it('deleteNote put populateNotes', (result) => {
    expect(result).toEqual(put(actions.populateNotes(response)));
  });
  it('deleteNote put deletefailed', (result) => {
    expect(result).toEqual(put(actions.deletefailed));
  });
  it('deleteNote storage', (result) => {
    expect(result).toEqual(call(storage.setItem, 'notes', notesUtil.deleteNote, response));
  });
  it('deleteNote hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
});