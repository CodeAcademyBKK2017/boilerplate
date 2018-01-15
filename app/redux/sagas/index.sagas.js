import {delay} from 'redux-saga';
import {fork, put, takeEvery} from 'redux-saga/effects';

function* notes () {
  yield takeEvery('FETCH_NOTES', newFun);
}
function* newFun () {
  yield put({
    type: 'SHOW_LOADER'
  });
  yield delay(2000);
  yield put({
    type: 'POPULATE_NOTES',
    payload: [{title: 'from redux saga', content: 'yolo', id: 0}]
  });
  yield put({
    type: 'HIDE_LOADER'
  });
}
export default function* sagas () {
  yield fork(notes);
  console.log('index saga');
}