import API from '../../../api';
import notes, {addNoteHandler, deleteNoteHandler, fetchNoteHandler} from '../notes.sagas';
import sagaHelper from 'redux-saga-testing';
import SnackBar from 'react-native-snackbar';
import StorageUtil from '../../../utils/storage.util';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {selectNotes} from '../../../utils/selector.util';
import * as actions from '../../../redux/actions/index.actions';

const warningBar = () => ({
  title: 'Network errors: Can\'t connect to server.',
  duration: 3000,
  backgroundColor: '#d9bf56'
});
  
describe('notes saga : should take all action', () => {
  const it = sagaHelper(notes());
  it('should be take every fetch notes', (result) => {
    expect(result).toEqual(takeEvery(actions.FETCH_NOTES, fetchNoteHandler));
  });

  it('should be take every add note', (result) => {
    expect(result).toEqual(takeEvery(actions.ADD_NOTE_REQUEST, addNoteHandler));
  });

  it('should be take every delete note', (result) => {
    expect(result).toEqual(takeEvery(actions.DELETE_NOTE_REQUEST, deleteNoteHandler));
  });

  it('should be end', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('fetch notes success', () => {
  const it = sagaHelper(fetchNoteHandler());
  const notes = [{id: 1, title: 'title', content: 'content'}];

  it('Should show loader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });

  it('Making api call', (result) => {
    expect(result).toEqual(call(API.getNotes));
    return notes;
  });

  it('Populate notes', (result) => {
    expect(result).toEqual(put(actions.populateNotes(notes)));
  });

  it('Should hide loader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });

  it('should be end', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('fetch notes fail', () => {
  const it = sagaHelper(fetchNoteHandler());
  const notes = [{id: 1, title: 'title', content: 'content'}];
  
  it('Should show loader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  
  it('Making api call', (result) => {
    expect(result).toEqual(call(API.getNotes));
    return new Error('Something went wrong');
  });
  
  it('Get notes from AsyncStorage', (result) => {
    expect(result).toEqual(call(StorageUtil.getItem, 'notes'));

    return [{id: 1, title: 'title', content: 'content'}];
  });

  it('Show warning message', (result) => {
    expect(result).toEqual(call(SnackBar.show, warningBar()));
  });

  it('Populate notes', (result) => {
    expect(result).toEqual(put(actions.populateNotes(notes)));
  });
  
  it('Should hide loader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });

  it('should be end', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('fetch notes fail 2 (Can not get data from async storage)', () => {
  const it = sagaHelper(fetchNoteHandler());
    
  it('Should show loader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
    
  it('Making api call', (result) => {
    expect(result).toEqual(call(API.getNotes));
    return new Error('Something went wrong');
  });
    
  it('Get notes from AsyncStorage', (result) => {
    expect(result).toEqual(call(StorageUtil.getItem, 'notes'));
    return null;
  });
  
  it('Show warning message', (result) => {
    expect(result).toEqual(call(SnackBar.show, warningBar()));
  });
  
  it('Populate notes', (result) => {
    expect(result).toEqual(put(actions.populateNotes([])));
  });
    
  it('Should hide loader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  
  it('should be end', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('add notes success', () => {
  const notes = [{id: 1, title: 'title', content: 'content'}];
  const note = {id: 2, title: 'title', content: 'content'};
  const it = sagaHelper(addNoteHandler(actions.addNote(note)));
  
  it('Should show loader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  
  it('Making api call add note', (result) => {
    expect(result).toEqual(call(API.addNote, note));
    return note;
  });

  it('Get notes from store', (result) => {
    expect(result).toEqual(select(selectNotes));
    return notes;
  });

  it('Set notes to storage', (result) => {
    expect(result).toEqual(call(StorageUtil.setItem, 'notes', [...notes, note]));
  });  
  
  it('Add new note to store', (result) => {
    expect(result).toEqual(put(actions.addNote(note)));
  });
  
  it('Should hide loader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });

  it('should be end', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('add notes fail', () => {
  const note = {id: 2, title: 'title', content: 'content'};
  const it = sagaHelper(addNoteHandler(actions.addNote(note)));
    
  it('Should show loader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
    
  it('Making api call add note', (result) => {
    expect(result).toEqual(call(API.addNote, note));
    return new Error('Something went wrong');
  });

  it('Show warning message', (result) => {
    expect(result).toEqual(call(SnackBar.show, warningBar()));
  });
  
  it('Should hide loader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });

  it('should be end', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('delete notes success', () => {
  const notes = [{id: 1, title: 'title', content: 'content'}];
  const note = {id: 2, title: 'title', content: 'content'};
  const it = sagaHelper(deleteNoteHandler(actions.deleteNote(note)));
    
  it('Should show loader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
    
  it('Making api call delete note', (result) => {
    expect(result).toEqual(call(API.deleteNote, note.id));
    return note;
  });
  
  it('Get notes from store', (result) => {
    expect(result).toEqual(select(selectNotes));
    return notes;
  });
  
  it('Remove note from AsyncStorage', (result) => {
    expect(result).toEqual(call(StorageUtil.setItem, 'notes', notes));
  });  

  it('Remove new note to store state', (result) => {
    expect(result).toEqual(put(actions.deleteNote(note)));
  });
    
  it('Should hide loader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });

  it('should be end', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('delete notes success', () => {
  const note = {id: 2, title: 'title', content: 'content'};
  const it = sagaHelper(deleteNoteHandler(actions.deleteNote(note)));
      
  it('Should show loader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
      
  it('Making api call delete note', (result) => {
    expect(result).toEqual(call(API.deleteNote, note.id));
    return new Error('Something went wrong');
  });
  
  it('Show warning message', (result) => {
    expect(result).toEqual(call(SnackBar.show, warningBar()));
  });
      
  it('Should hide loader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  
  it('should be end', (result) => {
    expect(result).toBeUndefined();
  });
});