import {delay} from 'redux-saga';
import {put, takeEvery} from 'redux-saga/effects';

function* fetchNoteHandler () {
  yield put({
    type: 'SHOW_LOADER'
  });

  yield delay(2000);

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
  
export default function* notes () {
  yield takeEvery('FETCH_NOTES', fetchNoteHandler);
}