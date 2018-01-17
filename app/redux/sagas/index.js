import notes from './notes.saga';
import {fork} from 'redux-saga/effects';

export default function * index () {
  yield fork(notes);
}