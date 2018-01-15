import Api from '../../api';
import storageUtil from '../../utility/storage.util';
import transformerutil from '../../utility/transformer.util';
import {Alert} from 'react-native';
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';

function* fetchHandler () {
  yield put({
    type: 'SHOW_LOADER'
  });
  let response;
  try {
    response = yield call(Api.getNote);
  } catch (err) {
    response = yield call(storageUtil.getItem, 'notes');
  }
  
  yield put({
    type: 'POPULATE_NOTE',
    payload: response
  });
  yield put({
    type: 'HIDE_LOADER'
  });
}

function* saveHandler (action) {
  yield put({
    type: 'SHOW_LOADER'
  });
  try {
    const noteWithID = yield call(Api.addNote, action.payload);
    const currentNotes = yield select((store) => (store.notes));
    const newNotes = [...currentNotes, noteWithID];
    yield call(storageUtil.setItem, 'notes', newNotes);

    yield put({
      type: 'ADD_NOTE',
      payload: noteWithID
    });
  } catch (err) {
    Alert.alert(
      'Error',
      err.message,
      [
        {text: 'Ask me later'},
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK'}
      ],
      {cancelable: false}
    );
  }
  
  yield put({
    type: 'HIDE_LOADER'
  });
}

function* deleteHandler (action) {
  yield put({
    type: 'SHOW_LOADER'
  });
  
  const item = action.payload;
  try {
    yield call(Api.deleteNote, item);
    const currentNotes = yield select((store) => (store.notes));
    const filterNotes = yield call(transformerutil.deleteItem, currentNotes, item.id);
    yield call(storageUtil.setItem, 'notes', filterNotes);
    yield put({
      type: 'DELETE_NOTE',
      payload: filterNotes
    });
    
  } catch (err) {
    Alert.alert(
      'Error',
      err.message,
      [
        {text: 'Ask me later'},
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK'}
      ],
      {cancelable: false}
    );
  }
    
  yield put({
    type: 'HIDE_LOADER'
  });
}
  
export default function* notes () {
  yield takeEvery('FETCH_NOTE', fetchHandler);
  yield takeLatest('ADD_NOTE_REQUEST', saveHandler);
  yield takeLatest('DELETE_NOTE_REQUEST', deleteHandler);
}