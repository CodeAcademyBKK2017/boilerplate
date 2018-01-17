import Api from '../../../api';
import sagaHelper from 'redux-saga-testing';
import storageutil from '../../../utils/storageutil';
import Tranformerutil from '../../../utils/tranformerutil';
import {Alert} from 'react-native';
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import * as action from '../../reducers/actions/index.actions';
import * as notes from '../note.saga';

describe('note saga', () => {
  const it = sagaHelper(notes.default());
  it('FATCH_NOTE', (result) => {
    expect(result).toEqual(takeEvery(action.FATCH_NOTE, notes.fetchHandler));
  });

  it('SAVE_NOTE_SAGA', (result) => {
    expect(result).toEqual(takeLatest(action.SAVE_NOTE_SAGA, notes.saveHandler));
  });

  it('DELE_NOTE_SAGA', (result) => {
    expect(result).toEqual(takeLatest(action.DELE_NOTE_SAGA, notes.deleHandler));
  });

  it('THEN_UNDEFIEND', (result) => {
    expect(result).toBeUndefined();
  });
}); 

describe('FATCH_NOTE_FUNC_ACC', () => {
  const it = sagaHelper(notes.fetchHandler());
  const dataAPI = [{title: 'some title', content: 'some content'}];
  it('SHOW_LOADER', (result) => {
    expect(result).toEqual(put(action.showLoader()));
  });
  it('GET_DATA_API', (result) => {
    expect(result).toEqual(call(Api.onGetNote));
    return dataAPI;
  });
  it('LOAD_SERVER', (result) => {
    expect(result).toEqual(put({
      type: action.LOAD_SERVER,
      payload: dataAPI
    }));
  });
  it('HIDE_LOADER', (result) => {
    expect(result).toEqual(put(action.hideLoader()));
  });
});

describe('FATCH_NOTE_FUNC_DEC', () => {
  const it = sagaHelper(notes.fetchHandler());
  const dataAPI = [{title: 'some title', content: 'some content'}];
  it('SHOW_LOADER', (result) => {
    expect(result).toEqual(put(action.showLoader()));
  });
  it('GET_DATA_API', (result) => {
    expect(result).toEqual(call(Api.onGetNote));
    return new Error('API Fail');
  });
  it('GET_DATA_AS', (result) => {
    expect(result).toEqual(call(storageutil.getItem));
    return dataAPI;
  });
  it('LOAD_SERVER', (result) => {
    expect(result).toEqual(put({
      type: action.LOAD_SERVER,
      payload: dataAPI
    }));
  });
  it('HIDE_LOADER', (result) => {
    expect(result).toEqual(put(action.hideLoader()));
  });
});

describe('FATCH_SAVE_HANDLER_ACC', () => {
  const act = action.addNote({
    title: 'some tiele',
    content: 'some content'
  });
  const newData = {
    title: 'some title',
    content: 'some content',
    id: 1
  };
  const it = sagaHelper(notes.saveHandler(act));
  it('SHOW_LOADER', (result) => {
    expect(result).toEqual(put(action.showLoader()));
  });
  it('SELECT_NOTE', (result) => {
    expect(result).toEqual(select(notes.forSelect));
    return [newData];
  });
  it('ADD_NOTE_API', (result) => {
    expect(result).toEqual(call(Api.onAddNote, act.payload));
    return newData;
  });
  it('ADD_NOTE_AC', (result) => {
    expect(result).toEqual(call(storageutil.setItem, newData));
    return newData;
  });
  it('ADD_NOTE', (result) => {
    expect(result).toEqual(put({
      type: action.ADD_NOTE,
      payload: newData}));
  });
  it('HIDE_LOADER', (result) => {
    expect(result).toEqual(put(action.hideLoader()));
  });
});

describe('FATCH_SAVE_HANDLER_DEC', () => {
  const act = action.addNote({
    title: 'some tiele',
    content: 'some content'
  });
  const it = sagaHelper(notes.saveHandler(act));
  it('SHOW_LOADER', (result) => {
    expect(result).toEqual(put(action.showLoader()));
  });
  it('SELECT_NOTE', (result) => {
    expect(result).toEqual(select(notes.forSelect));
    return [{id: 1, title: 'title', content: 'content'}];
  });
  it('ADD_NOTE_API', (result) => {
    expect(result).toEqual(call(Api.onAddNote, act.payload));
    return new Error('API Fail');
  });
  it('ALERT', (result) => {
    expect(result).toEqual(call(Alert.alert, 'Error',
      'Internet error', null,
      {cancelable: true})
    );
  });
  it('HIDE_LOADER', (result) => {
    expect(result).toEqual(put(action.hideLoader()));
  });
});

describe('FATCH_DELE_HANDLER_ACC', () => {
  const act = action.deleNote({
    id: 1,
    title: 'some tiele',
    content: 'some content'
  });
  const it = sagaHelper(notes.deleHandler(act));
  const noteData = {id: 1, title: 'title', content: 'content'};
  it('SHOW_LOADER', (result) => {
    expect(result).toEqual(put(action.showLoader()));
  });
  it('SELECT_NOTE', (result) => {
    expect(result).toEqual(select(notes.forSelect));
    return [noteData];
  });
  it('DELE_NOTE_API', (result) => {
    expect(result).toEqual(call(Api.onDelete, act.payload.id));
    return [];
  });
  it('DELE_NOTE_AC', (result) => {
    expect(result).toEqual(call(storageutil.setItem, Tranformerutil.removeNote([], act.payload.id.id)));
    return noteData;
  });
  it('HIDE_LOADER', (result) => {
    expect(result).toEqual(put({
      type: action.DELE_NOTE,
      payload: act.payload}));
  });
  it('HIDE_LOADER', (result) => {
    expect(result).toEqual(put(action.hideLoader()));
  });
});

describe('FATCH_DELE_HANDLER_DEC', () => {
  const act = action.deleNote({
    id: 1,
    title: 'some tiele',
    content: 'some content'
  });
  const note = {
    id: 1, title: 'title', content: 'content'
  };
  const it = sagaHelper(notes.deleHandler(act));
  it('SHOW_LOADER', (result) => {
    expect(result).toEqual(put(action.showLoader()));
  });
  it('SELECT_NOTE', (result) => {
    expect(result).toEqual(select(notes.forSelect));
    return [note];
  });
  it('DELE_NOTE_API', (result) => {
    expect(result).toEqual(call(Api.onDelete, act.payload.id));
    return new Error('API Fail');
  });
  it('ALERT', (result) => {
    expect(result).toEqual(call(Alert.alert, 'Error',
      'Internet error', null,
      {cancelable: true})
    );
  });
  it('HIDE_LOADER', (result) => {
    expect(result).toEqual(put(action.hideLoader()));
  });
});

describe('', () => {
  it('', () => {
    const result = notes.forSelect({notes: 'notes'});
    expect(result).toBe('notes');
  });
});