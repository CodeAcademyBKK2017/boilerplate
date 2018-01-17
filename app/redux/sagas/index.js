import notes from './note.saga';
import {fork} from 'redux-saga/effects';

function* sagas () {
  yield fork(notes);
  // console.log('index saga');
}

export default sagas;