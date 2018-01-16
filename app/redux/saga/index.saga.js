import notes from './notes.saga';
import {fork} from 'redux-saga/effects';
  
const sagas = function* () {
  yield fork(notes);
};
    
export default sagas;