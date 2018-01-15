// import {delay} from ''
// import {call, fork, put, take, takeEvery} from 'redux-saga/effects';
import {fork, put, takeEvery} from 'redux-saga/effects';

function* fetchHandler () {
  yield put({
    type: 'SHOW_LOADER'
  });
  yield put({
    type: 'LOAD_SERVER',
    payload: [{
      title: 'title',
      content: 'sega',
      id: 1
    }]
  });
  yield put({
    type: 'HIDE_LOADER'
  });
  // console.log('SHOW_LOADER');
}
  
function* notes () {
  yield takeEvery('FATCH_NOTE', fetchHandler);
  // console.log('note saga');
}
  
function* sagas () {
  yield fork(notes);
  // console.log('index saga');
}