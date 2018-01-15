import {delay} from 'redux-saga';
import {fork, put, take} from 'redux-saga/effects';

function* fetchNotesHandler () {
  yield put({
    type: 'SHOW_LOADER'
  });

  yield put({
    type: 'POPULATE_NOTES',
    payload: [{id: 0, title: '0', content: '0'}]
  });
  yield delay(2000);
  yield put({
    type: 'HIDE_LOADER'
  });
}

function* notes () {
  yield take('FETCH_NOTES');
  yield fetchNotesHandler();
}

function* index () {
  yield fork(notes);
}

export default index;