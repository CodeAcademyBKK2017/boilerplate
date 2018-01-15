import {delay} from 'redux-saga';
import {fork, put,  take, takeEvery, takeLatest} from 'redux-saga/effects';

function* fetchHandler () {
  yield put({
    type: 'SHOW_LOADER'
  });
  yield delay(2000);
  yield put({
    type: 'POPULATE_NOTES',
    payload: [{title: 'from redux saga', content: 'xxxxxxxxxxx', id: 0}]
  });
  yield put({
    type: 'HIDE_LOADER'
  });
}
function* notes () {
//   yield takeEvery('FETCH_NOTES', fetchHandler);
// console.log('This is call from FETCH_NOTES');
//   yield take('FETCH_NOTES');
//   yield fetchHandler();

  yield takeLatest('FETCH_NOTES', fetchHandler);
}
export default function* sagas () {
  yield fork(notes);
  // console.log('index saga');
}