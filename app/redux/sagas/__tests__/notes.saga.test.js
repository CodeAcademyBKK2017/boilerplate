// import indexSagas from '../index.saga';
import ApiNotes from '../../../api';
import sagaHelper from 'redux-saga-testing';
import Storage from '../../../utility/storage.util';
import transformerutil from '../../../utility/transformerutil';
import {
  Alert
} from 'react-native';
import {call, fork, put, select, takeEvery} from 'redux-saga/effects';
import * as actions from '../../actions/index.actions';
import * as notesSaga from '../notes.saga';

describe('notes saga: should fork all the notes', () => {
  const it = sagaHelper(notesSaga.default());
  it('case notes() FETCH_NOTES', (result) => {
    expect(result).toEqual(takeEvery(actions.FETCH_NOTES, notesSaga.fetchHandler));
  });
  it('case notes() ADD_NOTE_REQUEST', (result) => {
    expect(result).toEqual(takeEvery(actions.ADD_NOTE_REQUEST, notesSaga.saveHandler));
  });
  it('case notes() REMOVE_NOTE_REQUEST', (result) => {
    expect(result).toEqual(takeEvery(actions.REMOVE_NOTE_REQUEST, notesSaga.removeHandler));
  });
});

describe('notes saga: fetchHandler', () => {
  const it = sagaHelper(notesSaga.fetchHandler());
  it('case showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('case ApiNotes.getNotes', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));
    return ['1'];
  });
  it('case populateNotes', (result) => {
    expect(result).toEqual(put(actions.populateNotes(['1'])));
  });
  it('case hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
});
describe('notes saga: fetchHandler fail', () => {
  const it = sagaHelper(notesSaga.fetchHandler());
  it('case showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('case ApiNotes.getNotes', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));
    return new Error('Something error');
  });
  it('case getItemsFromAsyncStorage', (result) => {
    expect(result).toEqual(call(Storage.getItemsFromAsyncStorage, 'notes'));
    return ['2'];
  });
  it('case populateNotes', (result) => {
    expect(result).toEqual(put(actions.populateNotes(['2'])));
  });
  it('case hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
});

describe('notes saga: saveHandler', () => {
  const action = {
    type: actions.ADD_NOTE_REQUEST,
    payload: {
      id: '123',
      title: 't1',
      content: 'c1'
    }
  };
  const newNotes = {
    id: '123',
    title: 't1',
    content: 'c1'
  };
  const it = sagaHelper(notesSaga.saveHandler(action));
  it('case showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('case addNote', (result) => {
    expect(result).toEqual(call(ApiNotes.addNote, action.payload));
  });
  it('case select', (result) => {
    expect(result).toEqual(select(notesSaga.selectFN));
    return [];
  });
  it('case setItemsFromAsyncStorage', (result) => {
    expect(result).toEqual(call(Storage.setItemsFromAsyncStorage, 'notes', JSON.stringify([newNotes])));
  });
  it('case populateNotes', (result) => {
    expect(result).toEqual(put(actions.populateNotes([newNotes])));
  });
  it('case hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
});

describe('notes saga: saveHandler fail', () => {
  const action = {
    type: actions.ADD_NOTE_REQUEST,
    payload: {
      id: '123',
      title: 't1',
      content: 'c1'
    }
  };
  const newNotes = {
    id: '123',
    title: 't1',
    content: 'c1'
  };
  const it = sagaHelper(notesSaga.saveHandler(action));
  it('case showLoader', (result) => {
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
  it('case hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
});

describe('notes saga: removeHandler', () => {
  const action = {
    type: actions.REMOVE_NOTE_REQUEST,
    payload: {
      id: '123',
      title: 't1',
      content: 'c1'
    }
  };
  const it = sagaHelper(notesSaga.removeHandler(action));
  it('case showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('case ApiNotes.deleteNote', (result) => {
    expect(result).toEqual(call(ApiNotes.deleteNote, action.payload.id));
  });
  it('case select', (result) => {
    expect(result).toEqual(select(notesSaga.selectFN));
    return [];
  });
  it('case filteredNotes', (result) => {
    expect(result).toEqual(call(transformerutil.deleteNote, [], action.payload.id));
    return [];
  });
  it('case setItemsFromAsyncStorage', (result) => {
    expect(result).toEqual(call(Storage.setItemsFromAsyncStorage, 'notes', JSON.stringify([])));
  });
  it('case populateNotes', (result) => {
    expect(result).toEqual(put(actions.populateNotes([])));
  });
  it('case hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
});

describe('notes saga: removeHandler fail', () => {
  const action = {
    type: actions.REMOVE_NOTE_REQUEST,
    payload: {
      id: '123',
      title: 't1',
      content: 'c1'
    }
  };
  const it = sagaHelper(notesSaga.removeHandler(action));
  it('case showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('case ApiNotes.deleteNote', (result) => {
    expect(result).toEqual(call(ApiNotes.deleteNote, action.payload.id));
    return new Error('Something went wrong');
  });
  it('show Alert', (result) => {
    const error = new Error('Something went wrong');
    expect(result).toEqual(call(Alert.alert,
      'Delete Failed',
      String(error),
      [
        {text: 'OK'}
      ],
      {
        cancelable: false
      }
    ));
  });
  it('case hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
});

describe('notes saga: selectFN', () => {
  const store = {
    notes: []
  };
  const result = notesSaga.selectFN(store);
  expect(result).toEqual([]);
});