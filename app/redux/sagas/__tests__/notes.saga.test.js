import ApiNotes from '../../../api';
import sagaHelper from 'redux-saga-testing';
import StorageUtil from '../../../utils/StorageUtil';
import TransformerUtil from '../../../utils/TransformerUtil';
import {Alert} from 'react-native';
import {call, put, select} from 'redux-saga/effects';
import * as actions from '../../actions/index.actions';
import * as notesSaga from '../notes.saga';

describe('notes: fetchNotesHandler [success]', () => {
  const it = sagaHelper(notesSaga.fetchNotesHandler());
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('get notes from api success', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));
    return ['1'];
  });
  it('populateNotes', (result) => {
    expect(result).toEqual(put(actions.populateNotes(['1'])));
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('notes: fetchNotesHandler [fail]', () => {
  const it = sagaHelper(notesSaga.fetchNotesHandler());
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('get notes from api fail', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));
    return new Error('Something went wrong');
  });
  it('get notes from storage', (result) => {
    expect(result).toEqual(call(StorageUtil.getItem, 'notes'));
    return ['3'];
  });
  it('populateNotes', (result) => {
    expect(result).toEqual(put(actions.populateNotes(['3'])));
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('notes: addNoteRequestHandler [success]', () => {
  const action = {
    type: actions.ADD_NOTE_REQUEST,
    payload: {
      title: 'someTitle',
      content: 'someContent'
    }
  };
  const newNote = {id: 1, title: 'assumeTitle', content: 'assumeContent'};
  const it = sagaHelper(notesSaga.addNoteRequestHandler(action));
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('add note by api', (result) => {
    expect(result).toEqual(call(ApiNotes.addNote, action.payload));
    return newNote;
  });
  it('select current notes from store', (result) => {
    expect(result).toEqual(select(notesSaga.selectFilters));
    return [];
  });
  it('add note to storage', (result) => {
    expect(result).toEqual(call(StorageUtil.setItem, 'notes', [newNote]));
  });
  it('populateNotes', (result) => {
    expect(result).toEqual(put(actions.populateNotes([newNote])));
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('notes: addNoteRequestHandler [fail]', () => {
  const action = {
    type: actions.ADD_NOTE_REQUEST,
    payload: {
      title: 'someTitle',
      content: 'someContent'
    }
  };
  const it = sagaHelper(notesSaga.addNoteRequestHandler(action));
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('add note by api fail', (result) => {
    expect(result).toEqual(call(ApiNotes.addNote, action.payload));
    return new Error('Something went wrong');
  });
  it('show Alert', (result) => {
    const error = new Error('Something went wrong');
    expect(result).toEqual(call(Alert.alert,
      'Save Failed',
      String(error),
      [
        {text: 'OK'}
      ],
      {
        cancelable: false
      }
    ));
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('notes: deleteNoteRequestHandler [success]', () => {
  const action = {
    type: actions.DELETE_NOTE_REQUEST,
    payload: 1
  };
  const deletedNote = {id: 1, title: 'assumeTitle', content: 'assumeContent'};
  const it = sagaHelper(notesSaga.deleteNoteRequestHandler(action));
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('delete note by api', (result) => {
    expect(result).toEqual(call(ApiNotes.deleteNote, action.payload));
  });
  it('select current notes from store', (result) => {
    expect(result).toEqual(select(notesSaga.selectFilters));
    return [deletedNote];
  });
  it('remaining notes filter deletedNote out', (result) => {
    expect(result).toEqual(call(TransformerUtil.removeNote, [deletedNote], 1));
    return [];
  });
  it('add note to storage', (result) => {
    expect(result).toEqual(call(StorageUtil.setItem, 'notes', []));
  });
  it('populateNotes', (result) => {
    expect(result).toEqual(put(actions.populateNotes([])));
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('notes: deleteNoteRequestHandler [fail]', () => {
  const action = {
    type: actions.DELETE_NOTE_REQUEST,
    payload: 1
  };
  const it = sagaHelper(notesSaga.deleteNoteRequestHandler(action));
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('delete note by api fail', (result) => {
    expect(result).toEqual(call(ApiNotes.deleteNote, action.payload));
    return new Error('Something went wrong');
  });
  it('show Alert', (result) => {
    const error = new Error('Something went wrong');
    expect(result).toEqual(call(Alert.alert,
      'Delete Failed',
      String(error),
      null,
      {
        cancelable: false
      }
    ));
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});