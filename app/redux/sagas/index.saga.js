import ApiNotes from '../../api';
import Storage from '../../utility/storage.util';
import transformerutil from '../../utility/transformerutil';
import {
  Alert
} from 'react-native';
import {call, fork, put, select, takeEvery} from 'redux-saga/effects';

function* fetchHandler () {
  yield put({
    type: 'SHOW_LOADER'
  });
  let notes;
  try {
    notes = yield call(ApiNotes.getNotes);
  } catch (error) {
    notes = yield call(Storage.getItemsFromAsyncStorage, 'notes');
  }
  
  console.log('====>', notes);
  yield put({
    type: 'POPULATE_NOTES',
    payload: notes
  });
  yield put({
    type: 'HIDE_LOADER'
  });
}

function* saveHandler (action) {
  yield put({
    type: 'SHOW_LOADER'
  });

  const note = action.payload;
  try {
    yield call(ApiNotes.addNote, note);
    const preNote = yield select((store) => (store.notes));
    const newNotes = [...preNote];
    newNotes.push(note);
    yield call(Storage.setItemsFromAsyncStorage, 'notes', JSON.stringify(newNotes));

    yield put({
      type: 'POPULATE_NOTES',
      payload: newNotes
    });
  } catch (error) {
    Alert.alert(
      'Delete Failed',
      String(error),
      null,
      {
        cancelable: false
      }
    );
  }

  yield put({
    type: 'HIDE_LOADER'
  });
}

function* removeHandler (action) {
  yield put({
    type: 'SHOW_LOADER'
  });

  try {
    yield call(ApiNotes.deleteNote, action.payload.id); // API CALL
    const preNotes = yield select((store) => (store.notes));
    const filteredNotes = yield call(transformerutil.deleteNote, preNotes, action.payload.id);
    // const filteredNotes = transformerutil.deleteNote(this.props.notes, item.id);
    yield call(Storage.setItemsFromAsyncStorage, 'notes', JSON.stringify(filteredNotes));

    yield put({
      type: 'POPULATE_NOTES',
      payload: filteredNotes
    });
  } catch (error) {
    Alert.alert(
      'Delete Failed',
      String(error),
      null,
      {
        cancelable: false
      }
    );
  }

  yield put({
    type: 'HIDE_LOADER'
  });
}
  
function* notes () {
  yield takeEvery('FETCH_NOTES', fetchHandler);
  yield takeEvery('ADD_NOTE_REQUEST', saveHandler);
  yield takeEvery('REMOVE_NOTE_REQUEST', removeHandler);
  console.log('This is call from FETCH_NOTES');
}
  
function* sagas () {
  yield fork(notes);
  console.log('index saga');
}

export default sagas;