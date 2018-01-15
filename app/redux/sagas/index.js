import Api from '../../api';
import storageutil from '../../utils/storageutil';
import Tranformerutil from '../../utils/tranformerutil';
// import {call, fork, put, take, takeEvery} from 'redux-saga/effects';
import {Alert} from 'react-native';
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {delay} from 'redux-saga';

function* fetchHandler () {
  let note;
  yield put({
    type: 'SHOW_LOADER'
  });
  try {
    note = yield call(Api.onGetNote);
  } catch (error) {
    note = yield call(storageutil.getItem);
  }
  yield put({
    type: 'LOAD_SERVER',
    payload: note
  });
  yield put({
    type: 'HIDE_LOADER'
  });
}

function* saveHandler (action) {
  yield put({
    type: 'SHOW_LOADER'
  });
  const note = action.payload;
  let addedNote;
  const oldNote = yield select((storeState) => storeState.notes);
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
      type: 'ADD_NOTE',
      payload: newData
    });
  } catch (eroor) {
    Alert.alert(
      'Error',
      'Internet error',
      {cancelable: true}
    );
  }
  yield put({
    type: 'HIDE_LOADER'
  });
}

function* deleHandler (action) {
  yield put({
    type: 'SHOW_LOADER'
  });
  const note = action.payload;
  const oldNote = yield select((storeState) => storeState.notes);
  try {
    yield call(Api.onDelete, note.id);
    const delNote = Tranformerutil.removeNote(oldNote, note.id);
    yield call(storageutil.setItem, delNote);
    yield put({
      type: 'DELE_NOTE',
      payload: note
    });
  } catch (e) {
    Alert.alert(
      'Error',
      'Internet error',
      {cancelable: true}
    );
  }
  yield put({
    type: 'HIDE_LOADER'
  });
}
  
function* notes () {
  yield takeEvery('FATCH_NOTE', fetchHandler);
  yield takeLatest('SAVE_NOTE_SAGA', saveHandler);
  yield takeLatest('DELE_NOTE_SAGA', deleHandler);
  // console.log('note saga');
}

export default notes;