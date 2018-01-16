import Api from '../../api';
import storageUtil from '../../utility/storage.util';
import transformerutil from '../../utility/transformer.util';
import {Alert} from 'react-native';
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions/index.action';

export function* fetchHandler () {
  yield put(actions.showLoader());
  let response;
  try {
    response = yield call(Api.getNotes);
  } catch (err) {
    response = yield call(storageUtil.getItemFromAsyncStorage, 'state');
  }
  yield put(actions.populateNotes(response));
  yield put(actions.hideLoader());
}

export function* saveHandler (action) {
  yield put(actions.showLoader());
  try {
    const noteWithID = yield call(Api.addNotes, action.payload);
    const currentNotes = yield select(getStore);
    const newNotes = [...currentNotes, noteWithID];
    yield put(actions.addNotes(noteWithID));
    yield call(storageUtil.setItemFromAsyncStorage, 'state', newNotes);
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
  yield put(actions.hideLoader());
}

export const getStore = (store) => (store.notes);

export function* deleteHandler (action) {
  yield put(actions.showLoader());
  const item = action.payload;
  try {
    yield call(Api.deleteNotes, item);
    const currentNotes = yield select(getStore);
    const filterNotes = yield call(transformerutil.deleteItem, currentNotes, item.id);
    yield put(actions.deleteNotes(filterNotes));
    yield call(storageUtil.setItemFromAsyncStorage, 'state', filterNotes);
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
  yield put(actions.hideLoader());
}
 
export default function* notes () {
  yield takeEvery('FETCH_NOTE', fetchHandler);
  yield takeLatest('ADD_NOTE_REQUEST', saveHandler);
  yield takeLatest('DELETE_NOTE_REQUEST', deleteHandler);
}