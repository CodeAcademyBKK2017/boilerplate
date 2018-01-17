import Api from '../../api';
import storageutil from '../../utils/storageutil';
import Tranformerutil from '../../utils/tranformerutil';
// import {call, fork, put, take, takeEvery} from 'redux-saga/effects';
import {Alert} from 'react-native';
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import * as action from '../reducers/actions/index.actions';
// import {delay} from 'redux-saga';

export function* fetchHandler () {
  let note;
  yield put({
    type: action.SHOW_LOADER
  });
  try {
    note = yield call(Api.onGetNote);
  } catch (error) {
    note = yield call(storageutil.getItem);
  }
  yield put({
    type: action.LOAD_SERVER,
    payload: note
  });
  yield put({
    type: action.HIDE_LOADER
  });
}

export const forSelect = (storeState) => storeState.notes;

export function* saveHandler (act) {
  yield put({
    type: action.SHOW_LOADER
  });
  const note = act.payload;
  let addedNote;
  const oldNote = yield select(forSelect);

  const newNotes = [...oldNote];
  try {
    addedNote =  yield call(Api.onAddNote, note);
    const newData = {
      title: addedNote.title,
      content: addedNote.content,
      id: addedNote.id
    };
    newNotes.push(newData);
    yield call(storageutil.setItem, newData);
    yield put({
      type: action.ADD_NOTE,
      payload: newData
    });
  } catch (eroor) {
    yield call(Alert.alert, 'Error',
      'Internet error', null,
      {cancelable: true}
    );
  }
  yield put({
    type: action.HIDE_LOADER
  });
}

export function* deleHandler (act) {
  yield put({
    type: action.SHOW_LOADER
  });
  const note = act.payload;
  const oldNote = yield select(forSelect);
  try {
    yield call(Api.onDelete, note.id);
    const delNote = Tranformerutil.removeNote(oldNote, note.id);
    yield call(storageutil.setItem, delNote);
    yield put({
      type: action.DELE_NOTE,
      payload: note
    });
  } catch (e) {
    yield call(Alert.alert, 'Error',
      'Internet error', null,
      {cancelable: true}
    );
  }
  yield put({
    type: action.HIDE_LOADER
  });
}
  
function* notes () {
  yield takeEvery(action.FATCH_NOTE, fetchHandler);
  yield takeLatest(action.SAVE_NOTE_SAGA, saveHandler);
  yield takeLatest(action.DELE_NOTE_SAGA, deleHandler);
  // console.log('note saga');
}

export default notes;