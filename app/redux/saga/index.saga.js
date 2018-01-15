import {delay} from 'redux-saga';
import {put, take} from 'redux-saga/effects';

function* fetchHandler () {
  yield put({
    type: 'SHOW_LOADER'
  });
  yield delay(2000);
  yield put({
    type: 'POPULATE_NOTE',
    payload: [{
      title: 'React Native',
      content: '- UI',
      key: 0,
      id: 0
    }]
  });
  yield put({
    type: 'HIDE_LOADER'
  });
}
  
export default function* notes () {
  yield take('FETCH_NOTES');
  yield fetchHandler();
}