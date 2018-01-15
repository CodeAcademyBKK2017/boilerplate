import Api from '../../api';
import {call, put, take} from 'redux-saga/effects';
import {getItem} from '../../utility/storage.util';

function* fetchHandler () {
  yield put({
    type: 'SHOW_LOADER'
  });

  let response;
  try {
    response = yield call(Api.getNote);
  } catch (err) {
    response = yield call(getItem, 'notes');
  }
 
  yield put({
    type: 'POPULATE_NOTE',
    payload: response
  });
  yield put({
    type: 'HIDE_LOADER'
  });
}
  
export default function* notes () {
  yield take('FETCH_NOTES');
  yield call(fetchHandler);
}