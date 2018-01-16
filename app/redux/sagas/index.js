import NotesSaga from './notes.saga';
import {fork} from 'redux-saga/effects';

export default function* sagas () {
  yield fork(NotesSaga);
}
