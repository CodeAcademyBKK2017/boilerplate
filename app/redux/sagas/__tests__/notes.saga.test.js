
import ApiNotes from '../../../api';
import notes, {addNoteHandler, deleteNoteHandler, fetchHandler} from '../notes.saga';
import sagaHelper from 'redux-saga-testing';
import {call, put,  select, take, takeLatest} from 'redux-saga/effects';
import {delay} from  'redux-saga';
import {getItemToStorage, setItemToStorage} from '../../../utils/storageutil';
import * as actions from '../../actions/index.actions';

describe('notes saga : should take all action', () => {
  const it = sagaHelper(notes());
  it('should take actions.fetchNotes', (result) => {
    expect(result).toEqual(take(actions.fetchNotes));
  });
  it('should call fetchHandler', (result) => {
    expect(result).toEqual(call(fetchHandler));
  });
  it('should yield takelatest  ADD_NOTE_REQUEST', (result) => {
    expect(result).toEqual(takeLatest(actions.ADD_NOTE_REQUEST, addNoteHandler));
  });
  it('should yield takelatest  DELETE_NOTE_REQUEST', (result) => {
    expect(result).toEqual(takeLatest(actions.DELETE_NOTE_REQUEST, deleteNoteHandler));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
describe('fetchHandler Success Case :', () => {
  const it = sagaHelper(fetchHandler());
  const response = [{title: 'title response success', content: 'content success'}];
  it('should put showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('should call delay', (result) => {
    expect(result).toEqual(call(delay, 2000));
  });
  it('should call ApiNotes Success', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));
    return response;
  });
  it('should put populateNotes', (result) => {
    expect(result).toEqual(put(actions.populateNotes(response)));
  });
  it('should put hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('fetchHandler Fail Case with Storage Data:', () => {
  const it = sagaHelper(fetchHandler());
  const response = [{title: 'title response fail', content: 'content fail'}];
  it('should put showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('should call delay', (result) => {
    expect(result).toEqual(call(delay, 2000));
  });
  it('should call ApiNotes Fail', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));
    return new Error('Something went wrong');
  });
  it('should call getItemToStorage after Fail', (result) => {
    expect(result).toEqual(call(getItemToStorage, 'storageNote'));
    return response;
  });
  it('should put populateNotes with storageData', (result) => {
    expect(result).toEqual(put(actions.populateNotes(response)));
  });
  it('should put hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
describe('fetchHandler Fail Case with Empty storageData Data:', () => {
  const it = sagaHelper(fetchHandler());
  const failresponse = null;
  it('should put showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('should call delay', (result) => {
    expect(result).toEqual(call(delay, 2000));
  });
  it('should call ApiNotes Fail', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));
    return new Error('Something went wrong');
  });
  it('should call getItemToStorage after Fail', (result) => {
    expect(result).toEqual(call(getItemToStorage, 'storageNote'));
    return failresponse;
  });
  it('should put populateNotes with Empty storageData', (result) => {
    expect(result).toEqual(put(actions.populateNotes([])));
  });
  it('should put hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('addNoteHandler Success Case :', () => {
  const it = sagaHelper(addNoteHandler(actions.addNoteHandler));
  it('should put showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
});