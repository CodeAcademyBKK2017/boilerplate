
import ApiNotes from '../../../api';
import notes, {addNoteHandler, deleteNoteHandler, fetchHandler, noteSelector} from '../notes.saga';
import sagaHelper from 'redux-saga-testing';
import {Alert} from 'react-native';
import {call, put,  select, take, takeLatest} from 'redux-saga/effects';
import {delay} from  'redux-saga';
import {filterNote} from '../../../utils/transformerutil';
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
  const note = {title: 'xxx', content: 'content'};
  const noteWithId = {title: 'xxx', content: 'content', id: 1};
  const currentNote = [];
  const newNote = [noteWithId];
  const it = sagaHelper(addNoteHandler(actions.addNoteRequest(note)));
  it('should put showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('should call ApiNote.addnote', (result) => {
    expect(result).toEqual(call(ApiNotes.addNote, note));
    return noteWithId;
  });
  it('should Select Store from noteSelector', (result) => {
    expect(result).toEqual(select(noteSelector));
    return currentNote;
  });
  it('should put action addNote', (result) => {
    expect(result).toEqual(put(actions.addNote(noteWithId)));
  });
  it('should call  setItemToStorage', (result) => {
    expect(result).toEqual(call(setItemToStorage, 'storageNote', newNote));
  });
  it('should put hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
describe('addNoteHandler Fail Case :', () => {
  const note = {title: 'xxx', content: 'content'};
  const apiError = new Error('some error');
  const it = sagaHelper(addNoteHandler(actions.addNoteRequest(note)));
  it('should put showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('should call ApiNote.addnote Fail', (result) => {
    expect(result).toEqual(call(ApiNotes.addNote, note));
    return apiError; 
  });
  it('should Alert', (result) => {
    expect(result).toEqual(call(Alert.alert, 'Save Failed', 
      String(apiError),
      [
        {text: 'OK'}
      ],
      {
        cancelable: false
      }));
    
  });
  it('should put hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
describe('deleteNoteHandler Success Case :', () => {
  const item = {id: 1};
  const itemId = 1;
  const currentNote = [{id: 1}, {id: 2}];
  const remainNote = [{id: 2}];
  const it = sagaHelper(deleteNoteHandler(actions.deleteNoteRequest(item.id)));
  it('should put showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('should call ApiNotes,Delete', (result) => {
    expect(result).toEqual(call(ApiNotes.deleteNote, itemId));
  });
  it('should put Action Delete', (result) => {
    expect(result).toEqual(put(actions.deleteNote(itemId)));
  });
  it('should Select NoteSelector', (result) => {
    expect(result).toEqual(select(noteSelector));
    return currentNote;
  });
  it('should Call filterNote', (result) => {
    expect(result).toEqual(call(filterNote, currentNote, itemId));
    return remainNote;
  });
  it('should Call setItemToStorage', (result) => {
    expect(result).toEqual(call(setItemToStorage, 'storageNote', remainNote));
  });
  it('should put hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
describe('deleteNoteHandler Fail Case :', () => {
  const apiError = new Error('some error');
  const item = {id: 1};
  const itemId = 1;
  const it = sagaHelper(deleteNoteHandler(actions.deleteNoteRequest(item.id)));
  it('should put showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('should call ApiNotes Delete Fail', (result) => {
    expect(result).toEqual(call(ApiNotes.deleteNote, itemId));
    return apiError;
  });
  it('should put Action Delete', (result) => {
    expect(result).toEqual(call(Alert.alert,
      'Delete Failed',
      String(apiError),
      null,
      {
        cancelable: false
      }
    ));
  });
  it('should put hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});