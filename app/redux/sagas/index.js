import {delay} from 'redux-saga';
import {put, takeEvery, takeLatest} from 'redux-saga/effects';

function* fetchNoteHandler () {
  yield put({
    type: 'SHOW_LOADER'
  });
  
  yield delay(3000);

  yield put({
    type: 'POPULATE_NOTES',
    payload: [{
      id: 0,
      title: 'title from sage',
      content: 'content from sage'
    }]
  });

  yield put({
    type: 'HIDE_LOADER'
  });
}

function* notesSaga () {
  yield takeLatest('FETCH_NOTES', fetchNoteHandler);
}

export default notesSaga;