import notes from './notes.sagas';
import {fork} from 'redux-saga/effects';

export default function* sagas () {
  yield fork(notes);
}