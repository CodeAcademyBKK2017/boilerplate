import {fork, put, takeEvery} from 'redux-saga/effects';

function* fetchHandler () {
  yield put({
    type: 'SHOW_LOADER'
  });
  yield put({
    type: 'POPULATE_NOTES',
    payload: [{
      title: 'React Native',
      content: '- UI',
      key: 0,
      id: 1
    }]
  }),
  yield put({
    type: 'HIDE_LOADER'
  });
}
  
function* notes () {
  yield takeEvery('FETCH_NOTES', fetchHandler);
  console.log('This is call from FETCH_NOTES');
}
  
function* sagas () {
  yield fork(notes);
  console.log('index saga');
}

export default sagas;