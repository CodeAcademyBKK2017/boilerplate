import notes from './notes.saga';
import {call, fork} from 'redux-saga/effects';
  
function* sagas () {
  yield fork(notes);
  console.log('index saga');
}

export default sagas;