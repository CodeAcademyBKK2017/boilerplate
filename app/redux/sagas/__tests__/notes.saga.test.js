import ApiNotes from '../../../api';
import sagaHelper from 'redux-saga-testing';
import StorageUtil from '../../../utils/StorageUtil';
import {Alert} from 'react-native';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import * as actions from './../../../redux/actions/index.actions';
import * as notesSagas from '../notes.saga';

// test case
describe('notesSaga', () => {
  const it = sagaHelper(notesSagas.default());

  it('should take function fetchNoteHandler', (result) => {
    expect(result).toEqual(takeLatest(actions.FETCH_NOTES, notesSagas.fetchNoteHandler));
  });

  it('should take function saveNoteHandler', (result) => {
    expect(result).toEqual(takeLatest(actions.SAVE_NOTE, notesSagas.saveNoteHandler));
  });

  it('should take function deleteRequestNoteHandler', (result) => {
    expect(result).toEqual(takeLatest(actions.DELETE_REQUEST_NOTE, notesSagas.deleteRequestNoteHandler));
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('fetchNoteHandler', () => {
  const it = sagaHelper(notesSagas.fetchNoteHandler());
  const response = [
    {
      id: 1,
      title: 'test title',
      content: 'test content'
    },
    {
      id: 2,
      title: 'test title',
      content: 'test content'
    }
  ];

  it('should put showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });

  it('should call loadNotes', (result) => {
    expect(result).toEqual(call(notesSagas.loadNotes));
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

describe('loadNotes success', () => {
  const it = sagaHelper(notesSagas.loadNotes());
  const response = [
    {
      id: 1,
      title: 'test title',
      content: 'test content'
    },
    {
      id: 2,
      title: 'test title',
      content: 'test content'
    }
  ];

  it('should call ApiNotes.getNotes', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));
    return response;
  });

  it('and then nothing', (result) => {
    expect(result).toEqual(response);
  });
});

describe('loadNotes failure with data', () => {
  const it = sagaHelper(notesSagas.loadNotes());
  const response = [
    {
      id: 1,
      title: 'test title',
      content: 'test content'
    },
    {
      id: 2,
      title: 'test title',
      content: 'test content'
    }
  ];

  it('should call ApiNotes.getNotes', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));
    return new Error('ApiNotes.getNotes Failure');
  });

  it('should call StorageUtil.getItem', (result) => {
    expect(result).toEqual(call(StorageUtil.getItem, notesSagas.notesKey));
    return response;
  });

  it('and then nothing', (result) => {
    expect(result).toEqual(response);
  });
});

describe('loadNotes failure with empty', () => {
  const it = sagaHelper(notesSagas.loadNotes());
  
  it('should call ApiNotes.getNotes', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));
    return new Error('ApiNotes.getNotes Failure');
  });

  it('should call StorageUtil.getItem', (result) => {
    expect(result).toEqual(call(StorageUtil.getItem, notesSagas.notesKey));
    return null;
  });

  it('and then nothing', (result) => {
    expect(result).toEqual([]);
  });
});

describe('saveNoteHandler', () => {
  const action = actions.addNote({
    title: 'test title',
    content: 'test content'
  });
  const it = sagaHelper(notesSagas.saveNoteHandler(action));

  it('should put showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });

  it('should call saveNote', (result) => {
    expect(result).toEqual(call(notesSagas.saveNote, action.payload));
  });

  it('should put hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('saveNote success', () => {
  const rawNote = {
    title: 'test title',
    content: 'test content'
  };
  const newNote = {
    id: 4,
    title: 'test title',
    content: 'test content'
  };
  const oldNotes = [{
    id: 1,
    title: 'test title',
    content: 'test content'
  },
  {
    id: 2,
    title: 'test title',
    content: 'test content'
  },
  {
    id: 3,
    title: 'test title',
    content: 'test content'
  }];
  const newNotes = [...oldNotes, newNote];
  const it = sagaHelper(notesSagas.saveNote(rawNote));

  it('should call ApiNotes.addNote', (result) => {
    expect(result).toEqual(call(ApiNotes.addNote, rawNote));
    return newNote;
  });

  it('should select getNotesStoreState', (result) => {
    expect(result).toEqual(select(notesSagas.getNotesStoreState));
    return oldNotes;
  });

  it('should call StorageUtil.setItem', (result) => {
    expect(result).toEqual(call(StorageUtil.setItem, notesSagas.notesKey, newNotes));
  });

  it('should put actions.addNote', (result) => {
    expect(result).toEqual(put(actions.addNote(newNote)));
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('saveNote failure', () => {
  const rawNote = {
    title: 'test title',
    content: 'test content'
  };
  const apiError = new Error('ApiNotes.addNote');
  const it = sagaHelper(notesSagas.saveNote(rawNote));

  it('should call ApiNotes.addNote', (result) => {
    expect(result).toEqual(call(ApiNotes.addNote, rawNote));
    return apiError;
  });

  it('should call Alert.alert', (result) => {
    expect(result).toEqual(call(
      Alert.alert, 'Save Failed',
      String(apiError),
      [
        {text: 'OK'}
      ],
      {
        cancelable: false
      }
    ));
  });
  
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
