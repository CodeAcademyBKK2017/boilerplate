// import notes, {addDataWithSaga, deleteDataWithSaga, getData, newFun} from '../notes.saga';
import ApiNotes from '../../../api';
import sagaHelper from 'redux-saga-testing';
import Util from '../../../util/utility';
import {ADD_NOTE, ADD_NOTE_REQUEST, DELETE_DATA_REQUEST, DELETE_NOTE, FEACH_NOTE, HIDE_LOADER, POPULATE_NOTE, SHOW_LOADER} from '../../actions/index.action';
import {Alert} from 'react-native';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import * as notes from '../notes.saga';

jest.mock('Alert', () => ({
  alert: jest.fn()
}));

describe('notes saga: should be work in every case', () => {
  const it = sagaHelper(notes.default());

  it('notes func be takeEvery a newFun func', (result) => {
    expect(result).toEqual(takeEvery(FEACH_NOTE, notes.newFun));
  });

  it('notes func be takeEvery a addDataWithSaga func', (result) => {
    expect(result).toEqual(takeEvery(ADD_NOTE_REQUEST, notes.addDataWithSaga));
  });

  it('notes func be takeEvery a deleteDataWithSaga func', (result) => {
    expect(result).toEqual(takeEvery(DELETE_DATA_REQUEST, notes.deleteDataWithSaga));
  });

  it('And then nothing happen', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('newFun: should be work in every case', () => {
  const it = sagaHelper(notes.newFun());

  it('newFun should be put SHOW_LOADER', (result) => {
    expect(result).toEqual(put({type: SHOW_LOADER}));
  });

  it('newFun should be call getData', (result) => {
    expect(result).toEqual(call(notes.getData));
  });

  it('newFun should be call put POPULATE_NOTE', (result) => {
    expect(result).toEqual(put({type: POPULATE_NOTE}));
  });

  it('newFun should be call put HIDE_LOADER', (result) => {
    expect(result).toEqual(put({type: HIDE_LOADER}));
  });

  it('And then nothing happen', (result) => {
    expect(result).toBeUndefined();
  });
});
describe('addDataWithSaga: should be work in every case', () => {
  const it = sagaHelper(notes.addDataWithSaga());

  it('addDataWithSaga should be put SHOW_LOADER', (result) => {
    expect(result).toEqual(put({type: SHOW_LOADER}));
  });

  it('addDataWithSaga should be call addNotes', (result) => {
    expect(result).toEqual(call(notes.addNotes, undefined));
  });

  it('addDataWithSaga should be put HIDE_LOADER', (result) => {
    expect(result).toEqual(put({type: HIDE_LOADER}));
  });

  it('And then nothing happen', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('deleteDataWithSaga: should be work in every case', () => {
  const it = sagaHelper(notes.deleteDataWithSaga());

  it('deleteDataWithSaga should be put SHOW_LOADER', (result) => {
    expect(result).toEqual(put({type: SHOW_LOADER}));
  });

  it('deleteDataWithSaga should be call deleteNotes', (result) => {
    expect(result).toEqual(call(notes.deleteNotes, undefined));
  });

  it('deleteDataWithSaga should be put HIDE_LOADER', (result) => {
    expect(result).toEqual(put({type: HIDE_LOADER}));
  });

  it('And then nothing happen', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('getData: should be work in success case', () => {
  const it = sagaHelper(notes.getData());

  it('getData should be put call getNotes', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));
  });

  it('getData should be call setItemToStroage', (result) => {
    expect(result).toEqual(call(Util.setItemToStroage, 'theState', undefined));

    return null;
  });

  it('And then nothing happen', (result) => {
    expect(result).toBeUndefined();
  });

});

describe('getData: should be work in fail case', () => {
  const it = sagaHelper(notes.getData());
  
  it('getData should be put SHOW_LOADER', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));

    return new Error('GO Catch');
  });
  
  it('getData should be return  getItemToStroage', (result) => {
    expect(result).toEqual(call(Util.getItemToStroage, 'theState'));
  });
  
  it('And then nothing happen', (result) => {
    expect(result).toBeUndefined();
  });
  
});

describe('deleteNotes: should be work in success case', () => {
  const noteID = {payload: 1};
  const it = sagaHelper(notes.deleteNotes(noteID));

  it('deleteNotes should be call deleteNote', (result) => {
    expect(result).toEqual(call(ApiNotes.deleteNote, noteID.payload));
  });
  
  it('deleteNotes should be call deleteNotes', (result) => {
    expect(result).toEqual(put({
      type: DELETE_NOTE,
      payload: noteID.payload
    }));
  });

  it('deleteNotes should be return  getItemToStroage', (result) => {
    expect(result).toEqual(call(Util.setItemToStroage, 'theState', noteID.payload));
  });
  
  it('And then nothing happen', (result) => {
    expect(result).toBeUndefined();
  });
    
});

describe('deleteNotes: should be work in fail case', () => {
  const noteID = {payload: 1};
  const it = sagaHelper(notes.deleteNotes(noteID));
  
  it('deleteNotes should be call deleteNote', (result) => {
    expect(result).toEqual(call(ApiNotes.deleteNote, noteID.payload));

    return new Error('Hi error');
  });
    
  it('deleteNotes should be call Alert', () => {
    expect(Alert.alert).toHaveBeenCalled();
  });
    
  it('And then nothing happen', (result) => {
    expect(result).toBeUndefined();
  });
      
});

describe('addNotes: should be work in success case', () => {
  const note = {payload: {title: 'hi', content: 'hello', id: 1}};
  const it = sagaHelper(notes.addNotes(note));
  it('addNotes should be call addNote', (result) => {
    expect(result).toEqual(call(ApiNotes.addNote, note.payload));

    return note.payload;
  });
    
  it('addNotes should be put ADD_NOTE', (result) => {
    expect(result).toEqual(put({
      type: ADD_NOTE,
      payload: note.payload
    }));
  });
  
  it('addNotes should be return  getItemToStroage', (result) => {
    expect(result).toEqual(select(Util.getStore));
    return note.payload;
  });

  it('deleteNotes should be return  getItemToStroage', (result) => {
    expect(result).toEqual(call(Util.setItemToStroage, 'theState', note.payload));
  });
    
  it('And then nothing happen', (result) => {
    expect(result).toBeUndefined();
  });
      
});

describe('addNotes: should be work in fail case', () => {
  const note = {payload: {title: 'hi', content: 'hello', id: 1}};
  const it = sagaHelper(notes.addNotes(note));
    
  it('addNotes should be call addNote', (result) => {
    expect(result).toEqual(call(ApiNotes.addNote, note.payload));
  
    return new Error('Hi error');
  });
      
  it('deleteNotes should be call Alert', () => {
    expect(Alert.alert).toHaveBeenCalled();
  });
    
  it('And then nothing happen', (result) => {
    expect(result).toBeUndefined();
  });
        
});