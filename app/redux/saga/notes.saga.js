import ApiNotes from '../../api';
import Util from '../../util/utility';
import {ADD_NOTE, ADD_NOTE_REQUEST, DELETE_DATA_REQUEST, DELETE_NOTE, FEACH_NOTE, HIDE_LOADER, POPULATE_NOTE, SHOW_LOADER} from '../actions/index.action';
import {Alert} from 'react-native';
import {call, put, select, takeEvery} from 'redux-saga/effects';

export function* getData () { 
  try {
    const data = yield call(ApiNotes.getNotes);
    yield call(Util.setItemToStroage, 'theState', data);
    return data;
  } catch (e) {
    return yield call(Util.getItemToStroage, 'theState');
  } 
}

export function* deleteDataWithSaga (action) {
  yield put({
    type: SHOW_LOADER
  });

  yield call(deleteNotes, action);

  yield put({
    type: HIDE_LOADER
  });
}

export function* deleteNotes (action) {
  try {
    yield call(ApiNotes.deleteNote, action.payload);
    yield put({
      type: DELETE_NOTE,
      payload: action.payload
    });
    yield call(Util.setItemToStroage, 'theState', action.payload);
  } catch (e) {
    Alert.alert(
      'Delete Failed',
      String(e),
      null,
      {
        cancelable: false
      }
    );
  }
}

export function* addNotes (action) {
  try {
    const noteWithID = yield call(ApiNotes.addNote, action.payload);
    yield put({
      type: ADD_NOTE,
      payload: noteWithID
    });
    const currentNote = yield select(Util.getStore);
    yield call(Util.setItemToStroage, 'theState', currentNote);
  } catch (e) {
    Alert.alert(
      'Save Failed',
      String(e),
      [
        {text: 'OK'}
      ],
      {
        cancelable: false
      }
    );
  }
}

export function * addDataWithSaga (action) {
  yield put({
    type: SHOW_LOADER
  });

  yield call(addNotes, action);

  yield put({
    type: HIDE_LOADER
  });
}
  
export function* newFun () {
    
  yield put({
    type: SHOW_LOADER
  });

  const response =  yield call(getData);

  yield put({
    type: POPULATE_NOTE,
    payload: response
  });
  yield put({
    type: HIDE_LOADER
  });
}
  
export default function* notes () {
  yield takeEvery(FEACH_NOTE, newFun);
  yield takeEvery(ADD_NOTE_REQUEST, addDataWithSaga);
  yield takeEvery(DELETE_DATA_REQUEST, deleteDataWithSaga);
}